<template>
  <main>
    <h1>Nitro Server Engine</h1>
    <ul>
      <li><code>GET /api/health</code> — basic handler</li>
      <li><code>GET /api/report</code> — cachedEventHandler (maxAge 15s)</li>
      <li><code>GET /api/proxy/posts</code> — upstream proxy + error mapping</li>
      <li><code>GET /internal/version</code> — custom server/routes</li>
    </ul>
  </main>
</template>
