import  React,{ createContext, ReactNode, useState, useEffect } from "react";

interface themeProps{
    children : ReactNode;
}
export const ThemeContext = createContext({
    theme : "",
    toggleMode : () => {}
});

export const ThemeContextProvider = ({children}:themeProps) => {
    //localstorage의 theme값에서 값을 찾아보고 있으면 가져오고 없으면 light default
    //why? 새로고침하면 항상 light가 되기때문에.
    const [theme, setTheme] = useState(window.localStorage.getItem('theme') || "light");
    const toggleMode = () => {
        setTheme(prev => prev === "light" ? "dark": "light");
        window.localStorage.setItem("theme",theme === "light" ? "dark": "light");
    }
    return <ThemeContext.Provider value={{theme, toggleMode}}>{children}</ThemeContext.Provider>
}