import { createContext, useState, useEffect } from "react";

export const themeContext = createContext();

function ThemeContextProvider({ children }) {
    // Get theme from localStorage or set default as false
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem("theme");
        return savedTheme ? JSON.parse(savedTheme) : false;
    });

    // Update localStorage whenever the theme changes
    useEffect(() => {
        localStorage.setItem("theme", JSON.stringify(theme));
    }, [theme]);

    return (
        <themeContext.Provider value={{ theme, setTheme }}>
            {children}
        </themeContext.Provider>
    );
}

export default ThemeContextProvider;
