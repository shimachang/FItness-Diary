import dayjs from "dayjs";
export const getCurrentDayClass = (day) => {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
        ? "bg-blue-600 text-white rounded-full w-7"
        : "";
};