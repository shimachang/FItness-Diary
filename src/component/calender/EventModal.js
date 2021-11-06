import { useContext, useState, useEffect } from "react";
import GlobalContext from "../../context/GlobalContext";
import { AuthContext } from "../../context/AuthContext";
import { saveEvents } from "../../assets/saveEvents";
import { db, firebaseTimeStamp } from "../../firebase";
import * as Api from "../../firebase/api";
import dig from "object-dig";
import { AddCircleOutlineOutlined } from "@material-ui/icons";

const labelsClasses = ["indigo", "gray", "green", "blue", "red", "purple"];
const EventModal = () => {
    const {
        setShowEventModal,
        setShowMekedModal,
        daySelected,
        dispatchCalEvent,
        eventListId,
        eventListName,
    } = useContext(GlobalContext);
    console.log(eventListId);
    const currentUser = useContext(AuthContext);
    const openMakedListModal = (e) => {
        setShowMekedModal(e);
    };
    const saveEventSubmit = (e) => {
        e.preventDefault();
        if (eventListId) {
            Api.addEvents(
                eventListName,
                eventListId,
                dig(currentUser, "currentUser", "uid"),
                daySelected.valueOf()
            );
        }
        // dispatchCalEvent({ type: "push", payload: calenderEvent });
        setShowEventModal(false);
    };
    console.log(daySelected.valueOf());
    const [description, setDescription] = useState("");
    const [selectedLabel, seteSelectedLabel] = useState(labelsClasses[0]);

    return (
        <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
            <form className="bg-white rounded-lg shadow-2xl w-1/4">
                <header className="bg-gray-100 px-4 py-2 flex justify-between items-center">
                    <span className="material-icons-outlined text-gray-400">drag_handle</span>
                    <button onClick={() => setShowEventModal(false)}>
                        <span className="material-icons-outlined text-gray-400">close</span>
                    </button>
                </header>
                <div className="p-3">
                    <div className="grid grid-cols-1/5 items-end gap-y-7">
                        <AddCircleOutlineOutlined onClick={() => openMakedListModal(true)} />
                        <div>{eventListName ? eventListName : "add a menu"}</div>
                        <span className="material-icons-outlined text-gray-400">schedule</span>
                        <p>{daySelected.format("dddd, MMMM D日")}</p>
                        <span className="material-icons-outlined text-gray-400">segment</span>
                        <input
                            type="text"
                            name="description"
                            placeholder="add a description"
                            value={description}
                            required
                            className="pt-3 border-0 text-gray-600 pd-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        {/* <span className="material-icons-outlined text-gray-400">
                            bookmark_border
                        </span>
                        <div className="flex gap-x-2">
                            {labelsClasses.map((labelClass, i) => (
                                <span
                                    onClick={() => seteSelectedLabel(labelClass)}
                                    key={i}
                                    className={`bg-${labelClass}-500 w-6 h-6 rounded-full flex items-center justify-center`}
                                >
                                    {selectedLabel === labelClass && (
                                        <span className="material-icons-outlined text-white ">
                                            check
                                        </span>
                                    )}
                                </span>
                            ))}
                        </div> */}
                    </div>
                </div>
                <footer className="flex justify-end  border-t p-3 mt-5">
                    <button
                        type="submit"
                        onClick={saveEventSubmit}
                        className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white"
                    >
                        Save
                    </button>
                </footer>
            </form>
        </div>
    );
};

export default EventModal;
