import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { InviteForm } from './components/InviteForm';
import { OrdersTable } from './components/OrdersTable';
import { PageHeader } from './components/PageHeader';
import { useColorMode } from './HarborThemeProvider';

export default function App() {
  const [loading, setLoading] = useState(true);
  const { mode, toggle } = useColorMode();

  useEffect(() => {
    const id = window.setTimeout(() => setLoading(false), 800);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <Box sx={{ maxWidth: 1100, mx: 'auto', px: 2, py: 4 }}>
      <PageHeader
        title="Harbor Console"
        subtitle="Admin DS — theme · table · form · CLS/SSR aware"
        actions={
          <Button variant="outlined" onClick={toggle}>
            {mode === 'dark' ? 'โหมดสว่าง' : 'โหมดมืด'}
          </Button>
        }
      />

      <Box
        sx={{
          display: 'grid',
          gap: 2,
          gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' },
          alignItems: 'start',
        }}
      >
        <OrdersTable loading={loading} />
        <InviteForm />
      </Box>
    </Box>
  );
}
