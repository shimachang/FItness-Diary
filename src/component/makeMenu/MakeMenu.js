import React, { useState, useContext, useEffect } from "react";
import dig from "object-dig";
import { AuthContext } from "../../context/AuthContext";
import * as Api from "../../firebase/api";
import MenuList from "./MenuList";
import { makeStyles } from "@material-ui/core";
import MakeMenuList from "./MakeMenuList";
import MenuProvider from "../../context/MenuContext";
import MakedList from "./MakedList";

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
    const [menus, setMenus] = useState([]);
    
    useEffect(() => {
        fetch();
    }, [currentUser]);

    const fetch = async () => {
        if (dig(currentUser, "currentUser", "uid")) {
            const data = await Api.getTemporaryList(currentUser.currentUser.uid);
            await setMenus(data);
        }
    };


    return (
        <>
            <MenuProvider>
                <MakedList />
                <MakeMenuList fetch={fetch} />
                <div className={classes.root}>
                    <MenuList menus={menus} fetch={fetch} />
                </div>
            </MenuProvider>
        </>
    );
};
export default MakeMenu;
