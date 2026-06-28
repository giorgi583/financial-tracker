import { createContext, useContext, useEffect, useState } from 'react';
import { resetPreferences } from './slices/PreferenceSlice';
import { useDispatch } from 'react-redux';
interface AuthContextType {
  user: any;
  loading: boolean;
  refetch: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
const dispatch = useDispatch();
  const logout = () => {
    fetch('http://localhost:3200/api/users/logout', {
        method: 'POST',
        credentials: 'include',
    }).finally(() => {
        setUser(null);
        dispatch(resetPreferences());
    });
};
  const fetchUser = (showloading = true) => {
    if (showloading) setLoading(true);
    fetch('http://localhost:3200/api/users/me', {
      credentials: 'include',
      headers: {
            'Cache-Control': 'no-cache',  // add this
        },
    })
      .then(res => {
        if (res.status === 401) {  // token expired or invalid
          setUser(null);
          return null;
        }
        return res.json() })
      .then(data => setUser(data ? data.data : null))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchUser(true);
     const interval = setInterval(() => {
    fetchUser(false); // silent background check, no loading flicker
  }, 30 * 1000);

  return () => clearInterval(interval);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, refetch: fetchUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};