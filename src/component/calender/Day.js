import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import GlobalContext from "../../context/GlobalContext";
import { AuthContext } from "../../context/AuthContext";
import * as Api from "../../firebase/api";
import dig from "object-dig";
import { getCurrentMonthClass } from "../../functions/getCurrentMonthClass";
import { getDayClass } from "../../functions/getDayClass";
import { getCurrentDayClass } from "../../functions/getCurrentDayClass";

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
    const currentId = dig(currentUser, "currentUser", "uid");
    useEffect(() => {
        eventFetch();
    }, [currentUser, day, showEventModal, showEventUpdateModal]);
    const eventFetch = async () => {
        if (currentId) {
            const eventFetch = await Api.getInitCalenderEvents(currentUser.currentUser.uid);
            const menuFetch = await Api.getMyMenuLists(currentUser.currentUser.uid);
            const filterEvents = eventFetch.filter(
                (evt) => dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY")
            );
            filterEvents.forEach( async (e, i) => {
                let filterArray = []
                if (e.isComplete) {
                    const historyWithEventId = await Api.getHistoryWithEventId(currentId, e.historyId);
                filterArray.push({...filterEvents[i], ...historyWithEventId})
                    // console.log(i)
                    // setDayEvents(historyWithEventId)
                } else {
                    console.log(i)
                    const dayWithEventId = filterEvents.map((event) => event.listId);
                    let newArray = [];
                    for (let j = 0; j < filterEvents.length; j++) {
                        filterArray.push({
                            ...filterEvents[i],
                            ...menuFetch.filter((evt) => evt.listId === dayWithEventId[i]),
                        });
                    }
                }
                setDayEvents(filterArray);
            });
        }
    };
    console.log(dayEvents);
    const getEvent = () => {
        dayEvents.length > 0 ? setCurrentDayEvent(dayEvents) : setCurrentDayEvent("");
    };

    return (
        <div
            onClick={() => {
                setDaySelected(day);
                getEvent();
            }}
            className={`border border-gray-200 flex flex-col ${getCurrentMonthClass(
                day
            )} ${getDayClass(day, daySelected)}`}
        >
            <header className="flex flex-col items-center">
                {rowIdx === 0 && <p className="text-sm mt-1">{day.format("dd")}</p>}
                <p className={`text-sm p-1 my-1 text-center ${getCurrentDayClass(day)}`}>
                    {day.format("D")}
                </p>
            </header>
            <div className={`flex-1`}>
                {dayEvents.map((e) => (
                    e.isComplete ? <div>{e[0].listName}</div> :
                    <div
                        onClick={() => {
                            setShowEventUpdateModal(true);
                            setEventListId(e[0].listId);
                            setEventListName(e[0].listName);
                            setEventLabel(e[0].label);
                            setEventId(e.eventId);
                            setEventDescription(e.description);
                            setEventCreated(e.created_at);
                        }}
                        className={`bg-${e[0].label}-200  text-gray-600 text-sm mb-1 cursor-pointer`}
                        key={e.eventId}
                    >
                        {e[0].listName}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Day;
