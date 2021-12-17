import { ListItem, ListItemText, ListItemSecondaryAction, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";

const CurrentMenuList = () => {
    const { currentMenuList, setCurrentMenuList } = useContext(GlobalContext);
    const deleteHandle = () => {
        const array = currentMenuList[0].menus;
        // const newArray = array.filter((e) => e.menus !== currentMenuList[0].menus[i]);
        console.log(array);
    };
    return currentMenuList[0].menus.map((menu, id) => {
        return (
            <div key={id} className="bg-green-50">
                <ListItem>
                    <ListItemText className="w-32" primary={menu.menu} />
                    <ListItemText primary={menu.weight} />
                    <ListItemText primary={menu.rep} />
                    <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="delete" onClick={() => deleteHandle()}>
                            <DeleteIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            </div>
        );
    });
};

export default CurrentMenuList;
