import { z } from 'zod';

export const loginSchema = z.object({
  name: z.string().trim().min(2, 'ชื่อต้องมีอย่างน้อย 2 ตัวอักษร').max(40, 'ชื่อยาวเกินไป'),
  email: z.string().trim().email('รูปแบบอีเมลไม่ถูกต้อง'),
  password: z
    .string()
    .min(8, 'รหัสผ่านอย่างน้อย 8 ตัวอักษร')
    .regex(/[A-Z]/, 'ต้องมีตัวพิมพ์ใหญ่อย่างน้อย 1 ตัว')
    .regex(/[0-9]/, 'ต้องมีตัวเลขอย่างน้อย 1 ตัว'),
});

export type LoginValues = z.infer<typeof loginSchema>;

export type FieldErrors = Partial<Record<keyof LoginValues, string>>;

export function validateLogin(
  values: LoginValues,
):
  | { success: true; errors: FieldErrors; data: LoginValues }
  | { success: false; errors: FieldErrors } {
  const result = loginSchema.safeParse(values);
  if (result.success) {
    return { success: true, errors: {}, data: result.data };
  }

  const errors: FieldErrors = {};
  for (const issue of result.error.issues) {
    const key = issue.path[0] as keyof LoginValues | undefined;
    if (key && !errors[key]) {
      errors[key] = issue.message;
    }
  }
  return { success: false as const, errors };
}
