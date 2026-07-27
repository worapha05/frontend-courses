import { useId, useState, type FormEvent } from 'react';
import { useAuth } from '../context/AuthContext';
import { validateLogin, type FieldErrors, type LoginValues } from '../lib/validation';

const initial: LoginValues = {
  name: '',
  email: '',
  password: '',
};

export function LoginForm() {
  const { login } = useAuth();
  const formId = useId();
  const [values, setValues] = useState<LoginValues>(initial);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [pending, setPending] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  function update<K extends keyof LoginValues>(key: K, value: LoginValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);

    const result = validateLogin(values);
    if (!result.success) {
      setErrors(result.errors);
      const firstKey = Object.keys(result.errors)[0];
      if (firstKey) {
        document.getElementById(`${formId}-${firstKey}`)?.focus();
      }
      return;
    }

    setPending(true);
    try {
      // จำลอง latency ของ API
      await new Promise((r) => setTimeout(r, 400));
      if (result.data.email.endsWith('@blocked.test')) {
        setFormError('บัญชีนี้ถูกระงับชั่วคราว');
        return;
      }
      login({ name: result.data.name, email: result.data.email });
      setValues(initial);
      setErrors({});
    } finally {
      setPending(false);
    }
  }

  return (
    <section className="card">
      <h2>เข้าสู่ระบบ</h2>
      <p className="muted">ลองอีเมลที่ลงท้าย @blocked.test เพื่อดู server error</p>
      <form onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label htmlFor={`${formId}-name`}>ชื่อ</label>
          <input
            id={`${formId}-name`}
            value={values.name}
            onChange={(e) => update('name', e.target.value)}
            autoComplete="name"
          />
          {errors.name ? <p className="error">{errors.name}</p> : null}
        </div>

        <div className="field">
          <label htmlFor={`${formId}-email`}>อีเมล</label>
          <input
            id={`${formId}-email`}
            type="email"
            value={values.email}
            onChange={(e) => update('email', e.target.value)}
            autoComplete="email"
          />
          {errors.email ? <p className="error">{errors.email}</p> : null}
        </div>

        <div className="field">
          <label htmlFor={`${formId}-password`}>รหัสผ่าน</label>
          <input
            id={`${formId}-password`}
            type="password"
            value={values.password}
            onChange={(e) => update('password', e.target.value)}
            autoComplete="current-password"
          />
          {errors.password ? <p className="error">{errors.password}</p> : null}
        </div>

        {formError ? <p className="error">{formError}</p> : null}

        <button type="submit" disabled={pending}>
          {pending ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
        </button>
      </form>
    </section>
  );
}
