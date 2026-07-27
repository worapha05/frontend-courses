export type SortDir = 'asc' | 'desc';
export type SortSpec = { key: string; dir: SortDir };

export type GridFilters = {
  q: string;
  status: string;
  region: string;
  minAmount: number | null;
  maxAmount: number | null;
};

export function useDataGrid<T extends Record<string, unknown>>(options: {
  rows: Ref<T[]>;
  searchKeys: (keyof T)[];
  pageSize?: number;
}) {
  const filters = reactive<GridFilters>({
    q: '',
    status: 'all',
    region: 'all',
    minAmount: null,
    maxAmount: null,
  });

  const sorts = ref<SortSpec[]>([{ key: 'createdAt', dir: 'desc' }]);
  const page = ref(1);
  const pageSize = options.pageSize ?? 25;

  const filtered = computed(() => {
    const q = filters.q.trim().toLowerCase();
    return options.rows.value.filter((row) => {
      if (filters.status !== 'all' && row.status !== filters.status) return false;
      if (filters.region !== 'all' && row.region !== filters.region) return false;
      if (filters.minAmount != null && Number(row.amount) < filters.minAmount) return false;
      if (filters.maxAmount != null && Number(row.amount) > filters.maxAmount) return false;
      if (!q) return true;
      return options.searchKeys.some((key) =>
        String(row[key] ?? '')
          .toLowerCase()
          .includes(q),
      );
    });
  });

  const sorted = computed(() => {
    const list = [...filtered.value];
    const specs = sorts.value;
    if (!specs.length) return list;

    list.sort((a, b) => {
      for (const spec of specs) {
        const av = a[spec.key];
        const bv = b[spec.key];
        let cmp = 0;
        if (typeof av === 'number' && typeof bv === 'number') cmp = av - bv;
        else cmp = String(av).localeCompare(String(bv), 'th');
        if (cmp !== 0) return spec.dir === 'asc' ? cmp : -cmp;
      }
      return 0;
    });
    return list;
  });

  const pageCount = computed(() => Math.max(1, Math.ceil(sorted.value.length / pageSize)));

  const pageRows = computed(() => {
    const start = (page.value - 1) * pageSize;
    return sorted.value.slice(start, start + pageSize);
  });

  watch(filtered, () => {
    page.value = 1;
  });

  function toggleSort(key: string, multi = false) {
    const existing = sorts.value.find((s) => s.key === key);
    if (!multi) {
      sorts.value = existing
        ? [{ key, dir: existing.dir === 'asc' ? 'desc' : 'asc' }]
        : [{ key, dir: 'asc' }];
      return;
    }
    if (existing) {
      existing.dir = existing.dir === 'asc' ? 'desc' : 'asc';
      sorts.value = [...sorts.value];
    } else {
      sorts.value = [...sorts.value, { key, dir: 'asc' }];
    }
  }

  function exportCsv(filename = 'export.csv') {
    if (!import.meta.client || !sorted.value.length) return;
    const keys = Object.keys(sorted.value[0]);
    const lines = [
      keys.join(','),
      ...sorted.value.map((row) =>
        keys.map((k) => `"${String(row[k] ?? '').replaceAll('"', '""')}"`).join(','),
      ),
    ];
    const blob = new Blob([lines.join('\n')], {
      type: 'text/csv;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  return {
    filters,
    sorts,
    page,
    pageSize,
    filtered,
    sorted,
    pageCount,
    pageRows,
    toggleSort,
    exportCsv,
  };
}
