import React, { useState, useContext, useEffect } from "react";
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
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core";
import { MenuContext } from "../../context/MenuContext";


const useStyles = makeStyles(() => ({
    root: {
        maxWidth: 360,
        margin: "auto",
    },
    list: {
        justifyContent: "space-between",
    },
    ul: {
        paddingLeft: 0,
        listStyle: "none",
    },
}));

const MenuList = (props) => {
    const classes = useStyles();

    const [listName, setListName] = useState("");
    const currentUser = useContext(AuthContext);
    const {addLabel} = useContext(MenuContext)
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
        );
    });
    return (
        <>
            <div className={classes.root}>
                <h2>あなたの筋トレメニュー</h2>
                <div className="text-center mb-10">
                <SelectLabel />
                    <TextField
                        id="standard-basic"
                        label="Add List Name"
                        variant="standard"
                        autoComplete="off"
                        onChange={(e) => setListName(e.target.value)}
                    />
                </div>
                <ul className={classes.ul}>{menuList}</ul>
            </div>
            <div>
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
