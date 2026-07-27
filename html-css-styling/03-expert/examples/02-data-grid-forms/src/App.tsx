import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { InviteForm } from './components/InviteForm';
import { OrdersGrid } from './components/OrdersGrid';

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = window.setTimeout(() => setLoading(false), 900);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto', px: 2, py: 4 }}>
      <Typography variant="h4" sx={{ mb: 1, fontWeight: 800 }}>
        Data Grid + Form Validation Styling
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Skeleton ความสูงคงที่ · helperText จองที่ · ลด CLS
      </Typography>
      <Stack spacing={3}>
        <OrdersGrid loading={loading} />
        <InviteForm />
      </Stack>
    </Box>
  );
}
