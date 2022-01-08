import dayjs from "dayjs";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import * as Api from "../../firebase/api";
import dig from "object-dig";
import TodayMenuList from "./TodayMenuList";
import { TodayContext } from "../../context/TodayContext";
import { convertingArray } from "../../functions/convertingArray";
import SuccessModal from "./SuccessModal";
import { ShowContext } from "../../context/ShowContext";

const TodayMenus = () => {
    const currentUser = useContext(AuthContext);
    const { todayEvent, setTodayEvent } = useContext(TodayContext);
    const { showSuccessModal, setShowSuccessModal } = useContext(ShowContext);
    const currentUid = dig(currentUser, "currentUser", "uid");
    useEffect(() => {
        menuListFetch();
    }, [currentUser]);
    const menuListFetch = async () => {
        const menuLists = await Api.getMyMenuLists(currentUid);
        const eventFetch = await Api.getInitCalenderEvents(currentUid);
        const filterEvent = eventFetch.filter(
            (evt) => dayjs(evt.day).format("DD-MM-YY") === dayjs().format("DD-MM-YY")
        );
        const todayEventId = filterEvent.length && filterEvent.map((e) => e.listId);
        let currentEvents = [];
        for (let i = 0; i < todayEventId.length; i++) {
            currentEvents.push(menuLists.filter((val) => val.listId === todayEventId[i]));
        }
        for (let i = 0; i < todayEventId.length; i++) {
            currentEvents[i].push(filterEvent[i]);
        }
        setTodayEvent(currentEvents);
    };

    console.log(todayEvent);

    const submit = () => {
        // Api.addHistory(currentUid, convertingArray(todayEvent));
        setShowSuccessModal(true);
        menuListFetch();
    };
    return (
        <>
            {showSuccessModal && <SuccessModal />}
            <div className="w-screen h-screen max-w-sm m-auto text-center">
                <div className="pt-10 text-lg">{dayjs().format("YYYY年MM月DD日")}</div>
                <div className="my-4">
                    {todayEvent.length ? "今日は筋トレの日です!!" : "今日はおやすみです..."}
                </div>
                <div className="my-6">{todayEvent && <TodayMenuList menuListFetch={menuListFetch} />}</div>
            </div>
        </>
    );
};

export default TodayMenus;
