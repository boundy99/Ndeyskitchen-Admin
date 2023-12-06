import { React, useEffect } from 'react';

export default function Login() {
  return (
    <div className="login-container">
      <img src="../images/ndeys-kitchen.png" />

      <form>
        <header>
          <h1 className="login-header">Login</h1>
        </header>

        <label htmlFor="username">Username</label>
        <input id="username" type="text" required />

        <label htmlFor="password">Password</label>
        <input id="password" type="password" required />

        <button>Login</button>
      </form>
    </div>
  );
}
