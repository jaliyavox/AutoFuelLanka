import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    // Load from localStorage when app starts
    useEffect(() => {
        const stored = localStorage.getItem("user");
        if (stored) {
            setUser(JSON.parse(stored));
        }
    }, []);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    const hasRole = (role) => {
        return user?.roles?.includes(role) || false;
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, hasRole }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
