import * as Api from "../../firebase/api";
import { ListItem, ListItemText, ListItemSecondaryAction, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

const MenuListCard = ({ menus, fetch }) => {
    const deleteHandle = (uid, id) => {
        Api.deleteNewStorage(uid, id);
        fetch();
    };
    return menus.map((menu) => {
        return (
            <div key={menu.id} className="bg-green-50">
                <ListItem>
                    <ListItemText className="w-32" primary={menu.menu} />
                    <ListItemText primary={menu.weight} />
                    <ListItemText primary={menu.rep} />
                    <ListItemSecondaryAction>
                        <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => deleteHandle(menu.uid, menu.id)}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            </div>
        );
    });
};
export default MenuListCard;
