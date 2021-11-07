import { useContext, useEffect, useState } from "react";
import GlobalContext from "../../context/GlobalContext";
import { makeStyles } from "@material-ui/core";
import dig from "object-dig";
import * as Api from "../../firebase/api";
import { AuthContext } from "../../context/AuthContext";
import ListItem from "@material-ui/core/ListItem";
import MakedListCard from "../makeMenu/MakedListCard";

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
        width: "340px",
        padding: "24px 36px",
        backgroundColor: "white",
    },
    buttonWrapper: {
        display: "flex",
        justifyContent: "space-between",
        marginTop: "24px",
    },
}));

const MakedModal = () => {
    const classes = useStyles();
    const { setShowMekedModal, setEventListName, setEventListId, setEventLabel } = useContext(GlobalContext);
    const currentUser = useContext(AuthContext);
    const [makedMenus, setMakedMenus] = useState([]);

    useEffect(() => {
        makedFetch();
    }, [currentUser]);

    const makedFetch = async () => {
        if (dig(currentUser, "currentUser", "uid")) {
            const makedData = await Api.getMyMenuList(currentUser.currentUser.uid);
            setMakedMenus(makedData);
        }
    };

    const initData = { selectedListName: "" };
    const [selectedMenu, setSelectedMenu] = useState(initData);
    const selectedName = selectedMenu.selectedListName;
    const checkedHandle = (e) => {
        const newValue = e.currentTarget.name === selectedName ? "" : e.currentTarget.name;
        const newData = { ...selectedMenu, selectedListName: newValue };
        setSelectedMenu(newData);
        setEventListId(e.currentTarget.value)
        setEventLabel(e.currentTarget.dataset.label)
    };
    const checkedRefresh = () => {
        setSelectedMenu(initData);
    };

    return (
        <div className={classes.container}>
            <div className={classes.body}>
                <div>Select Menu</div>
                <div className="container text-center mx-auto mt-4 md-10 py-4 flex flex-col justify-center">
                    {makedMenus.length > 0 &&
                        makedMenus.map((menu) => (
                            <div key={menu.id} className="flex justify-items-center">
                                <input
                                    type="checkbox"
                                    onChange={checkedHandle}
                                    name={menu.listName}
                                    data-label={menu.label}
                                    checked={selectedName === menu.listName}
                                    value={menu.id}
                                />
                                <div>{menu.label}</div>
                                <ListItem className={classes.root}>
                                    <MakedListCard menu={menu} />
                                </ListItem>
                            </div>
                        ))}
                </div>
                <div className={classes.buttonWrapper}>
                    <button
                        onClick={() => {
                            checkedRefresh();
                            setShowMekedModal(false);
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            // setEventLabel()
                            setEventListName(selectedName);
                            setShowMekedModal(false);
                        }}
                    >
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
};
export default MakedModal;
