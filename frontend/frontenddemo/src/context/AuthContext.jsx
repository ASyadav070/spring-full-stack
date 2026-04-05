import React, { createContext, useState, useEffect } from 'react';
import { login as loginService } from '../services/authService';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const setupUser = (token) => {
        if (token) {
            const decodedToken = jwtDecode(token);
            // Set email from 'sub' claim, and add userId and role
            setUser({ 
                email: decodedToken.sub, 
                role: decodedToken.role, 
                userId: decodedToken.userId 
            });
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        setupUser(token);
    }, []);

    const login = async (email, password) => {
        const response = await loginService(email, password);
        const { accessToken, refreshToken } = response.data;
        const token = accessToken.replace('Bearer ', '');
        localStorage.setItem('accessToken', token);
        localStorage.setItem('refreshToken', refreshToken);
        setupUser(token);
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
