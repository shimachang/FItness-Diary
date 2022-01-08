import { useContext } from "react";
import { TodayContext } from "../../context/TodayContext";
import TodayMenuListCard from "./TodayMenuListCard";

const TodayMenuList = ({ menuListFetch }) => {
    const { todayEvent } = useContext(TodayContext);
    return (
        todayEvent &&
        todayEvent.map((event, listIndex) => (
            <TodayMenuListCard
                key={listIndex}
                event={event}
                listIndex={listIndex}
                menuListFetch={menuListFetch}
            />
        ))
    );
};

export default TodayMenuList;
