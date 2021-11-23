import React, { useState, useContext, useEffect } from "react";
import dig from "object-dig";
import { AuthContext } from "../../context/AuthContext";
import GlobalContext from "../../context/GlobalContext";
import MenuProvider from "../../context/MenuContext";
import * as Api from "../../firebase/api";
import { makeStyles } from "@material-ui/core";
import MenuList from "./MenuList";
import MakeMenuList from "./MakeMenuList";
import MakedList from "./MakedList";
import MakeMenuModal from "./MakeMenuModal";

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
    const { showMakeMenuModal } = useContext(GlobalContext);

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
                {showMakeMenuModal && <MakeMenuModal menus={menus} fetch={fetch} />}
            </MenuProvider>
        </>
    );
};
export default MakeMenu;
