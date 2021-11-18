import React from "react";

const GlobalContext = React.createContext({
    monthIndex: 0,
    setMonthIndex: (index) => {},
    smallCalenderMonth: 0,
    setSmallCalenderMonth: (index) => {},
    daySelected: null,
    setDaySelected: (day) => {},
    showEventModal: false,
    setShowEventModal: () => {},
    setShowMekedModal: () => {},
    setShowEventUpdateModal: () => {},
    setShowSmallCalender: () => {},
    dispatchCalEvent: ({ tyep, payload }) => {},
    savedEvents: [],
    setEventId: () => {},
    setEventListName: () => {},
    setEventListId: () => {},
    setEventLabel: () => {},
    setEventDescription: () => {},
    setEventCreated: () => {},
    setCurrentDayEvent: () => {},
    setCurrentMonthEvent: () => {},
});

export default GlobalContext;
