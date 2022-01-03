import { useContext, useEffect, useState } from "react";
import GlobalContext from "../../context/GlobalContext";
import { makeStyles } from "@material-ui/core";
import dig from "object-dig";
import * as Api from "../../firebase/api";
import { AuthContext } from "../../context/AuthContext";
import ListItem from "@material-ui/core/ListItem";
import MadeListCard from "../makeMenu/MadeListCard";

const useStyles = makeStyles(() => ({
    container: {
        position: "absolute",
        top: 0,
        left: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
        backgroundColor: "rgba(0,0,0, .5)",
    },
    body: {
        width: "360px",
        padding: "24px 36px",
        backgroundColor: "white",
    },
    buttonWrapper: {
        display: "flex",
        justifyContent: "space-between",
        marginTop: "24px",
    },
}));

const MadeModal = () => {
    const classes = useStyles();
    const { setShowMadeModal, setEventListName, setEventListId, setEventLabel } =
        useContext(GlobalContext);
    const currentUser = useContext(AuthContext);
    const [madeMenus, setMadeMenus] = useState([]);

    useEffect(() => {
        MadeFetch();
    }, [currentUser]);

    const MadeFetch = async () => {
        if (dig(currentUser, "currentUser", "uid")) {
            const MadeData = await Api.getMyMenuLists(currentUser.currentUser.uid);
            setMadeMenus(MadeData);
        }
    };
    const initData = { selectedListName: "" };
    const [selectedMenu, setSelectedMenu] = useState(initData);
    const selectedName = selectedMenu.selectedListName;
    const checkedHandle = (e) => {
        const newValue = e.currentTarget.name === selectedName ? "" : e.currentTarget.name;
        const newData = { ...selectedMenu, selectedListName: newValue };
        setSelectedMenu(newData);
        setEventListId(e.currentTarget.value);
        setEventLabel(e.currentTarget.dataset.label);
    };
    const checkedRefresh = () => {
        setSelectedMenu(initData);
    };

    return (
        <div onClick={() => setShowMadeModal(false)} className={classes.container}>
            <div onClick={(e) => e.stopPropagation()} className={classes.body}>
                <div>Select Menu</div>
                <div className="container text-center mx-auto mt-4 md-10 py-4 flex flex-col justify-center">
                    {madeMenus.length > 0 &&
                        madeMenus.map((menu) => (
                            <div key={menu.listId} className="flex justify-items-center">
                                <input
                                    type="checkbox"
                                    onChange={checkedHandle}
                                    name={menu.listName}
                                    data-label={menu.label}
                                    checked={selectedName === menu.listName}
                                    value={menu.listId}
                                />
                                <ListItem className={classes.root}>
                                    <MadeListCard menu={menu} />
                                </ListItem>
                            </div>
                        ))}
                </div>
                <div className={classes.buttonWrapper}>
                    <button
                        onClick={() => {
                            checkedRefresh();
                            setShowMadeModal(false);
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            setEventListName(selectedName);
                            setShowMadeModal(false);
                        }}
                    >
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
};
export default MadeModal;
