import dayjs, { Ls } from "dayjs";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import * as Api from "../../firebase/api";
import dig from "object-dig";
import ListItem from "@material-ui/core/ListItem";
import MakedListCard from "../makeMenu/MakedListCard";

const TodayMenus = () => {
    const { currentUser } = useContext(AuthContext);
    const [todayEvent, setTodayEvent] = useState("");

    useEffect(() => {
        menuListFetch();
    }, [currentUser]);
    const menuListFetch = async () => {
        if (dig(currentUser, "uid")) {
            const menuLists = await Api.getMyMenuLists(currentUser.uid);
            const eventFetch = await Api.getInitCalenderEvents(currentUser.uid);
            const filterEvent = eventFetch.filter(
                (evt) => dayjs(evt.day).format("DD-MM-YY") === dayjs().format("DD-MM-YY")
            );
            const todayEventId = filterEvent.length && filterEvent.map((e) => e.listId);
            let currentEvents = [];
            for (let i = 0; i < todayEventId.length; i++) {
                currentEvents.push(menuLists.filter((val) => val.listId === todayEventId[i]));
            }
            setTodayEvent(currentEvents);
        }
    };

    return (
        <>
            <div className="w-screen h-screen max-w-sm m-auto text-center bg-green-50">
                <div className="pt-10 text-lg">{dayjs().format("YYYY年MM月DD日")}</div>
                <div className="mt-4">今日のメニュー</div>
                <div className="mt-4">
                    {todayEvent.length > 0 ? "イベントがあります!!" : "今日はおやすみです..."}
                </div>
                <div className="mt-4">
                    {todayEvent &&
                        todayEvent.map((e) => (
                            <div className="mt-4" key={e[0].listId}>
                                <ListItem >
                                    <MakedListCard menu={e[0]} />
                                </ListItem>
                            </div>
                        ))}
                </div>
            </div>
        </>
    );
};

export default TodayMenus;
