import CalenderHeader from "./CalenderHeader";
import Sidebar from "./Sidebar";
import Month from "./Month";
import { getMonth } from "../../util";
import React, { useState, useContext, useEffect } from "react";
import GlobalContext from "../../context/GlobalContext";
import EventModal from "./EventModal";
import MakedModal from './MakedModal'

const Calender = () => {
    const [currentMonth, setCurrentMonth] = useState(getMonth());
    const { monthIndex, showEventModal, showMakedModal } = useContext(GlobalContext);
    useEffect(() => {
        setCurrentMonth(getMonth(monthIndex));
    }, [monthIndex]);
    return (
        <React.Fragment>
            {showEventModal && <EventModal />}
            {showMakedModal && <MakedModal />}
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

export default Calender;
