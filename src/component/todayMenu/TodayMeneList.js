import { useContext } from "react";
import { TodayContext } from "../../context/TodayContext";
import SelectRep from "../makeMenu/SelectRep";
import SelectSet from "../makeMenu/SelectSetName";
import SelectWeight from "../makeMenu/SelectWeight";

const TodayMenuList = ({ checkedValues, handleChange }) => {
    const { todayEvent } = useContext(TodayContext);
    console.log(todayEvent)
    return todayEvent && todayEvent.map((e, listIndex) => (
        <div key={listIndex} className="bg-green-50 rounded py-2 my-2">
            <div className="mt-4" key={e[0].listId}>
                <div className="inline text-xl border-b-2 border-red-600 px-3 mb-4">
                    {e[0].listName}
                </div>
                {e[0].menus.map((m, menuIndex) => (
                    <div key={menuIndex} className="flex text-lg flex-col my-6 pt-4">
                        <label className="flex items-center px-6 cursor-pointer justify-between">
                            <div className="pl-3">{m.menu}</div>
                            <input
                                className="rounded"
                                type="checkbox"
                                value={`${m.menu}${listIndex}`}
                                onChange={m.isChecked ? false : true}
                                checked={m.isChecked}
                            />
                        </label>
                        <div className="pt-5 pb-2 grid grid-cols-3">
                            <SelectWeight listIndex={listIndex} menuIndex={menuIndex} />
                            <SelectRep listIndex={listIndex} menuIndex={menuIndex} />
                            <SelectSet listIndex={listIndex} menuIndex={menuIndex} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    ));
};

export default TodayMenuList;
