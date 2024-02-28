import {createContext, useState, useContext } from 'react';
import { ThemeContextType } from '../misc/themeTypes';

const initialThemeIsDark = localStorage.getItem("theme") === "dark" ? true : false;

const ThemeContext = createContext<ThemeContextType>({
    isDark: initialThemeIsDark,
    setIsDark: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [isDark, setIsDark] = useState<boolean>(initialThemeIsDark);

    return (
        <ThemeContext.Provider value={{isDark, setIsDark}}>
            {children}
        </ThemeContext.Provider>
    )
}


export const useThemeContext = () => {
    const context = useContext(ThemeContext);
    return context;
}
