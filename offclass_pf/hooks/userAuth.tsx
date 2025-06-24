// hooks/useAuth.ts
import { useState, useEffect, createContext, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { router } from 'expo-router';

interface AuthContextProps {
  user: any;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        try {
          const res = await axios.get('http://localhost:3000/api/usuarios/me', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(res.data);
        } catch (err) {
          await AsyncStorage.removeItem('token');
          setUser(null);
        }
      }
      setIsLoading(false);
    };
    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    const res = await axios.post('http://localhost:3000/api/usuarios/login', {
      email,
      senha: password,
    });

    const token = res.data.token;
    await AsyncStorage.setItem('token', token);

    const userData = await axios.get('http://localhost:3000/api/usuarios/me', {
      headers: { Authorization: `Bearer ${token}` },
    });

    setUser(userData.data);
    router.push('/auth/profile-setup');
  };

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    setUser(null);
    router.push('/auth/login-email');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)!;