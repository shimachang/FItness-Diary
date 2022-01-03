import dayjs from "dayjs";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import * as Api from "../../firebase/api";
import dig from "object-dig";
import TodayMenuList from "./TodayMeneList";
import { TodayContext } from "../../context/TodayContext";
import { convertingArray } from "../../functions/convertingArray";
import SuccessModal from "./SuccessModal";
import { ShowContext } from "../../context/ShowContext";

const TodayMenus = () => {
    const currentUser = useContext(AuthContext);
    const { todayEvent, setTodayEvent } = useContext(TodayContext);
    const { showSuccessModal, setShowSuccessModal } = useContext(ShowContext);
    const [checkedValues, setCheckedValues] = useState([]);
    const currentUid = dig(currentUser, "currentUser", "uid");
    console.log(todayEvent);
    useEffect(() => {
        menuListFetch();
        checkedLength();
    }, [currentUser]);
    const handleChange = (e, isChecked, listIndex, menuIndex) => {
        if (isChecked) {
            todayEvent[listIndex][0].menus[menuIndex].isChecked = false;
            setCheckedValues(checkedValues.filter((val) => val !== e.target.value));
        } else {
            todayEvent[listIndex][0].menus[menuIndex].isChecked = true;
            setCheckedValues([...checkedValues, e.target.value]);
        }
    };
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
        setTodayEvent(currentEvents);
    };

    const checkedLength = () => {
        let array = [];
        for (let i = 0; i < todayEvent.length; i++) {
            array.push(todayEvent[i][0].menus.filter((menu) => menu.isChecked));
        }
        return array;
    };

    const result2 = checkedLength();

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
        // Api.addHistory(currentUid, convertingArray(result2));
        setShowSuccessModal(true);
        menuListFetch();
        setCheckedValues([]);
    };
    return (
        <>
            {showSuccessModal && <SuccessModal />}
            <div className="w-screen h-screen max-w-sm m-auto text-center">
                <div className="pt-10 text-lg">{dayjs().format("YYYY年MM月DD日")}</div>
                <div className="my-4">
                    {todayEvent.length > 0 ? "今日は筋トレの日です!!" : "今日はおやすみです..."}
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
