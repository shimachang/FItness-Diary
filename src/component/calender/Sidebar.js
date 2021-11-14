import CreateEventButton from "./CreateEventButton";
import { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";
import SelectedDayEvent from './SelectedDayEvent'
const Sidebar = () => {
    const { daySelected } = useContext(GlobalContext);
    return (
        <aside className="border p-5 w-full lg:w-64">
            <div className="text-center mb-5">{daySelected.format("dddd, MMMM D日")}</div>
            <CreateEventButton />
            <SelectedDayEvent />
        </aside>
    );
};

export default Sidebar;
