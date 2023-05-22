import React from "react";

export const ThemeContext = React.createContext(null);

const AppWrapper = ({children}) => {
  const [theme, setTheme] = React.useState(window?.sessionStorage?.getItem('theme'));

  React.useEffect(() => {
    window?.sessionStorage?.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{theme: theme, setTheme: setTheme}}>
      {children}
    </ThemeContext.Provider>
  )
}

export default AppWrapper;