import { useState } from 'react';
import styles from '../styles/login.module.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../hooks';
import { useHistory, Redirect } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [registering, setRegistering] = useState(false);
  const auth = useAuth();

  const history = useHistory();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast('both email and password are required', {
        type: 'error',
      });
      return;
    }

    setRegistering(true);
    const response = await auth.register(
      name,
      email,
      password,
      confirmPassword
    );
    if (response.success) {
      toast('Registered successfully', {
        type: 'success',
      });
      history.push('/login');
    } else {
      toast(response.message, {
        type: 'error',
      });
    }

    setRegistering(false);
  };

  if (auth.user) {
    return <Redirect to="/" />;
  }
  return (
    <form className={styles.loginForm}>
      <span className={styles.loginSignupHeader}>Register</span>

      <div className={styles.field}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
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
          placeholder="Pasword"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <input
          type="password"
          placeholder="Confirm Pasword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <button onClick={handleRegister} disabled={registering}>
          {registering ? 'signing up...' : 'Sign up'}
        </button>
      </div>
    </form>
  );
};

export default Register;
