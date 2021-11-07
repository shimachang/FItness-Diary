import { Button } from "@mui/material";
import MakeMenuCard from "./MakeMenuCard";
import { useContext, useState } from "react";
import { MenuContext } from "../../context/MenuContext";
import SelectLabel from "./SelectLabel";
import * as Api from "../../firebase/api";
import { AuthContext } from "../../context/AuthContext";
import dig from "object-dig";

const MakeMenuList = (props) => {
    const {
        addTarget,
        setAddTarget,
        addCategory,
        setAddCategory,
        addMenu,
        setAddMenu,
        addWeight,
        setAddWeight,
        addRep,
        setAddRep,
    } = useContext(MenuContext);

    const currentUser = useContext(AuthContext);
    const submit = () => {
        if (addMenu) {
            Api.addTemporaryMenuList(
                dig(currentUser, "currentUser", "uid"),
                addTarget,
                addCategory,
                addMenu,
                addWeight,
                addRep,
            );
            setAddTarget("");
            setAddCategory("");
            setAddMenu("");
            setAddWeight("");
            setAddRep("");
        } else {
            return;
        }
        props.fetch();
    };
    return (
        <div className="bg-green-50  pt-6 pb-6">
            <div className="text-center text-xl mt-10 pb-4">Make Menu List</div>
            <MakeMenuCard />
            <div className="text-center mt-4 mb-6">
                <Button
                    onClick={() => submit()}
                    disabled={addMenu ? false : true}
                    size="large"
                    variant="contained"
                >
                    追加
                </Button>
            </div>
        </div>
    );
};

export default MakeMenuList;
