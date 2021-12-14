import { useReducer, useState } from "react";
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
    const [currentDayEvent, setCurrentDayEvent] = useState("");
    const [currentMonthEvent, setCurrentMonthEvent] = useState("");
    const [currentMenuList, setCurrentMenuList] = useState("");
    const [daySelected, setDaySelected] = useState(dayjs());
    const [eventId, setEventId] = useState("");
    const [eventListName, setEventListName] = useState("");
    const [eventListId, setEventListId] = useState("");
    const [eventLabel, setEventLabel] = useState("");
    const [eventDescription, setEventDescription] = useState("");
    const [eventCreated, setEventCreated] = useState("");
    const [monthIndex, setMonthIndex] = useState(dayjs().month());
    const [savedEvents, dispatchCalEvent] = useReducer(savedEventsReducer, []);
    const [smallCalenderMonth, setSmallCalenderMonth] = useState(null);
    const [showEventModal, setShowEventModal] = useState(false);
    const [showMadeModal, setShowMadeModal] = useState(false);
    const [showEventUpdateModal, setShowEventUpdateModal] = useState(false);
    const [showSmallCalender, setShowSmallCalender] = useState(false);
    const [showMakeMenuModal, setShowMakeMenuModal] = useState(false);
    const [showSelectMenuModal, setShowSelectMenuModal] = useState(false);
    const [showUpdateMadeModal, setShowUpdateMadeModal] = useState(false);

    return (
        <GlobalContext.Provider
            value={{
                currentDayEvent,
                setCurrentDayEvent,
                currentMonthEvent,
                setCurrentMonthEvent,
                currentMenuList,
                setCurrentMenuList,
                daySelected,
                setDaySelected,
                monthIndex,
                setMonthIndex,
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
                savedEvents,
                dispatchCalEvent,
                smallCalenderMonth,
                setSmallCalenderMonth,
                showEventModal,
                setShowEventModal,
                showMadeModal,
                setShowMadeModal,
                showEventUpdateModal,
                setShowEventUpdateModal,
                showSmallCalender,
                setShowSmallCalender,
                showUpdateMadeModal,
                setShowUpdateMadeModal,
                showMakeMenuModal,
                setShowMakeMenuModal,
                showSelectMenuModal,
                setShowSelectMenuModal,
            }}
        >
            {props.children}
        </GlobalContext.Provider>
    );
};

export default ContextWrapper;
