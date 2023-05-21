import React from "react";

export const ThemeContext = React.createContext(null);

const AppWrapper = ({children}) => {
  const [theme, setTheme] = React.useState('light');
  return (
    <ThemeContext.Provider value={{theme: theme, setTheme: setTheme}}>
      {children}
    </ThemeContext.Provider>
  )
}

export default AppWrapper;