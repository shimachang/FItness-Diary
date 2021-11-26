import { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";
import MenuList from "./MenuList";

const MakeMenuModal = (props) => {
    const { setShowMakeMenuModal } = useContext(GlobalContext);

    return (
        <div className="h-screen w-screen fixed left-0 top-0">
            <div className="w-full h-full absolute bg-black bg-opacity-80 flex justify-center items-center">
                <div className="mt-2 bg-white relative rounded-lg shadow-2xl">
                    <header className="bg-gray-100 px-4 py-2 flex justify-between items-center">
                        <span className="material-icons-outlined text-gray-400">drag_handle</span>
                        <span>Make Menu</span>
                        <button onClick={() => setShowMakeMenuModal(false)}>
                            <span className="material-icons-outlined text-gray-400">close</span>
                        </button>
                    </header>
                    <div>
                        <MenuList menus={props.menus} fetch={props.fetch} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MakeMenuModal;
