import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import Headroom from 'react-headroom';
import useAuthContext from '../../hooks/useAuthContext';
import navabarButtonStore from '../../stores/navbarButtonStore';

export default function Navbar() {
  const [buttonClicked, setButtonClicked] = useState('earnings');

  const isBigScreen = useMediaQuery({ query: '(min-width: 650px)' });

  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  function handleButtonClick(name) {
    setButtonClicked(name);
    navabarButtonStore.setButton(name);
  }

  function handleClick() {
    localStorage.removeItem('admin_token');
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  }
  return (
    <Headroom>
      <header>
        <nav className="navbar-container">
          <img
            className="navbar-image"
            src="../../images/ndeys-kitchen.png"
            href="/"
          />
          <ul>
            <li
              style={{
                color: buttonClicked === 'earnings' ? '#DC952F' : '',
              }}
              onClick={() => handleButtonClick('earnings')}
              href="#"
            >
              Earnings
            </li>
            <li
              style={{
                color: buttonClicked === 'orders' ? '#DC952F' : '',
              }}
              onClick={() => handleButtonClick('orders')}
              href="#"
            >
              Orders
            </li>
            <li>
              {isBigScreen ? (
                <button onClick={handleClick}>Logout</button>
              ) : (
                <span
                  className="material-symbols-outlined"
                  onClick={handleClick}
                >
                  logout
                </span>
              )}
            </li>
          </ul>
        </nav>
      </header>
    </Headroom>
  );
}
