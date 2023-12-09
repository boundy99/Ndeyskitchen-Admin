import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import OrderView from './dashboard/OrderView';
import useAuthContext from '../hooks/useAuthContext';

function App() {
  const { admin } = useAuthContext();

  const privateRoutes = (
    <>
      <Route path="/" element={<Dashboard />} />
      <Route path="/order/:id" element={<OrderView />} />
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
