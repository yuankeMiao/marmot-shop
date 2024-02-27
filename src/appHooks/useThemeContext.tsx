import {createContext, useState, useContext } from 'react';
import { ThemeContextType } from '../misc/themeTypes';

const ThemeContext = createContext<ThemeContextType>({
    isDark: false,
    setIsDark: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [isDark, setIsDark] = useState<boolean>(false);

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
