import { Button } from "@mui/material";
import MakeMenuCard from "./MakeMenuCard";
import { useContext, useState } from "react";
import { MenuContext } from "../../context/MuneContext";

const MakeMenuList = () => {
    const { addTarget, addCategory, addMenu, addWeight, addRep } = useContext(MenuContext);
    const submit = () => {};
    return (
        <div className="bg-green-50  pt-6 pb-6">
            <div className="text-center text-xl  pb-4">My Menu List</div>
            <MakeMenuCard />
            <div className="text-center mt-4 mb-6">
                <Button variant="contained">追加</Button>
            </div>
        </div>
    );
};

export default MakeMenuList;
