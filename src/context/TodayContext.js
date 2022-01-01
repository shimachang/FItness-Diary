import React, { useState } from "react";

export const TodayContext = React.createContext();

export const TodayProvider = ({ children }) => {
    const [todayEvent, setTodayEvent] = useState("");
    const [todayTarget, setTodayTarget] = useState("");
    const [todayCategory, setTodayCategory] = useState("");
    const [todayMenu, setTodayMenu] = useState("");
    const [todayWeight, setTodayWeight] = useState("");
    const [todayCurrentWeight, setTodayCurrentWeight] = useState("");
    const [todayRep, setTodayRep] = useState("");
    const [todaySetName, setTodaySetName] = useState("");
    const value = {
        todayEvent,
        setTodayEvent,
        todayTarget,
        setTodayTarget,
        todayCategory,
        setTodayCategory,
        todayMenu,
        setTodayMenu,
        todayWeight,
        setTodayWeight,
        todayCurrentWeight,
        setTodayCurrentWeight,
        todayRep,
        setTodayRep,
        todaySetName,
        setTodaySetName,
    };

    return <TodayContext.Provider value={value}>{children}</TodayContext.Provider>;
};

export default TodayProvider;