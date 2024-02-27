import { ToggleSwitch } from "flowbite-react";

import { useThemeContext } from "../../appHooks/useThemeContext";
import { useEffect } from "react";

function ToggleDarkMode() {
  const { isDark, setIsDark } = useThemeContext();

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
        localStorage.setItem("theme", "light");
    }
    }, [isDark]);
    
  return (
    <div>
      <ToggleSwitch
        id="darkMode"
        name="darkMode"
        color="dark"
        checked={isDark}
        onChange={() => setIsDark(!isDark)}
      />
    </div>
  );
}

export default ToggleDarkMode;
