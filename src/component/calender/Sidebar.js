import CreateEventButton from "./CreateEventButton";
import { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";

const Sidebar = () => {
    const { setDaySelected, setShowEventModal, daySelected } = useContext(GlobalContext);
    return (
        <aside className="border p-5 w-64">
            <div className='text-center mb-5'>{daySelected.format("dddd, MMMM D日")}</div>
            <CreateEventButton />
        </aside>
    );
};

export default Sidebar;
