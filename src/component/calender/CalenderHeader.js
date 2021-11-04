import dayjs from "dayjs";
import { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";

const CalenderHeader = () => {
    const { monthIndex, setMonthIndex } = useContext(GlobalContext);
    const handlePrevMonth = () => {
        setMonthIndex(monthIndex - 1);
    };
    const handleNextMonth = () => {
        setMonthIndex(monthIndex + 1);
    };
    const handleReset = () => {
        setMonthIndex(
            monthIndex === dayjs().month() ? monthIndex + Math.random() : dayjs().month()
        );
    };
    return (
        <header className="px-4 py-2 flex items-center">
            <button onClick={handleReset} className="border rounded py-2 px-4 mr-5">
                今日
            </button>
            <button onClick={handlePrevMonth}>
                <span className="material-icons-outlined corsor-pointer text-gray-600 mx-2">
                    chevron_left
                </span>
            </button>
            <button onClick={handleNextMonth}>
                <span className="material-icons-outlined corsor-pointer text-gray-600 mx-2">
                    chevron_right
                </span>
            </button>
            <h2 className="ml-1 text-xl text-gray-500 font-bold">
                {dayjs(new Date(dayjs().year(), monthIndex)).format("YYYY年 MMM")}
            </h2>
        </header>
    );
};

export default CalenderHeader;
