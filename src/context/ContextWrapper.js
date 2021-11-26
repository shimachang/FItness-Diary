import React, { useReducer, useState } from "react";
import GlobalContext from "./GlobalContext";
import dayjs from "dayjs";

const savedEventsReducer = (state, { type, payload }) => {
    switch (type) {
        case "push":
            return [...state, payload];
        case "update":
            return state.map((e) => (e.id === payload.id ? payload : e));
        case "delete":
            return state.filter((e) => e.id !== payload.id);
        default:
            throw new Error();
    }
};

const ContextWrapper = (props) => {
    const [monthIndex, setMonthIndex] = useState(dayjs().month());
    const [smallCalenderMonth, setSmallCalenderMonth] = useState(null);
    const [daySelected, setDaySelected] = useState(dayjs());
    const [showEventModal, setShowEventModal] = useState(false);
    const [showMakedModal, setShowMekedModal] = useState(false);
    const [showEventUpdateModal, setShowEventUpdateModal] = useState(false);
    const [showSmallCalender, setShowSmallCalender] = useState(false);
    const [showMakeMenuModal, setShowMakeMenuModal] = useState(false);
    const [showSelectMenuModal, setShowSelectMenuModal] = useState(false);
    const [savedEvents, dispatchCalEvent] = useReducer(savedEventsReducer, []);
    const [eventId, setEventId] = useState("");
    const [eventListName, setEventListName] = useState("");
    const [eventListId, setEventListId] = useState("");
    const [eventLabel, setEventLabel] = useState("");
    const [eventDescription, setEventDescription] = useState("");
    const [eventCreated, setEventCreated] = useState("");
    const [currentDayEvent, setCurrentDayEvent] = useState("");
    const [currentMonthEvent, setCurrentMonthEvent] = useState("")

    return (
        <GlobalContext.Provider
            value={{
                monthIndex,
                setMonthIndex,
                smallCalenderMonth,
                setSmallCalenderMonth,
                daySelected,
                setDaySelected,
                showEventModal,
                setShowEventModal,
                showMakedModal,
                setShowMekedModal,
                showEventUpdateModal,
                setShowEventUpdateModal,
                showSmallCalender,
                setShowSmallCalender,
                showMakeMenuModal,
                setShowMakeMenuModal,
                showSelectMenuModal,
                setShowSelectMenuModal,
                dispatchCalEvent,
                savedEvents,
                eventId,
                setEventId,
                eventListName,
                setEventListName,
                eventListId,
                setEventListId,
                eventLabel,
                setEventLabel,
                eventDescription,
                setEventDescription,
                eventCreated,
                setEventCreated,
                currentDayEvent,
                setCurrentDayEvent,
                currentMonthEvent,
                setCurrentMonthEvent
            }}
        >
            {props.children}
        </GlobalContext.Provider>
    );
};

export default ContextWrapper;
