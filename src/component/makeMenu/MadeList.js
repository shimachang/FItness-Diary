import { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";
import * as Api from "../../firebase/api";
import MadeListCard from "./MadeListCard";
import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import CreateIcon from "@material-ui/icons/Create";
import ListItem from "@material-ui/core/ListItem";
import { AddCircleOutlineOutlined } from "@material-ui/icons";

const MadeList = ({ madeMenus, madeFetch }) => {
    const { setShowMakeMenuModal, setShowUpdateMadeModal, setCurrentMenuList } =
        useContext(GlobalContext);
    const updateHandle = async (uid, id) => {
        const MenuList = await Api.getCurrentMyMenuList(uid, id);
        setCurrentMenuList(MenuList);
        setShowUpdateMadeModal(true);
    };
    const deleteHandle = (uid, id) => {
        Api.deleteMyMenuList(uid, id);
        Api.deleteEventWithListId(uid, id);
        madeFetch();
    };

    return (
        <>
            <div className="text-center text-xl mt-10 mb-4">
                My Menu List
                <div className="inline ml-4">
                    <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => setShowMakeMenuModal(true)}
                    >
                        <AddCircleOutlineOutlined />
                    </IconButton>
                </div>
            </div>
            <div className="container text-center mx-auto mt-4 md-10 py-4 flex flex-col justify-center">
                {madeMenus.length > 0 &&
                    madeMenus.map((menu) => (
                        <div key={menu.listId}>
                            <ListItem className="max-w-sm m-auto">
                                <MadeListCard menu={menu} />
                                <span className={`material-icons text-${menu.label}-600 `}>
                                    label
                                </span>
                                <IconButton
                                    edge="end"
                                    aria-label="delete"
                                    onClick={() => updateHandle(menu.uid, menu.listId)}
                                >
                                    <CreateIcon />
                                </IconButton>
                                <IconButton
                                    edge="end"
                                    aria-label="delete"
                                    onClick={() => deleteHandle(menu.uid, menu.listId)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </ListItem>
                        </div>
                    ))}
            </div>
        </>
    );
};
export default MadeList;
