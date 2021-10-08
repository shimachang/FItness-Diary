import React, { useEffect, useState } from "react";
import GlobalContext from "./GlobalContext";
import dayjs from "dayjs";

const ContextWrapper = (props) => {
    const [monthIndex, setMonthIndex] = useState(dayjs().month());
    const [smallCalenderMonth, setSmallCalenderMonth] = useState(null);
    const [daySelected, setDaySelected] = useState(null);
    useEffect(() =>{
        if (smallCalenderMonth !== null) {
            setMonthIndex(smallCalenderMonth)
        }
    }, [smallCalenderMonth])
    return (
        <GlobalContext.Provider 
            value={{ 
                monthIndex,
                setMonthIndex,
                smallCalenderMonth,
                setSmallCalenderMonth,
                daySelected,
                setDaySelected
            }}>
            {props.children}
        </GlobalContext.Provider>
    );
};

export default ContextWrapper;
