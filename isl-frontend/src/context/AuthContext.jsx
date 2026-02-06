import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for existing session in localStorage
        const storedUser = localStorage.getItem('isl_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            setIsAuthenticated(true);
        }
        setLoading(false);
    }, []);

    const login = (email, password) => {
        // Mock login - replace with actual API call later
        const mockUser = {
            id: '1',
            name: email.split('@')[0],
            email: email,
            avatar: null
        };
        setUser(mockUser);
        setIsAuthenticated(true);
        localStorage.setItem('isl_user', JSON.stringify(mockUser));
        return { success: true, user: mockUser };
    };

    const signup = (name, email, password) => {
        // Mock signup - replace with actual API call later
        const mockUser = {
            id: Date.now().toString(),
            name: name,
            email: email,
            avatar: null
        };
        setUser(mockUser);
        setIsAuthenticated(true);
        localStorage.setItem('isl_user', JSON.stringify(mockUser));
        return { success: true, user: mockUser };
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('isl_user');
    };

    const value = {
        user,
        isAuthenticated,
        loading,
        login,
        signup,
        logout
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
