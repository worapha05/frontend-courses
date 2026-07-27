import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Panel, ToolbarRow } from './components/Panel';

export default function App() {
  return (
    <Box sx={{ maxWidth: 880, mx: 'auto', px: 2, py: 4 }}>
      <ToolbarRow sx={{ mb: 3 }}>
        <Typography variant="h1">MUI Theme Customization</Typography>
        <Button variant="contained" color="secondary">
          Secondary CTA
        </Button>
      </ToolbarRow>

      <Stack spacing={2}>
        <Panel elevation={0}>
          <Typography variant="h6">Theme overrides</Typography>
          <Typography color="text.secondary">
            ปุ่มทั้งแอปเป็น <code>textTransform: none</code> และมุมมนแบบ pill จาก
            <code>components.MuiButton</code>
          </Typography>
          <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
            <Button variant="contained">Contained</Button>
            <Button variant="outlined">Outlined</Button>
            <Button variant="text">Text</Button>
          </Stack>
        </Panel>

        <Panel
          elevation={0}
          // sx — one-off ตาม breakpoint โดยไม่สร้าง component ใหม่
          sx={{
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            alignItems: 'start',
          }}
        >
          <Box>
            <Typography variant="h6">sx prop</Typography>
            <Typography color="text.secondary">
              ใช้เมื่อเป็น layout เฉพาะหน้า — ยังอ่าน theme tokens ผ่าน callback ได้
            </Typography>
          </Box>
          <Box
            sx={(theme) => ({
              p: 2,
              borderRadius: 2,
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              fontFamily: theme.typography.h1.fontFamily,
            })}
          >
            Brand surface จาก palette.primary
          </Box>
        </Panel>
      </Stack>
    </Box>
  );
}
