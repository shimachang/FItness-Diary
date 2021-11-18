import dayjs from "dayjs";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import * as Api from "../../firebase/api";
import dig from "object-dig";

const TodayMenus = () => {
    const { currentUser } = useContext(AuthContext);
    const [todayEvent, setTodayEvent] = useState("");

    useEffect(() => {
        eventFetch();
    }, [currentUser]);
    const eventFetch = async () => {
        if (dig(currentUser, "uid")) {
            const eventFetch = await Api.getInitCalenderEvents(currentUser.uid);
            const filterEvent = eventFetch.filter(
                (evt) => dayjs(evt.day).format("DD-MM-YY") === dayjs().format("DD-MM-YY")
            );
            setTodayEvent(filterEvent);
        }
    };
    console.log(todayEvent)

    return (
        <>
            <div>{dayjs().format("YYYY年MM月DD日")}</div>
            <div>今日のメニュー</div>
            <div>{todayEvent !== [] ? "イベントがあります!!" : "今日はおやすみです..."}</div>
            <div>{todayEvent && todayEvent.map(e => (
                <div key={e.eventId}>{e.listName}</div>
            ))}</div>
        </>
    );
};

export default TodayMenus;
