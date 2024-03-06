// TBH, I think I could just use tailwindCSS darkmode feature to handle darkmode,
// because it is much easier and less code to write
// but since it is the requirement to use context, I will use context to handle darkmode

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
    return useContext(ThemeContext);
}
