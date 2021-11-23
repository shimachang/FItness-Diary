import { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";
import MakeMenuList from "./MakeMenuList";
import MenuList from "./MenuList";

const MakeMenuModal = (props) => {
    const { setShowMakeMenuModal } = useContext(GlobalContext);
    console.log(props.menus);
    return (
        <div className="h-screen w-screen fixed left-0 top-0">
            <div className="w-full h-full absolute bg-black bg-opacity-80 flex justify-center items-center">
                    <form className="bg-white rounded-lg shadow-2xl">
                        <header className="bg-gray-100 px-4 py-2 flex justify-between items-center">
                            <span className="material-icons-outlined text-gray-400">
                                drag_handle
                            </span>
                            <span>New Event</span>
                            <button onClick={() => setShowMakeMenuModal(false)}>
                                <span className="material-icons-outlined text-gray-400">close</span>
                            </button>
                        </header>
                        <MakeMenuList fetch={props.fetch} />
                        <div>
                            <MenuList menus={props.menus} fetch={props.fetch} />
                        </div>
                        <footer className="flex justify-end  border-t p-3 mt-5">
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white"
                            >
                                Save
                            </button>
                        </footer>
                    </form>
            </div>
        </div>
    );
};

export default MakeMenuModal;
