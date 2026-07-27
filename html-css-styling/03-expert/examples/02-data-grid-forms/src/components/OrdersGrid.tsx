import { useMemo, useState } from 'react';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { ORDERS, type OrderRow } from '../data/orders';

type SortKey = keyof Pick<OrderRow, 'id' | 'customer' | 'total' | 'status'>;

const statusColor = {
  paid: 'success',
  pending: 'warning',
  failed: 'error',
} as const;

type Props = {
  loading?: boolean;
};

export function OrdersGrid({ loading = false }: Props) {
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('id');
  const [asc, setAsc] = useState(true);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = ORDERS.filter(
      (r) =>
        r.id.toLowerCase().includes(q) ||
        r.customer.toLowerCase().includes(q) ||
        r.status.includes(q),
    );
    return [...filtered].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      if (av < bv) return asc ? -1 : 1;
      if (av > bv) return asc ? 1 : -1;
      return 0;
    });
  }, [query, sortKey, asc]);

  const onSort = (key: SortKey) => {
    if (key === sortKey) setAsc((v) => !v);
    else {
      setSortKey(key);
      setAsc(true);
    }
  };

  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Orders
      </Typography>
      <TextField
        size="small"
        label="ค้นหา"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        sx={{ mb: 2, maxWidth: 320 }}
      />

      {/* จองความสูงคงที่ → ลด CLS ตอนโหลด/กรอง */}
      <TableContainer sx={{ minHeight: 320 }}>
        <Table size="small" aria-label="ตารางออเดอร์">
          <TableHead>
            <TableRow>
              {(['id', 'customer', 'total', 'status'] as SortKey[]).map((key) => (
                <TableCell
                  key={key}
                  sortDirection={sortKey === key ? (asc ? 'asc' : 'desc') : false}
                >
                  <TableSortLabel
                    active={sortKey === key}
                    direction={sortKey === key && !asc ? 'desc' : 'asc'}
                    onClick={() => onSort(key)}
                  >
                    {key}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    {Array.from({ length: 4 }).map((__, j) => (
                      <TableCell key={j}>
                        <Skeleton height={24} />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : rows.map((row) => (
                  <TableRow key={row.id} hover>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.customer}</TableCell>
                    <TableCell>฿{row.total.toLocaleString()}</TableCell>
                    <TableCell>
                      <Chip size="small" label={row.status} color={statusColor[row.status]} />
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
