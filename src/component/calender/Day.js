import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import GlobalContext from "../../context/GlobalContext";

const Day = ({ day, rowIdx }) => {
    const [dayEvents, setDayEvents] = useState([]);
    useEffect(() => {}, []);
    const getCurrentDayClass = () => {
        return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY") ? "bg-blue-600 text-white rounded-full w-7" : "";
    };
    const { setDaySelected, setShowEventModal } = useContext(GlobalContext);
    return (
        <div className="border border-gray-200 flex flex-col">
            <header className="flex felx-col items-center">
                {rowIdx === 0 && <p className="text-sm mt-1">{day.format("dd")}</p>}
                <p className={`text-sm p-1 my-1 text-center ${getCurrentDayClass()}`}>{day.format("DD")}</p>
            </header>
            <div
                className="flex-1 cursor-pointer"
                onClick={() => {
                    setDaySelected(day);
                    setShowEventModal(true);
                }}
            >
                {""}
            </div>
        </div>
    );
};

export default Day;
