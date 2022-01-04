export const getDayClass = (day, daySelected) => {
    const currentDay = day.format("DD-MM-YY");
    const selectDay = daySelected && daySelected.format("DD-MM-YY");
    return currentDay === selectDay ? "bg-blue-100 text-blue-600 font-bold" : "";
};