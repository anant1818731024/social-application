import { useState } from 'react';
import styles from '../styles/login.module.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../hooks';
import { Redirect } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);
  const auth = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast('both email and password are required', {
        type: 'error',
      });
      return;
    }

    setLoggingIn(true);

    const response = await auth.login(email, password);
    if (response.success) {
      toast('Logged in successfully', {
        type: 'success',
      });
    } else {
      toast(response.message, {
        type: 'error',
      });
    }

    setLoggingIn(false);
  };

  if (auth.user) {
    return <Redirect to="/" />;
  }
  return (
    <form className={styles.loginForm}>
      <span className={styles.loginSignupHeader}>Log In</span>

      <div className={styles.field}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <input
          type="password"
          placeholder="Paasword"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <button onClick={handleLogin} disabled={loggingIn}>
          {loggingIn ? 'Logging in ...' : 'log in'}
        </button>
      </div>
    </form>
  );
};

export default Login;
