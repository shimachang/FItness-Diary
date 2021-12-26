import { ListItem, ListItemText, ListItemSecondaryAction, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";

const CurrentMenuList = () => {
    const { currentMenuList, setCurrentMenuList } = useContext(GlobalContext);
    const deleteHandle = (i) => {
        let newCurrentMenuList = [...currentMenuList];
        const newArray = newCurrentMenuList[0].menus.filter(
            (e) => e !== newCurrentMenuList[0].menus[i]
        );
        newCurrentMenuList[0].menus = newArray;
        setCurrentMenuList(newCurrentMenuList);
    };
    return currentMenuList[0].menus.map((menu, i) => {
        return (
            <div key={i} className="bg-green-50">
                <ListItem>
                    <ListItemText className="w-32" primary={menu.menu} />
                    <ListItemText primary={menu.weight} />
                    <ListItemText primary={menu.rep} />
                    <ListItemSecondaryAction>
                        <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => deleteHandle(i)}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            </div>
        );
    });
};

export default CurrentMenuList;
