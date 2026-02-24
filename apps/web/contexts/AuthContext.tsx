"use client";

import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
    useMemo,
    useRef,
    ReactNode,
} from "react";
import { User } from "@olvad/types";

interface AuthContextType {
    user: User | null;
    token: string | null;
    isLoggedIn: boolean;
    logout: () => void;
    setAuth: (token: string, user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: Readonly<{ children: ReactNode }>) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const hasLoadedRef = useRef(false);

    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        const savedUser = localStorage.getItem("user");
        if (savedToken && savedUser) {
            try {
                const parsed = JSON.parse(savedUser);
                queueMicrotask(() => {
                    setToken(savedToken);
                    setUser(parsed);
                });
            } catch (error) {
                console.error("Failed to load auth from localStorage:", error);
            }
        }
        hasLoadedRef.current = true;
    }, []);

    const setAuth = useCallback((newToken: string, newUser: User) => {
        setToken(newToken);
        setUser(newUser);
        localStorage.setItem("token", newToken);
        localStorage.setItem("user", JSON.stringify(newUser));
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    }, []);

    const isLoggedIn = !!user && !!token;

    const value = useMemo<AuthContextType>(
        () => ({
            user,
            token,
            isLoggedIn,
            logout,
            setAuth,
        }),
        [user, token, isLoggedIn, logout, setAuth]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
