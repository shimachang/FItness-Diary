import CalenderHeader from "./CalenderHeader";
import Sidebar from "./Sidebar";
import Month from "./Month";
import { getMonth } from "../../util";
import React, { useState, useContext, useEffect } from "react";
import GlobalContext from "../../context/GlobalContext";

const days = ["日", "月", "火", "水", "木", "金", "土"];

export const Calender = () => {
    const [currentMonth, setCurrentMonth] = useState(getMonth());
    const {monthIndex} = useContext(GlobalContext)
    useEffect(()=> {
        setCurrentMonth(getMonth(monthIndex))
    }, [monthIndex])
    return (
        <React.Fragment>
            <div className="h-screen flex flex-col">
                <CalenderHeader />
                <div className="flex flex-1">
                    <Sidebar />
                    <Month month={currentMonth} />
                </div>
            </div>
        </React.Fragment>
    );
};
