import { ListItemSecondaryAction, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

const DeleteButton = (props) => {
    return (
        <IconButton edge="end" aria-label="delete" onClick={() => props.deleteHandle(props.i)}>
            <DeleteIcon />
        </IconButton>
    );
};

export default DeleteButton;
