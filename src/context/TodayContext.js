import React, { useState } from "react";

export const TodayContext = React.createContext();

export const TodayProvider = ({ children }) => {
    const [todayTarget, setTodayTarget] = useState("");
    const [todayCategory, setTodayCategory] = useState("");
    const [todayMenu, setTodayMenu] = useState("");
    const [todayWeight, setTodayWeight] = useState("");
    const [todayRep, setTodayRep] = useState("");
    const [todaySetName, setTodaySetName] = useState("");
    const value = {
        todayTarget,
        setTodayTarget,
        todayCategory,
        setTodayCategory,
        todayMenu,
        setTodayMenu,
        todayWeight,
        setTodayWeight,
        todayRep,
        setTodayRep,
        todaySetName,
        setTodaySetName,
    };

    return <TodayContext.Provider value={value}>{children}</TodayContext.Provider>;
};

export default TodayProvider;