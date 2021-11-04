import React from 'react'

const GlobalContext = React.createContext({
    monthIndex: 0,
    setMonthIndex: (index) => {},
    smallCalenderMonth:0,
    setSmallCalenderMonth: (index) => {},
    daySelected: null,
    setDaySelected: (day) => {},
    showEventModal: false,
    setShowEventModal: () => {},
    setShowMekedModal: () => {},
    dispatchCalEvent: ({tyep, payload}) => {},
    savedEvents: [],
    setEventMenu: []
})

export default GlobalContext