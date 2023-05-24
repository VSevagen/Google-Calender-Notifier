import React from "react";

export const ThemeContext = React.createContext(null);

const AppWrapper = ({children}) => {
  const [theme, setTheme] = React.useState(window?.sessionStorage?.getItem('theme'));

  React.useEffect(() => {
    window?.sessionStorage?.setItem("theme", theme);
    if(document) {
      let body = document.querySelector('body');
      // Everytime theme in session storage changes, we need to update background color of
      // body as well. 
      // PS: need to find a better way to handle this.
      window.sessionStorage.getItem('theme') === 'light' 
      ? body.style.backgroundColor = "#fff" : body.style.backgroundColor = "#171717";
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{theme: theme, setTheme: setTheme}}>
      {children}
    </ThemeContext.Provider>
  )
}

export default AppWrapper;