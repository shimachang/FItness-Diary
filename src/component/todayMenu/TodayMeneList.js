import SelectRep from "../makeMenu/SelectRep";
import SelectSet from "../makeMenu/SelectSet";
import SelectWeight from "../makeMenu/SelectWeight";

const TodayMenuList = ({ todayEvent, checkedValues, handleChange }) => {
    return todayEvent.map((e, index) => (
        <div key={index} className="bg-green-50 rounded py-2 my-2">
            <div className="mt-4" key={e[0].listId}>
                <div className="inline text-xl border-b-2 border-red-600 px-3 mb-4">
                    {e[0].listName}
                </div>
                {e[0].menus.map((m, i) => (
                    <div key={i} className="flex text-lg flex-col my-6 pt-4">
                        <label className="flex items-center px-6 cursor-pointer justify-between">
                            <div className="pl-3">{m.menu}</div>
                            <input
                                className="rounded"
                                type="checkbox"
                                value={m.menu}
                                onChange={handleChange}
                                checked={checkedValues.includes(m.menu)}
                            />
                        </label>

                        <div className="pt-5 pb-2 grid grid-cols-3">
                            <SelectWeight todayEvent={todayEvent} listIndex={index} menuIndex={i} />
                            <SelectRep todayEvent={todayEvent} listIndex={index} menuIndex={i} />
                            <SelectSet todayEvent={todayEvent} listIndex={index} menuIndex={i} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    ));
};

export default TodayMenuList;
