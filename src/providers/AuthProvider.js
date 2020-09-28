import React, { useState, useContext, useMemo, createContext } from 'react';

const noop = () => {};
const defaultValue = { login: noop, logout: noop, user: null };

const AuthContext = createContext(defaultValue);

const AuthProvider = (props) => {
    const [user, setUser] = useState(null);

    const auth = useMemo(
        {
            login: (user) => setUser(user),
            logout: () => setUser(null),
            user,
        },
        [user],
    );

    return <AuthContext.Provider value={auth} {...props} />;
};

function useAuthentication() {
    const context = useContext(AuthContext);
    if (context === defaultValue) {
        throw new Error('useAuthentication must be used within AuthProvider');
    }
    return context;
}

export { AuthProvider, useAuthentication };
