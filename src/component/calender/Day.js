import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import GlobalContext from "../../context/GlobalContext";
import { AuthContext } from "../../context/AuthContext";
import * as Api from "../../firebase/api";
import dig from "object-dig";

const Day = ({ day, rowIdx }) => {
    const {
        setDaySelected,
        daySelected,
        setEventId,
        setEventListId,
        setEventListName,
        setEventLabel,
        setEventDescription,
        setEventCreated,
        showEventModal,
        showEventUpdateModal,
        setShowEventUpdateModal,
        setCurrentDayEvent,
    } = useContext(GlobalContext);
    const currentUser = useContext(AuthContext);
    const [dayEvents, setDayEvents] = useState([]);
    useEffect(() => {
        eventFetch();
    }, [currentUser, day, showEventModal, showEventUpdateModal]);
    
    const format = "DD-MM-YY";
    const eventFetch = async () => {
        if (dig(currentUser, "currentUser", "uid")) {
            const eventFetch = await Api.getInitCalenderEvents(currentUser.currentUser.uid);
            const filterEvents = eventFetch.filter(
                (evt) => dayjs(evt.day).format(format) === day.format(format)
            );
            setDayEvents(filterEvents);
        }
    };
    const getCurrentDayClass = () => {
        return day.format(format) === dayjs().format(format)
            ? "bg-blue-600 text-white rounded-full w-7"
            : "";
    };

    const getDayClass = (day) => {
        const currentDay = day.format(format);
        const selectDay = daySelected && daySelected.format(format);
        if (currentDay === selectDay) {
            return "bg-blue-100 text-blue-600 font-bold";
        } else {
            return "";
        }
    };

    const getEvent = () => {
        dayEvents.length > 0 ? setCurrentDayEvent(dayEvents) : setCurrentDayEvent("");
    };

    return (
        <div
            onClick={() => {
                setDaySelected(day);
                getEvent();
            }}
            className={`border border-gray-200 flex flex-col ${getDayClass(day)}`}
        >
            <header className="flex felx-col items-center">
                {rowIdx === 0 && <p className="text-sm mt-1">{day.format("dd")}</p>}
                <p className={`text-sm p-1 my-1 text-center ${getCurrentDayClass()}`}>
                    {day.format("DD")}
                </p>
            </header>
            <div className={`flex-1`}>
                {dayEvents.map((e) => (
                    <div
                        onClick={() => {
                            setShowEventUpdateModal(true);
                            setEventListId(e.listId);
                            setEventListName(e.listName);
                            setEventLabel(e.label);
                            setEventId(e.eventId);
                            setEventDescription(e.description);
                            setEventCreated(e.created_at);
                        }}
                        className={`bg-${e.label}-200 text-gray-600 text-sm mb-1 cursor-pointer`}
                        key={e.eventId}
                    >
                        {e.listName}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Day;
