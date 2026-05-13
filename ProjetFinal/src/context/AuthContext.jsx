import { createContext, useContext,useState,useEffect } from "react";
import{api} from '../lib/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userEmail = localStorage.getItem('userEmail');
        if (token) {
            setUser({email: userEmail });
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        const response = await api.post('/login', { email, password });
        const token = response.token;
        if (token) {
            localStorage.setItem('token', token);
            localStorage.setItem('userEmail', response.email);
            setUser({ email: response.email });
            return true;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
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