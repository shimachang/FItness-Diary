import React, { useEffect, useReducer, useState , useContext} from "react";
import GlobalContext from "./GlobalContext";
import { AuthContext } from "./AuthContext";
import dayjs from "dayjs";
import * as Api from '../firebase/api'

const savedEventsReducer = (state, { type, payload }) => {
    switch (type) {
        case "push":
            return [...state, payload];
        case "update":
            return state.map((e) => e.id === payload.id ? payload : e);
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
    const [savedEvents, dispatchCalEvent] = useReducer(savedEventsReducer, []);
    const [eventListName, setEventListName] = useState('') 
    const [eventListId, setEventListId] = useState('') 

    useEffect(() => {
        if (smallCalenderMonth !== null) {
            setMonthIndex(smallCalenderMonth);
        }
    }, [smallCalenderMonth]);
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
                dispatchCalEvent,
                savedEvents,
                eventListName,
                setEventListName,
                eventListId,
                setEventListId
            }}
        >
            {props.children}
        </GlobalContext.Provider>
    );
};

export default ContextWrapper;
