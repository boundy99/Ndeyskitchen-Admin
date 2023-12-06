import { React, useState } from 'react';

export default function Login() {
  const [form, setForm] = useState({
    username: '',
    password: '',
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
        console.log(json.message);
      }
    } catch (err) {
      console.error.log(err);
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
          name="username"
          id="username"
          type="text"
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          name="password"
          id="password"
          type="password"
          onChange={handleChange}
          required
        />

        <button>Login</button>
      </form>
    </div>
  );
}
