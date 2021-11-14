import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "../../context/GlobalContext";
import { getMonth } from "../../util";

const SmallCalender = () => {
    const [currentMonthIndex, setCurrentMonthIndex] = useState(dayjs().month());
    const [currentMonth, setCurrentMonth] = useState(getMonth());
    useEffect(() => {
        setCurrentMonth(getMonth(currentMonthIndex));
    }, [currentMonthIndex]);

    const { monthIndex, setSmallCalenderMonth, setDaySelected, daySelected, setShowSmallCalender } =
        useContext(GlobalContext);

    useEffect(() => {
        setCurrentMonthIndex(monthIndex);
    }, [monthIndex]);

    const handlePrevMonth = () => {
        setCurrentMonthIndex(currentMonthIndex - 1);
    };
    const handleNextMonth = () => {
        setCurrentMonthIndex(currentMonthIndex + 1);
    };
    const getDayClass = (day) => {
        const format = "DD-MM-YY";
        const nowDay = dayjs().format(format);
        const currentDay = day.format(format);
        const selectDay = daySelected && daySelected.format(format);
        if (nowDay === currentDay) {
            return "bg-blue-500 rounded-full text-white";
        } else if (currentDay === selectDay) {
            return "bg-blue-100 rounded-full text-blue-600 font-bold";
        } else {
            return "";
        }
    };
    return (
        <div className="h-screen w-screen absolute left-0 top-0">
            <div className="w-full h-full absolute bg-black bg-opacity-80 flex justify-center items-center">
                <div className="relative w-5/6 h-1/2 bg-white mx-auto p-6">
                    <header className="flex justify-between ">
                        <p className="text-gray-500 font-bold">
                            {dayjs(new Date(dayjs().year(), currentMonthIndex)).format(
                                "YYYY年 MMMM "
                            )}
                        </p>
                        <div>
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
                            <button onClick={() => setShowSmallCalender(false)}>
                                <span className="material-icons-outlined text-gray-400">close</span>
                            </button>
                        </div>
                    </header>
                    <div className="grid grid-cols-7 grid-rows-7">
                        {currentMonth[0].map((day, i) => (
                            <span key={i} className="text-sm py-1 text-center">
                                {day.format("dd")}
                            </span>
                        ))}
                        {currentMonth.map((row, i) => (
                            <React.Fragment key={i}>
                                {row.map((day, id) => (
                                    <button
                                        onClick={() => {
                                            setSmallCalenderMonth(currentMonthIndex);
                                            setDaySelected(day);
                                        }}
                                        key={id}
                                        className={`py-1 w-full ${getDayClass(day)}`}
                                    >
                                        <span className="text-sm">{day.format("D")}</span>
                                    </button>
                                ))}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SmallCalender;
