import React, { useState, useContext, useEffect } from "react";
import dig from "object-dig";
import { AuthContext } from "../../context/AuthContext";
import * as Api from "../../firebase/api";
import MakedListCard from "./MakedListCard";
import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";

const useStyles = makeStyles(() => ({
    root: {
        maxWidth: 360,
        margin: "auto",
    },
    list: {
        justifyContent: "space-between",
    },
}));

const MakedList = () => {
    const classes = useStyles();
    const currentUser = useContext(AuthContext);
    const [makedMenus, setMakedMenus] = useState([]);

    useEffect(() => {
        makedFetch();
    }, [currentUser]);

    const makedFetch = async () => {
        if (dig(currentUser, "currentUser", "uid")) {
            const makedData = await Api.getMyMenuList(currentUser.currentUser.uid);
            await setMakedMenus(makedData);
        }
    };
    const deleteHandle = (uid, id) => {
        Api.deleteMyMenuList(uid, id);
        makedFetch();
    };

    return (
        <>
            <div className="container text-center mx-auto mt-4 py-4 flex flex-col justify-center">
                {makedMenus.length > 0 &&
                    makedMenus.map((menu) => (
                        <div key={menu.id}>
                            <ListItem className={classes.root}>
                                <MakedListCard menu={menu} />
                                <IconButton
                                    edge="end"
                                    aria-label="delete"
                                    onClick={() => deleteHandle(menu.uid, menu.id)}
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
export default MakedList;
