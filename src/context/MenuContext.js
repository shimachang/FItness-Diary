import React, { useState } from "react";

export const MenuContext = React.createContext();

export const MenuProvider = ({ children }) => {
    const [addTarget, setAddTarget] = useState("");
    const [addCategory, setAddCategory] = useState("");
    const [addMenu, setAddMenu] = useState("");
    const [addWeight, setAddWeight] = useState("");
    const [addRep, setAddRep] = useState("");
    const [addLabel, setAddLabel] = useState("");
    const [addSetName, setAddSetName] = useState("");
    const value = {
        addTarget,
        setAddTarget,
        addCategory,
        setAddCategory,
        addMenu,
        setAddMenu,
        addWeight,
        setAddWeight,
        addRep,
        setAddRep,
        addLabel,
        setAddLabel,
        addSetName,
        setAddSetName,
    };

    return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
};

export default MenuProvider;
