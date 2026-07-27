import { LoginForm } from './components/LoginForm';
import { useAuth } from './context/AuthContext';
import { useTheme } from './context/ThemeContext';

export function App() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <main>
      <div className="row" style={{ justifyContent: 'space-between', marginBottom: '1rem' }}>
        <h1 style={{ margin: 0, fontSize: '1.35rem' }}>Context + Strict Forms</h1>
        <button type="button" className="ghost" onClick={toggleTheme}>
          Theme: {theme}
        </button>
      </div>

      {user ? (
        <section className="card">
          <h2>ยินดีต้อนรับ</h2>
          <p>
            คุณเข้าสู่ระบบในชื่อ <strong>{user.name}</strong>
          </p>
          <p className="muted">{user.email}</p>
          <button type="button" className="ghost" onClick={logout}>
            ออกจากระบบ
          </button>
        </section>
      ) : (
        <LoginForm />
      )}
    </main>
  );
}
