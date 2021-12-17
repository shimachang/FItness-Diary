import CalenderHeader from "./CalenderHeader";
import Sidebar from "./Sidebar";
import Month from "./Month";
import { getMonth } from "../../util";
import React, { useState, useContext, useEffect } from "react";
import GlobalContext from "../../context/GlobalContext";
import EventModal from "./EventModal";
import MadeModal from "./MadeModal";
import EventUpdateModal from "./UpdateEventModal";
import SmallCalender from "./SmallCalender";

const Calender = () => {
    const [currentMonth, setCurrentMonth] = useState(getMonth());
    const { monthIndex, showEventModal, showMadeModal, showEventUpdateModal, showSmallCalender } =
        useContext(GlobalContext);
    useEffect(() => {
        setCurrentMonth(getMonth(monthIndex));
    }, [monthIndex]);
    return (
        <React.Fragment>
            {showEventModal && <EventModal />}
            {showEventUpdateModal && <EventUpdateModal />}
            {showMadeModal && <MadeModal />}
            {showSmallCalender && <SmallCalender />}
            <div className="h-screen flex flex-col">
                <CalenderHeader />
                <div className="flex flex-1 flex-col lg:flex-row">
                    <Sidebar />
                    <Month month={currentMonth} />
                </div>
            </div>
        </React.Fragment>
    );
};

export default Calender;
