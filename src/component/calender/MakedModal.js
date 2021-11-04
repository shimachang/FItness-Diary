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
        width: "240px",
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
    const { setShowMekedModal, setEventMenu } = useContext(GlobalContext);
    const currentUser = useContext(AuthContext);
    const [makedMenus, setMakedMenus] = useState([]);
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        makedFetch();
    }, [currentUser]);

    const makedFetch = async () => {
        if (dig(currentUser, "currentUser", "uid")) {
            const makedData = await Api.getMyMenuList(currentUser.currentUser.uid);
            await setMakedMenus(makedData);
        }
    };

    const initData = { singleSelect: "" };
    const [selectedMenu, setSelectedMenu] = useState(initData);
    const toggleChecked = (e) => {
        const newValue = e.target.velue === selectedMenu.singleSelect ? "" : e.target.value;
        const newData = { ...selectedMenu, singleSelect: newValue };
        setSelectedMenu(newData);
        // setEventMenu(selectedMenu)

    };
    console.log(selectedMenu);
    return (
        <div className={classes.container}>
            <div className={classes.body}>
                <div>Select Menu</div>
                <div className="container text-center mx-auto mt-4 md-10 py-4 flex flex-col justify-center">
                    {makedMenus.length > 0 &&
                        makedMenus.map((menu) => (
                            <div key={menu.id} className={"flex"}>
                                <input
                                    type="checkbox"
                                    onChange={toggleChecked}
                                    checked={selectedMenu.singleSelect === menu.id}
                                    value={menu.id}
                                />
                                <ListItem className={classes.root}>
                                    <MakedListCard menu={menu} />
                                </ListItem>
                            </div>
                        ))}
                </div>
                <div className={classes.buttonWrapper}>
                    <button onClick={() => setShowMekedModal(false)}>Cancel</button>
                    <button>Add</button>
                </div>
            </div>
        </div>
    );
};
export default MakedModal;
