import { React, useState, useSyncExternalStore } from 'react';
import useAuthContext from '../hooks/useAuthContext';

export default function Login() {
  const { dispatch } = useAuthContext();

  const [form, setForm] = useState({
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    usernameError: '',
    passwordError: '',
  });

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await fetch('/api/admins', {
        method: 'POST',
        body: JSON.stringify({ admin: form }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const json = await response.json();

      if (!response.ok) {
        if (json.message === 'User not found')
          setErrors({
            usernameError: true,
            passwordError: true,
          });

        if (json.message === 'Password incorrect')
          setErrors({
            usernameError: false,
            passwordError: true,
          });
      }

      localStorage.setItem('admin_token', json.token);
      dispatch({ type: 'LOGIN', payload: json.token });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="login-container">
      <img src="../images/ndeys-kitchen.png" />

      <form onSubmit={handleSubmit}>
        <header>
          <h1 className="login-header">Login</h1>
        </header>

        <label htmlFor="username">Username</label>
        <input
          style={{ borderColor: errors.usernameError ? '#DC952F' : '' }}
          name="username"
          id="username"
          type="text"
          onChange={handleChange}
          onClick={() => setErrors({ ...errors, usernameError: false })}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          style={{ borderColor: errors.passwordError ? '#DC952F' : '' }}
          name="password"
          id="password"
          type="password"
          onChange={handleChange}
          onClick={() => setErrors({ ...errors, passwordError: false })}
          required
        />

        <button>Login</button>
      </form>
    </div>
  );
}
