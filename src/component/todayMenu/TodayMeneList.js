import { useContext } from "react";
import { TodayContext } from "../../context/TodayContext";
import TodayMenuListCard from "./TodayMenuListCard";

const TodayMenuList = () => {
    const { todayEvent } = useContext(TodayContext);
    return (
        todayEvent &&
        todayEvent.map((event, listIndex) => (
            <TodayMenuListCard event={event} listIndex={listIndex} />
        ))
    );
};

export default TodayMenuList;
