import { React } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import Headroom from 'react-headroom';
import useAuthContext from '../../hooks/useAuthContext';

export default function Navbar() {
  const isBigScreen = useMediaQuery({ query: '(min-width: 650px)' });

  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  function handleClick() {
    localStorage.removeItem('admin_token');
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  }
  return (
    <Headroom>
      <nav className="navbar-container">
        <img
          className="navbar-image"
          src="../../images/ndeys-kitchen.png"
          href="/"
        />
        <ul>
          <li onClick={() => navigate('/orders')}>Orders</li>
          <li>
            {isBigScreen ? (
              <button onClick={handleClick}>Logout</button>
            ) : (
              <span className="material-symbols-outlined">logout</span>
            )}
          </li>
        </ul>
      </nav>
    </Headroom>
  );
}
