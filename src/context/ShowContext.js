import React, { useState } from "react";

export const ShowContext = React.createContext();

export const ShowProvider = ({ children }) => {
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const value = {
        showSuccessModal,
        setShowSuccessModal,
    };

    return <ShowContext.Provider value={value}>{children}</ShowContext.Provider>;
};

export default ShowProvider;
