import { createContext, useState, useEffect } from "react";
import { login, register, getMe } from "./service/auth.api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleLogin = async (username, password) => {
        setLoading(true);
        try {
            const response = await login(username, password);
            setUser(response.user);
        } catch (err) {
            console.log(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async (username, email, password) => {
        setLoading(true);
        try {
            const response = await register(username, email, password);
            setUser(response.user);
        } catch (err) {
            console.log(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            try {
                const response = await getMe();
                setUser(response); // Backend /me returns the user object directly
            } catch (err) {
                console.log("Not logged in");
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    // ✅ return is now INSIDE the AuthProvider function
    return (
        <AuthContext.Provider value={{ user, loading, handleLogin, handleRegister }}>
            {children}
        </AuthContext.Provider>
    );
};  // ✅ AuthProvider closes here, after the return