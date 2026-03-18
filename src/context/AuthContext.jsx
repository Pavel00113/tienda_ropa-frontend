import { createContext, useState, useEffect } from 'react';
import { perfil } from '../services/auth.service';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario]   = useState(null);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      perfil()
        .then(res => setUsuario(res.data))
        .catch(() => localStorage.removeItem('token'))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = (token, user) => {
    localStorage.setItem('token', token);
    setUsuario(user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, loading, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};