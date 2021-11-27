import React, { useState, useContext } from "react";
import dig from "object-dig";
import { AuthContext } from "../../context/AuthContext";
import * as Api from "../../firebase/api";
import SelectLabel from "./SelectLabel";
import {
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Button,
    TextField,
} from "@material-ui/core";
import { AddCircleOutlineOutlined } from "@material-ui/icons";
import DeleteIcon from "@material-ui/icons/Delete";
import { MenuContext } from "../../context/MenuContext";
import GlobalContext from "../../context/GlobalContext";

const MenuList = (props) => {
    const [listName, setListName] = useState("");
    const currentUser = useContext(AuthContext);
    const { addLabel } = useContext(MenuContext);
    const { setShowSelectMenuModal } = useContext(GlobalContext);
    const propsMenus = props.menus;
    const myMenuList = propsMenus.map((e) => [e.target, e.category, e.menu, e.weight, e.rep]);
    const newMyMenuList = (arr) => {
        let obj = {};
        for (let i = 0; i < arr.length; i++) {
            obj[i] = arr[i];
        }
        return obj;
    };
    const submit = (props) => {
        if (propsMenus) {
            Api.addMyMenuList(
                listName,
                dig(currentUser, "currentUser", "uid"),
                newMyMenuList(myMenuList),
                addLabel
            );
        }
    };

    const deleteHandle = (uid, id) => {
        Api.deleteTemporary(uid, id);
        props.fetch();
    };

    const menuList = propsMenus.map((menu) => {
        return (
            <div className="bg-green-50">
                <ListItem key={menu.id}>
                    <ListItemText primary={menu.menu} />
                    <ListItemText primary={menu.weight} />
                    <ListItemText primary={menu.rep} />
                    <ListItemSecondaryAction>
                        <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => deleteHandle(menu.uid, menu.id)}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            </div>
        );
    });

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
                <ul className="pl-0 list-none overflow-scroll max-h-60">{menuList}</ul>
            </div>
            <div className="text-center py-4">
                <Button
                    onClick={() => submit(props)}
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
