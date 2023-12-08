import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import useAuthContext from '../hooks/useAuthContext';

function App() {
  const { admin } = useAuthContext();

  const privateRoutes = (
    <>
      <Route path="/" element={<Dashboard />} />
    </>
  );

  const publicRoute = (
    <>
      <Route path="*" element={<Login />} />
    </>
  );

  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>{admin ? privateRoutes : publicRoute}</Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
