import { useState, useEffect } from "react";
import { ThemeContext, themes } from "./ThemeContext";

const ThemeContextWrapper = ({ children }: { children: JSX.Element }) => {
  const [theme, setTheme] = useState(themes.light);

  const changeTheme = () => {
    if (theme === themes.light) {
      setTheme(themes.dark);
    } else {
      setTheme(themes.light);
    }
  };

  useEffect(() => {
    switch (theme) {
      case themes.dark:
        document.body.classList.add("dark-mode");
        break;
      case themes.light:
      default:
        document.body.classList.remove("dark-mode");
        break;
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextWrapper;
