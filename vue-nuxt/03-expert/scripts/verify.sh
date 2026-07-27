#!/usr/bin/env bash
# Smoke-test key Nuxt apps after `nuxi build`.
# Usage: ./scripts/verify.sh

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
HOST="${HOST:-127.0.0.1}"
PIDS=()

cleanup() {
  for pid in "${PIDS[@]}"; do
    kill "$pid" 2> /dev/null || true
  done
}
trap cleanup EXIT

start_server() {
  local dir="$1"
  local port="$2"
  (cd "$ROOT/$dir" && HOST="$HOST" PORT="$port" node .output/server/index.mjs) &
  PIDS+=("$!")
  echo "started $dir on $HOST:$port (pid ${PIDS[-1]})"
}

wait_port() {
  local port="$1"
  for _ in $(seq 1 30); do
    if curl -sS --connect-timeout 1 "http://$HOST:$port/" > /dev/null 2>&1; then
      return 0
    fi
    sleep 0.2
  done
  echo "timeout waiting for port $port"
  return 1
}

assert_json() {
  local url="$1"
  local expr="$2"
  shift 2
  local body
  body=$(curl -sS "$@" "$url")
  node -e "
    const j = JSON.parse(process.argv[1]);
    if (!(${expr})) {
      console.error('FAIL', process.argv[2], JSON.stringify(j));
      process.exit(1);
    }
    console.log('PASS', process.argv[2]);
  " "$body" "$url"
}

assert_status() {
  local url="$1"
  local expected="$2"
  shift 2
  local code
  code=$(curl -sS -o /tmp/verify-body.json -w '%{http_code}' "$@" "$url")
  if [[ "$code" != "$expected" ]]; then
    echo "FAIL $url expected HTTP $expected got $code"
    cat /tmp/verify-body.json
    echo
    exit 1
  fi
  echo "PASS $url HTTP $expected"
}

echo "=== Starting preview servers ==="
start_server "02-intermediate/examples/01-nuxt-architecture" 3101
start_server "02-intermediate/lab/solution" 3102
start_server "03-expert/examples/03-nitro-server" 3103
start_server "03-expert/lab/solution" 3104

for p in 3101 3102 3103 3104; do
  wait_port "$p"
done

echo
echo "=== API smoke tests ==="
assert_json "http://$HOST:3101/api/hello" "j.message && j.at"
assert_json "http://$HOST:3102/api/products" "Array.isArray(j.items) && j.items.length === 6"
assert_status "http://$HOST:3102/api/products/999" 404
assert_json "http://$HOST:3103/api/health" "j.ok === true"
assert_json "http://$HOST:3103/internal/version" "j.nitro === true"
assert_json "http://$HOST:3103/api/proxy/posts?limit=2" "j.items.length === 2"
assert_status "http://$HOST:3103/api/proxy/posts?limit=0" 400
assert_json "http://$HOST:3104/api/orders" "j.items.length === 2500"
assert_status "http://$HOST:3104/api/admin/report" 403
assert_status "http://$HOST:3104/api/admin/report" 403 -H "x-demo-role: viewer"
assert_json "http://$HOST:3104/api/admin/report?days=7" "j.totals && j.totals.orders" -H "x-demo-role: admin"
assert_status "http://$HOST:3104/api/admin/report?days=abc" 400 -H "x-demo-role: admin"

R1=$(curl -sS "http://$HOST:3103/api/report")
R2=$(curl -sS "http://$HOST:3103/api/report")
node -e "
  const a = JSON.parse(process.argv[1]);
  const b = JSON.parse(process.argv[2]);
  if (a.generatedAt !== b.generatedAt) {
    console.error('FAIL cache: generatedAt changed', a.generatedAt, b.generatedAt);
    process.exit(1);
  }
  console.log('PASS /api/report cache (generatedAt stable)');
" "$R1" "$R2"

echo
echo "All smoke tests passed."
