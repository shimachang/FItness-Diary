import React, { useState } from "react";

export const RouterContext = React.createContext();
export const RouterProvider = ({ children }) => {
    const [tab, setTab] = useState("calender");
    const value = {
        tab,
        setTab,
    };

    return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
};

export default RouterProvider;
