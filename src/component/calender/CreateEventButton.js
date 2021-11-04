import { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";
import { AddCircleOutlineOutlined } from "@material-ui/icons";

const CreateEventButton = () => {
    const { setShowEventModal } = useContext(GlobalContext);

    return (
        <button
            onClick={() => setShowEventModal(true)}
            className="border py-2 p-2 rounded-full flex items-center m-auto shadow-md hover:shadow-2xl"
        >
            <AddCircleOutlineOutlined />
            <span className="pl-3 pr-7">Create</span>
        </button>
    );
};

export default CreateEventButton;
