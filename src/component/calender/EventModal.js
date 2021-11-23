import { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";
import { AuthContext } from "../../context/AuthContext";
import * as Api from "../../firebase/api";
import dig from "object-dig";
import { AddCircleOutlineOutlined } from "@material-ui/icons";

const EventModal = () => {
    const {
        setShowEventModal,
        setShowMekedModal,
        setShowSmallCalender,
        daySelected,
        eventListId,
        eventListName,
        eventLabel,
        eventDescription,
        setEventDescription,
    } = useContext(GlobalContext);
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
                daySelected.valueOf(),
                eventDescription,
                eventLabel
            );
        }
        setShowEventModal(false);
    };

    return (
        <div className="h-screen w-screen absolute left-0 top-0">
            <div className="w-full h-full absolute bg-black bg-opacity-80 flex justify-center items-center">
                <div className="relative max-w-lg w-5/6 h-1/2 bg-white mx-auto p-6">
                    <form className="bg-white rounded-lg shadow-2xl">
                        <header className="bg-gray-100 px-4 py-2 flex justify-between items-center">
                            <span className="material-icons-outlined text-gray-400">
                                drag_handle
                            </span>
                            <span>New Event</span>
                            <button onClick={() => setShowEventModal(false)}>
                                <span className="material-icons-outlined text-gray-400">close</span>
                            </button>
                        </header>
                        <div className="p-3">
                            <div className="grid grid-cols-1/5 items-end gap-y-7">
                                <div className="cursor-pointer">
                                    <AddCircleOutlineOutlined
                                        onClick={() => openMakedListModal(true)}
                                    />
                                </div>
                                <div>{eventListName ? eventListName : "add a menu"}</div>
                                <span
                                    className="material-icons-outlined text-gray-400"
                                    onClick={() => setShowSmallCalender(true)}
                                >
                                    schedule
                                </span>
                                <p>{daySelected.format("dddd, MMMM D日")}</p>
                                <span className="material-icons-outlined text-gray-400">
                                    segment
                                </span>
                                <input
                                    type="text"
                                    name="description"
                                    placeholder="add a description"
                                    value={eventDescription}
                                    required
                                    className="pt-3 border-0 text-gray-600 pd-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                                    onChange={(e) => setEventDescription(e.target.value)}
                                />
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
            </div>
        </div>
    );
};

export default EventModal;
