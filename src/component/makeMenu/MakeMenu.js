import React, { useState, useContext, useEffect } from "react";
import dig from "object-dig";
import { AuthContext } from "../../context/AuthContext";
import { signInWithGoogle } from "../../firebase/index";
import * as Api from "../../firebase/api";
import MenuList from "./MenuList";
import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import MakeMenuList from "./MakeMenuList";
import MenuProvider from "../../context/MenuContext";

const useStyles = makeStyles(() => ({
    root: {
        textAlign: "center",
        marginTop: 40,
    },
    form: {
        width: "100%",
        maxWidth: 360,
        margin: "auto",
        marginBottom: 40,
        display: "flex",
        alignItems: "baseline",
        justifyContent: "center",
    },
    input: {
        marginRight: 10,
    },
}));

const MakeMenu = () => {
    const classes = useStyles();
    const currentUser = useContext(AuthContext);
    const [inputName, setInputName] = useState("");
    const [menus, setMenus] = useState([]);
    useEffect(() => {
        fetch();
    }, [currentUser]);

    // const fetch = async () => {
    //     if (dig(currentUser, "currentUser", "uid")) {
    //         const data = await Api.initGet(currentUser.currentUser.uid);
    //         await setMenus(data);
    //     }
    // };
    const fetch = async () => {
        if (dig(currentUser, "currentUser", "uid")) {
            const data = await Api.getMakeMenuList(currentUser.currentUser.uid);
            await setMenus(data);
        } else {
            console.log('error')
        }
    };

    const post = async () => {
        await Api.addEvent(inputName, currentUser.currentUser.uid);
        await setInputName("");
        fetch();
    };

    return (
        <>
            <MenuProvider>
                <MakeMenuList />
                <div className={classes.root}>
                    <MenuList menus={menus} fetch={fetch} />
                </div>
            </MenuProvider>
        </>
    );
};
export default MakeMenu;
