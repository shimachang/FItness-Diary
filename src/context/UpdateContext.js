import React, { useState } from "react";

export const UpdateContext = React.createContext();

export const UpdateProvider = ({ children }) => {

    const [updateLabel, setUpdateLabel] = useState('');
    const value = {
        updateLabel,
        setUpdateLabel
    };

    return <UpdateContext.Provider value={value}>{children}</UpdateContext.Provider>;
};

export default UpdateProvider;
