import React, { useState, useContext, useEffect } from "react";
import dig from "object-dig";
import { AuthContext } from "../../context/AuthContext";
import { signInWithGoogle } from "../../firebase/index";
import * as Api from "../../firebase/api";
import {
    ListItem,
    ListItemIcon,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Checkbox,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core";

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

    const deleteHandle = (id) => {
        Api.menuDelete(id);
        props.fetch();
    };

    const checkHandle = async (id) => {
        await Api.toggleComplete(id);
        props.fetch();
    };
    const menuList = props.menus.map((menu, i) => {
        return (
            <ListItem key={i}>
                <ListItemText primary={menu.target} />
                <ListItemText primary={menu.category} />
                <ListItemText primary={menu.menu} />
                <ListItemText primary={menu.weight} />
                <ListItemText primary={menu.rep} />
                <ListItemSecondaryAction>
                    <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => deleteHandle(menu.id)}
                    >
                        <DeleteIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        );
    });
    return (
        <div className={classes.root}>
            <h2>あなたの筋トレメニュー</h2>
            <ul className={classes.ul}>{menuList}</ul>
        </div>
    );
};

export default MenuList;
