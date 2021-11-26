import React, { useState, useContext, useEffect } from "react";
import dig from "object-dig";
import { AuthContext } from "../../context/AuthContext";
import GlobalContext from "../../context/GlobalContext";
import * as Api from "../../firebase/api";
import MakedListCard from "./MakedListCard";
import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import CreateIcon from "@material-ui/icons/Create";
import { makeStyles } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import { AddCircleOutlineOutlined } from "@material-ui/icons";

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
    const { setShowMakeMenuModal } = useContext(GlobalContext);
    const [makedMenus, setMakedMenus] = useState([]);

    useEffect(() => {
        makedFetch();
    }, [currentUser]);

    const makedFetch = async () => {
        if (dig(currentUser, "currentUser", "uid")) {
            const makedData = await Api.getMyMenuLists(currentUser.currentUser.uid);
            setMakedMenus(makedData);
        }
    };
    const deleteHandle = (uid, id) => {
        Api.deleteMyMenuList(uid, id);
        makedFetch();
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
                {makedMenus.length > 0 &&
                    makedMenus.map((menu) => (
                        <div key={menu.listId}>
                            <ListItem className={classes.root}>
                                <MakedListCard menu={menu} />
                                <span className={`material-icons text-${menu.label}-600 `}>
                                    label
                                </span>
                                <IconButton
                                    edge="end"
                                    aria-label="delete"
                                    onClick={() => Api.updateMyMenuList(menu.uid, menu.listId)}
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
export default MakedList;
