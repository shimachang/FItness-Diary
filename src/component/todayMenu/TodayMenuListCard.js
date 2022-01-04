import { useContext, useState } from "react";
import { TodayContext } from "../../context/TodayContext";
import SelectRep from "../makeMenu/SelectRep";
import SelectSet from "../makeMenu/SelectSetName";
import SelectWeight from "../makeMenu/SelectWeight";
import { Button } from "@material-ui/core";

const TodayMenuListCard = ({ event, listIndex }) => {
    const { todayEvent } = useContext(TodayContext);
    const [checkedValues, setCheckedValues] = useState([]);
    const handleChange = (e, isChecked, listIndex, menuIndex) => {
        if (isChecked) {
            todayEvent[listIndex][0].menus[menuIndex].isChecked = false;
            setCheckedValues(checkedValues.filter((val) => val !== e.target.value));
        } else {
            todayEvent[listIndex][0].menus[menuIndex].isChecked = true;
            setCheckedValues([...checkedValues, e.target.value]);
        }
    };
    const submit = () => {

    }
    return (
        <div key={listIndex} className="bg-green-50 rounded py-2 my-2">
            <div className="mt-4" key={event[0].listId}>
                <div className="inline text-xl border-b-2 border-red-600 px-3 mb-4">
                    {event[0].listName}
                </div>
                {event[0].menus.map((m, menuIndex) => (
                    <div key={menuIndex} className="flex text-lg flex-col my-6 pt-4">
                        <label className="flex items-center px-6 cursor-pointer justify-between">
                            <div className="pl-3">{m.menu}</div>
                            <input
                                className="rounded"
                                type="checkbox"
                                value={`${m.menu}${listIndex}`}
                                onChange={(e) => handleChange(e, m.isChecked, listIndex, menuIndex)}
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
            <Button
                variant="contained"
                onClick={() => submit()}
                disabled={checkedValues.length ? false : true}
                color="primary"
            >
                <span className="pl-3 pr-7">
                    {`Finish ${checkedValues.length}/${todayEvent[listIndex][0].menus.length}`}
                </span>
            </Button>
        </div>
    );
};

export default TodayMenuListCard;
