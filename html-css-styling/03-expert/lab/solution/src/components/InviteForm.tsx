import { useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

type Values = { name: string; email: string };

export function InviteForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Values>({ defaultValues: { name: '', email: '' } });

  return (
    <Paper component="form" variant="outlined" sx={{ p: 2 }} onSubmit={handleSubmit(() => reset())}>
      <Typography variant="h6" gutterBottom>
        เชิญแอดมิน
      </Typography>
      <Stack spacing={1}>
        <TextField
          label="ชื่อ"
          {...register('name', { required: 'กรุณากรอกชื่อ' })}
          error={Boolean(errors.name)}
          helperText={errors.name?.message ?? ' '}
        />
        <TextField
          label="อีเมล"
          {...register('email', {
            required: 'กรุณากรอกอีเมล',
            pattern: { value: /@/, message: 'อีเมลไม่ถูกต้อง' },
          })}
          error={Boolean(errors.email)}
          helperText={errors.email?.message ?? ' '}
        />
        <Button type="submit" variant="contained">
          ส่งคำเชิญ
        </Button>
      </Stack>
    </Paper>
  );
}
