import { useState, useContext } from "react";
import dig from "object-dig";
import { AuthContext } from "../../context/AuthContext";
import * as Api from "../../firebase/api";
import SelectLabel from "./SelectLabel";
import { IconButton, Button, TextField } from "@material-ui/core";
import { AddCircleOutlineOutlined } from "@material-ui/icons";
import { MenuContext } from "../../context/MenuContext";
import GlobalContext from "../../context/GlobalContext";
import MenuListCard from "./MenuListCard";

const MenuList = (props) => {
    const [listName, setListName] = useState("");
    const currentUser = useContext(AuthContext);
    const { addLabel } = useContext(MenuContext);
    const { setShowSelectMenuModal, setShowMakeMenuModal } = useContext(GlobalContext);
    const propsMenus = props.menus; 
    const currentUid = dig(currentUser, "currentUser", "uid")
    console.log(dig(currentUser, "currentUser", "uid"))
    const submit = async () => {
        if (propsMenus) {
            Api.addMyMenuList(
                listName,
                currentUid,
                propsMenus,
                addLabel
            );
            const docs = await Api.getNewStorageDocsId(currentUid);
            for (const doc of docs) {
                Api.deleteNewStorage(currentUid, doc.id);
            }
        }
        props.fetch();
        props.madeFetch();
        setShowMakeMenuModal(false);
    };

    return (
        <>
            <div className="mx-auto mt-6 max-w-sm">
                <div className="text-center mb-7">
                    <TextField
                        id="standard-basic"
                        label="Add List Name"
                        variant="standard"
                        autoComplete="off"
                        onChange={(e) => setListName(e.target.value)}
                    />
                    <SelectLabel />
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
                    <MenuListCard menus={props.menus} fetch={props.fetch} />
                </ul>
            </div>
            <div className="text-center py-4">
                <Button
                    onClick={() => submit()}
                    variant="contained"
                    disabled={listName ? false : true}
                    color="primary"
                >
                    メニュー作成
                </Button>
            </div>
        </>
    );
};

export default MenuList;
