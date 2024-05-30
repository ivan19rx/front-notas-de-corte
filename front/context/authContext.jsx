import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLogged, setIsLogged] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkLoginStatus = () => {
            const logged = localStorage.getItem('isLogged');
            if (logged !== 'true') {
                navigate('/login');
            } else {
                setIsLogged(true);
            }
        };
        checkLoginStatus();
    }, [navigate]);

    return (
        <AuthContext.Provider value={{ isLogged, setIsLogged }}>
            {children}
        </AuthContext.Provider>
    );
};
