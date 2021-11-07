import dayjs, { Dayjs } from "dayjs";
import { useContext, useEffect, useState } from "react";
import GlobalContext from "../../context/GlobalContext";
import { AuthContext } from "../../context/AuthContext";
import * as Api from "../../firebase/api";
import dig from "object-dig";

const Day = ({ day, rowIdx }) => {
    const { setDaySelected, daySelected } = useContext(GlobalContext);
    const currentUser = useContext(AuthContext);
    const [dayEvents, setDayEvents] = useState([]);
    useEffect(() => {
        eventsFetch();
    }, [currentUser, day]);

    const eventsFetch = async () => {
        if (dig(currentUser, "currentUser", "uid")) {
            const eventsFetch = await Api.getInitCalenderEvents(currentUser.currentUser.uid);
            const filterEvents = eventsFetch.filter(
                (evt) => dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY")
            );
            setDayEvents(filterEvents);
        }
    };
    const getCurrentDayClass = () => {
        return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
            ? "bg-blue-600 text-white rounded-full w-7"
            : "";
    };
    const getDayClass = (day) => {
        const format = "DD-MM-YY";
        const nowDay = dayjs().format(format);
        const currentDay = day.format(format);
        const selectDay = daySelected && daySelected.format(format);
        if (currentDay === selectDay) {
            return "bg-blue-100 text-blue-600 font-bold";
        } else {
            return "";
        }
    };
    return (
        <div className={`border border-gray-200 flex flex-col ${getDayClass(day)}`}>
            <header className="flex felx-col items-center">
                {rowIdx === 0 && <p className="text-sm mt-1">{day.format("dd")}</p>}
                <p className={`text-sm p-1 my-1 text-center ${getCurrentDayClass()}`}>
                    {day.format("DD")}
                </p>
            </header>
            <div
                className={`flex-1 cursor-pointer `}
                onClick={() => {
                    setDaySelected(day);
                }}
            >
                {dayEvents.map((e, id) => (
                    <div className={`bg-${e.label}-200`} key={id}>
                        {e.listName}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Day;
