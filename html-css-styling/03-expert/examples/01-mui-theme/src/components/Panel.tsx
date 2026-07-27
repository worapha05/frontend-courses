import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

/** styled — reuse เป็น primitive ของระบบ */
export const Panel = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  display: 'grid',
  gap: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,
}));

export const ToolbarRow = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(1),
  alignItems: 'center',
  justifyContent: 'space-between',
}));
