import dayjs from "dayjs";

export const getCurrentMonthClass = (day) => {
    return day.format('YYYY-MM') !== dayjs().format('YYYY-MM') ?
    "bg-gray-100 text-gray-400"  : ""
}