import { React, useEffect } from 'react';

export default function Login() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <img className="w-32" src="../images/ndeys-kitchen.png" />

      <form className="flex flex-col items-center justify-center gap-3 border border-black px-12 py-10 rounded-md ">
        <header>
          <h1 className="text-6xl mb-6 text-primary font-satisfy">Login</h1>
        </header>

        <label htmlFor="username" className="text-primary">
          Username
        </label>
        <input id="username" className="input-box" type="text" required />

        <label htmlFor="password" className="text-primary">
          Password
        </label>
        <input id="password" className="input-box" type="password" required />

        <button className="border border-primary bg-primary text-white rounded-rd mt-6 p-1.5 text-xl px-4 hover:bg-white hover:text-primary transition ease-out duration-300">
          Login
        </button>
      </form>
    </div>
  );
}
