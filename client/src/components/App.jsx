import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import useAuthContext from '../hooks/useAuthContext';

function App() {
  const { admin } = useAuthContext();

  const privateRoutes = (
    <Routes>
      <Route path="/" element={<Dashboard />} />
    </Routes>
  );

  const publicRoute = (
    <Routes>
      <Route path="/login" element={<Login />} />
    </Routes>
  );

  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">{admin ? privateRoutes : publicRoute}</div>
      </BrowserRouter>
    </div>
  );
}

export default App;
