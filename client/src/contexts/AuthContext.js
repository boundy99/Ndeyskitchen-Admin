import { createContext, useReducer, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload };
    case 'LOGOUT':
      return { user: null };
    default:
      return state;
  }
}

export function AuthContextProvider({ children }) {
  const [state, dispatch] = useReducer(AuthReducer, {
    user: null,
  });

  useEffect(() => {
    const userToken = localStorage.getItem('admin_token');

    dispatch({ type: 'LOGIN', payload: userToken });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}
