import { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";
import { AuthContext } from "../../context/AuthContext";
import * as Api from "../../firebase/api";
import dig from "object-dig";
import { AddCircleOutlineOutlined } from "@material-ui/icons";

const EventUpdateModal = () => {
    const {
        setShowEventUpdateModal,
        setShowMadeModal,
        setShowSmallCalender,
        setEventDescription,
        daySelected,
        eventCreated,
        eventId,
        eventListId,
        eventListName,
        eventLabel,
        eventDescription,
    } = useContext(GlobalContext);
    const currentUser = useContext(AuthContext);
    const openMadeListModal = (e) => {
        setShowMadeModal(e);
    };
    const updateEventSubmit = (e) => {
        e.preventDefault();
        if (eventListId) {
            Api.updateEvents(
                eventCreated,
                eventId,
                eventListName,
                eventListId,
                dig(currentUser, "currentUser", "uid"),
                daySelected.valueOf(),
                eventDescription,
                eventLabel
            );
        }
        setShowEventUpdateModal(false);
    };
    const deleteSubmit = (uid, id) => {
        Api.deleteEvent(uid, id);
        setShowEventUpdateModal(false);
    };

    return (
        <div className="h-screen w-screen absolute left-0 top-0">
            <div
                onClick={() => setShowEventUpdateModal(false)}
                className="w-full h-full absolute bg-black bg-opacity-80 flex justify-center items-center"
            >
                <div onClick={(e) => e.stopPropagation()} className="relative max-w-lg w-5/6 h-1/2 bg-white mx-auto p-6 rounded-lg">
                    <form className="bg-white rounded-lg shadow-2xl">
                        <header className="w-full bg-gray-100 px-4 py-2 flex justify-between items-center">
                            <span className="material-icons-outlined text-gray-400">
                                drag_handle
                            </span>
                            <span>Update Event</span>
                            <button
                                onClick={() =>
                                    deleteSubmit(dig(currentUser, "currentUser", "uid"), eventId)
                                }
                            >
                                <span className="material-icons-outlined text-gray-400">
                                    delete
                                </span>
                            </button>
                            <button onClick={() => setShowEventUpdateModal(false)}>
                                <span className="material-icons-outlined text-gray-400">close</span>
                            </button>
                        </header>
                        <div className="p-3">
                            <div className="grid grid-cols-1/5 items-end gap-y-7">
                                <div className="cursor-pointer">
                                    <AddCircleOutlineOutlined
                                        onClick={() => openMadeListModal(true)}
                                    />
                                </div>{" "}
                                <div>{eventListName ? eventListName : "add a menu"}</div>
                                <span
                                    className="material-icons-outlined text-black-400"
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
                                onClick={updateEventSubmit}
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
export default EventUpdateModal;
