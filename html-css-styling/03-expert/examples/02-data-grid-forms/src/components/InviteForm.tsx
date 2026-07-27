import { useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

type FormValues = {
  name: string;
  email: string;
  note: string;
};

export function InviteForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<FormValues>({
    defaultValues: { name: '', email: '', note: '' },
  });

  return (
    <Paper
      component="form"
      variant="outlined"
      onSubmit={handleSubmit(() => {
        reset();
      })}
      sx={{ p: 2 }}
    >
      <Typography variant="h6" gutterBottom>
        เชิญสมาชิกทีม
      </Typography>
      <Stack spacing={1.5}>
        <TextField
          label="ชื่อ"
          {...register('name', { required: 'กรุณากรอกชื่อ' })}
          error={Boolean(errors.name)}
          // จองบรรทัด helper เสมอ → ไม่กระตุกเมื่อมี error
          helperText={errors.name?.message ?? ' '}
        />
        <TextField
          label="อีเมล"
          {...register('email', {
            required: 'กรุณากรอกอีเมล',
            pattern: {
              value: /@/,
              message: 'อีเมลไม่ถูกต้อง',
            },
          })}
          error={Boolean(errors.email)}
          helperText={errors.email?.message ?? ' '}
        />
        <TextField label="หมายเหตุ" multiline minRows={2} {...register('note')} helperText=" " />
        <Button type="submit" variant="contained">
          ส่งคำเชิญ
        </Button>
        {isSubmitSuccessful ? (
          <Typography color="success.main">ส่งแล้ว (จำลอง)</Typography>
        ) : (
          <Typography sx={{ visibility: 'hidden' }}>placeholder</Typography>
        )}
      </Stack>
    </Paper>
  );
}
