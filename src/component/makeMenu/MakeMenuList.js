import { Button } from "@mui/material";
import MakeMenuCard from "./MakeMenuCard";
import { useContext, useState } from "react";
import { MenuContext } from "../../context/MenuContext";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import { addMenuList } from "../../firebase/api";
import { AuthContext } from "../../context/AuthContext";
import dig from "object-dig";

const MakeMenuList = () => {
    const [listName, setListName] = useState("");
    const { addTarget, addCategory, addMenu, addWeight, addRep } = useContext(MenuContext);
    const currentUser = useContext(AuthContext);
    
    const submit = () => {
        addMenuList(listName, dig(currentUser, "currentUser", "uid"), addTarget, addCategory, addMenu, addWeight, addRep);
        
    };
    return (
        <div className="bg-green-50  pt-6 pb-6">
            <div className="text-center text-xl  pb-4">My Menu List</div>
            <div className="text-center mb-10">
                <TextField
                    id="standard-basic"
                    label="Add List Name"
                    variant="standard"
                    autoComplete="off"
                    onChange={(e) => setListName(e.target.value)}
                />
            </div>
            <MakeMenuCard />
            <div className="text-center mt-4 mb-6">
                <Button onClick={() => submit()} size="large" variant="contained">
                    追加
                </Button>
            </div>
        </div>
    );
};

export default MakeMenuList;
