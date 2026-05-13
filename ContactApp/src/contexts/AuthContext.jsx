import { createContext, useContext,useState,useEffect } from "react";
import{api} from '../lib/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
        const data = await api.post('/login', { email, password });
        
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify({ email: data.email }));
        setUser({ email: data.email });
        
        return data;
    } catch (error) {
        throw error; 
    }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    const register = async (email, password) => {
    await api.post('/register', { email, password });
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};