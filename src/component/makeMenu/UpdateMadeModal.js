import { IconButton, Button, TextField } from "@material-ui/core";
import { AddCircleOutlineOutlined } from "@material-ui/icons";
import { useContext, useState } from "react";
import GlobalContext from "../../context/GlobalContext";
import SelectLabel from "./SelectLabel";
import CurrentMenuList from "./CurrentMenuLIst";
import * as Api from "../../firebase/api";
import { UpdateContext } from "../../context/UpdateContext";

const UpdateMadeModal = () => {
    const { setShowUpdateMadeModal, setShowSelectMenuModal, currentMenuList } =
        useContext(GlobalContext);
    const { updateLabel } = useContext(UpdateContext);
    const [listName, setListName] = useState(currentMenuList[0].listName);
    const submit = () => {
        Api.updateMyMenuList(
            listName,
            currentMenuList[0].uid,
            currentMenuList[0].id,
            currentMenuList[0].menus,
            currentMenuList[0].created_at,
            updateLabel
        );
        // Api.updateEventWithMyMenuList()
        setShowUpdateMadeModal(false);
    };
    return (
        <div className="h-screen w-screen fixed left-0 top-0">
            <div className="w-full h-full absolute bg-black bg-opacity-40 flex justify-center items-center">
                <form className="mt-2 bg-white relative rounded-lg shadow-2xl">
                    <header className="bg-gray-100 px-4 py-2 flex justify-between items-center">
                        <span className="material-icons-outlined text-gray-400">drag_handle</span>
                        <span>Update Menu</span>
                        <button onClick={() => setShowUpdateMadeModal(false)}>
                            <span className="material-icons-outlined text-gray-400">close</span>
                        </button>
                    </header>
                    <div className="mx-auto mt-6 max-w-sm">
                        <div className="text-center mb-7">
                            <TextField
                                id="standard-basic"
                                label="Add List Name"
                                variant="standard"
                                autoComplete="off"
                                defaultValue={listName}
                                onChange={(e) => setListName(e.target.value)}
                            />
                            <SelectLabel currentLabelClass={currentMenuList[0].label} />
                        </div>
                        <div className="text-center mb-4">
                            Add New Menu
                            <IconButton
                                edge="end"
                                aria-label="delete"
                                onClick={() => setShowSelectMenuModal(true)}
                            >
                                <AddCircleOutlineOutlined />
                            </IconButton>
                        </div>
                        <ul className="pl-0 list-none overflow-scroll max-h-60">
                            <CurrentMenuList />
                        </ul>
                    </div>
                    <div className="text-center py-4">
                        <Button
                            onClick={() => submit()}
                            variant="contained"
                            disabled={listName ? false : true}
                            color="primary"
                        >
                            メニュー更新
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateMadeModal;
