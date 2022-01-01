import React, { useState } from "react";

export const UpdateContext = React.createContext();
export const UpdateProvider = ({ children }) => {
    const [updateCategory, setUpdateCategory] = useState("");
    const [updateLabel, setUpdateLabel] = useState("");
    const [updateMenu, setUpdateMenu] = useState("")
    const [updateRep, setUpdateRep] = useState("");
    const [updateTarget, setUpdateTarget] = useState("");
    const [updateWeight, setUpdateWeight] = useState("");
    const [updateSetName, setUpdateSetName] = useState("");
    const value = {
        updateCategory,
        setUpdateCategory,
        updateLabel,
        setUpdateLabel,
        updateMenu,
        setUpdateMenu,
        updateRep,
        setUpdateRep,
        updateWeight,
        setUpdateWeight,
        updateTarget,
        setUpdateTarget,
        updateSetName,
        setUpdateSetName
    };

    return <UpdateContext.Provider value={value}>{children}</UpdateContext.Provider>;
};

export default UpdateProvider;
