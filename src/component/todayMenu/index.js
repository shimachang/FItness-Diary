import dayjs from "dayjs";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import * as Api from "../../firebase/api";
import dig from "object-dig";
import TodayMenuList from "./TodayMeneList";
import { TodayContext } from "../../context/TodayContext";

const TodayMenus = () => {
    const { currentUser } = useContext(AuthContext);
    const { todayEvent, setTodayEvent } = useContext(TodayContext);
    const [checkedValues, setCheckedValues] = useState([]);
    useEffect(() => {
        menuListFetch();
    }, [currentUser]);
    const handleChange = (isChecked, listIndex, menuIndex) => {
        console.log(isChecked, listIndex, menuIndex);
        isChecked
            ? (todayEvent[listIndex][0].menus[menuIndex].isChecked = false)
            : (todayEvent[listIndex][0].menus[menuIndex].isChecked = true);
    };
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
    const menuLength = () => {
        let num = [];
        for (let i = 0; i < todayEvent.length; i++) {
            num.push(todayEvent[i][0].menus.length);
        }
        return num;
    };
    const result = menuLength();
    const reducer = (prev, curr) => prev + curr;

    const submit = () => {
        setCheckedValues([]);
    };
    return (
        <>
            <div className="w-screen h-screen max-w-sm m-auto text-center">
                <div className="pt-10 text-lg">{dayjs().format("YYYY年MM月DD日")}</div>
                <div className="my-4">
                    {todayEvent.length > 0 ? "イベントがあります!!" : "今日はおやすみです..."}
                </div>
                <button
                    className="bg-blue-600 text-white text-xl border py-2 p-2 rounded-full flex items-center m-auto shadow-md hover:shadow-2xl"
                    onClick={() => submit()}
                >
                    <span className="pl-3 pr-7">
                        {`Finish ${checkedValues.length}/${result.reduce(reducer, 0)}`}
                    </span>
                </button>
                <div className="my-6">
                    {todayEvent && <TodayMenuList handleChange={handleChange} />}
                </div>
            </div>
        </>
    );
};

export default TodayMenus;
