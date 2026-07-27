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
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

type Order = {
  id: string;
  customer: string;
  total: number;
  status: 'paid' | 'pending' | 'failed';
};

const DATA: Order[] = [
  { id: 'ORD-2001', customer: 'Narin', total: 2400, status: 'paid' },
  { id: 'ORD-2002', customer: 'Mali', total: 680, status: 'pending' },
  { id: 'ORD-2003', customer: 'Preecha', total: 1520, status: 'failed' },
  { id: 'ORD-2004', customer: 'Suda', total: 990, status: 'paid' },
  { id: 'ORD-2005', customer: 'Kitt', total: 310, status: 'pending' },
];

const statusColor = {
  paid: 'success',
  pending: 'warning',
  failed: 'error',
} as const;

export function OrdersTable({ loading }: { loading: boolean }) {
  const [q, setQ] = useState('');
  const rows = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return DATA.filter(
      (r) => r.id.toLowerCase().includes(needle) || r.customer.toLowerCase().includes(needle),
    );
  }, [q]);

  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        ออเดอร์ล่าสุด
      </Typography>
      <TextField
        size="small"
        label="ค้นหา"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        sx={{ mb: 2, maxWidth: 280 }}
      />
      <TableContainer sx={{ minHeight: 300 }}>
        <Table size="small" aria-label="ออเดอร์">
          <TableHead>
            <TableRow>
              <TableCell>รหัส</TableCell>
              <TableCell>ลูกค้า</TableCell>
              <TableCell>ยอด</TableCell>
              <TableCell>สถานะ</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    {Array.from({ length: 4 }).map((__, j) => (
                      <TableCell key={j}>
                        <Skeleton height={22} />
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
