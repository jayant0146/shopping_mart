import { useState, useContext, createContext, useEffect } from "react";

const NavContext = createContext();

const NavProvider = ({ children }) => {
    const [nav, setNav] = useState(false);

    useEffect(() => {
        let existingNavItem = localStorage.getItem("nav") || false;
        if (existingNavItem) setNav(existingNavItem);
    }, [])
    return (
        <NavContext.Provider value={[nav, setNav]}>
            {children}
        </NavContext.Provider>
    )
}

//custom hook
const useNav = () => useContext(NavContext);

export { useNav, NavProvider };