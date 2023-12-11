import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { AuthContextProvider } from './contexts/AuthContext';
import '../css/main.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>
);
