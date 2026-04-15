import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();
const defaultUser = {
    name: 'Akshara Team',
    role: 'admin',
};

export const AuthProvider = ({ children }) => {
    const [user] = useState(defaultUser);
    const login = async () => ({ success: true });
    const register = async () => ({ success: true });
    const logout = () => {};
    const loading = false;

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading, isAdmin: user?.role === 'admin' }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
