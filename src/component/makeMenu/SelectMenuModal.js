import { Button } from "@mui/material";
import MakeMenuCard from "./MakeMenuCard";
import { useContext } from "react";
import { MenuContext } from "../../context/MenuContext";
import * as Api from "../../firebase/api";
import { AuthContext } from "../../context/AuthContext";
import dig from "object-dig";
import GlobalContext from "../../context/GlobalContext";
import { UpdateContext } from "../../context/UpdateContext";

const SelectMenuModal = (props) => {
    const {
        addTarget,
        setAddTarget,
        addCategory,
        setAddCategory,
        addMenu,
        setAddMenu,
        addWeight,
        setAddWeight,
        addRep,
        setAddRep,
    } = useContext(MenuContext);
    const { updateTarget, updateCategory, updateMenu, updateWeight, updateRep } =
        useContext(UpdateContext);
    const { setShowSelectMenuModal, showUpdateMadeModal, currentMenuList } =
        useContext(GlobalContext);
    const currentUser = useContext(AuthContext);
    const submit = () => {
        if (showUpdateMadeModal) {
            currentMenuList[0].menus.push({
                target: updateTarget,
                category: updateCategory,
                menu: updateMenu,
                weight: updateWeight,
                rep: updateRep,
            });
        }
        if (addMenu) {
            Api.addNewStorageMenuList(
                dig(currentUser, "currentUser", "uid"),
                addTarget,
                addCategory,
                addMenu,
                addWeight,
                addRep
            );
            setAddTarget("");
            setAddCategory("");
            setAddMenu("");
            setAddWeight("");
            setAddRep("");
            setShowSelectMenuModal(false);
        }
        props.fetch();
    };
    return (
        <div className="h-screen w-screen fixed left-0 top-0">
            <div className="w-full h-full absolute bg-black bg-opacity-40 flex justify-center items-center">
                <form className="mt-2 bg-white relative rounded-lg shadow-2xl">
                    <header className="bg-gray-100 px-4 py-2 flex justify-between items-center">
                        <span className="material-icons-outlined text-gray-400">drag_handle</span>
                        <span>{showUpdateMadeModal ? "Up Select Menu" : "Select Menu"}</span>
                        <button onClick={() => setShowSelectMenuModal(false)}>
                            <span className="material-icons-outlined text-gray-400">close</span>
                        </button>
                    </header>
                    <div className="bg-green-50 py-4 px-2">
                        <MakeMenuCard />
                    </div>
                    <div className="text-center py-4">
                        <Button
                            onClick={() => submit()}
                            disabled={addMenu ? false : true}
                            size="large"
                            variant="contained"
                        >
                            追加
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SelectMenuModal;
