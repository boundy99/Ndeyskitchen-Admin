import { createContext, useReducer, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return { admin: action.payload };
    case 'LOGOUT':
      return { admin: null };
    default:
      return state;
  }
}

export function AuthContextProvider({ children }) {
  const [state, dispatch] = useReducer(AuthReducer, {
    admin: null,
  });

  useEffect(() => {
    const adminToken = localStorage.getItem('admin_token');

    dispatch({ type: 'LOGIN', payload: adminToken });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}
