import React, { useState, useContext, useEffect } from "react";
import dig from "object-dig";
import { AuthContext } from "../../context/AuthContext";
import { signInWithGoogle } from "../../firebase/index";
import * as Api from "../../firebase/api";
import MenuList from "./MenuList";
import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import MakeMenuList from "./MakeMenuList";
import MenuProvider from "../../context/MuneContext";

const useStyles = makeStyles(() => ({
    root: {
        textAlign: "center",
        marginTop: 40,
    },
    form: {
        width: "100%",
        maxWidth: 360,
        margin: "auto",
        marginBottom: 40,
        display: "flex",
        alignItems: "baseline",
        justifyContent: "center",
    },
    input: {
        marginRight: 10,
    },
}));

const MakeMenu = () => {
    const classes = useStyles();
    const currentUser = useContext(AuthContext);
    const [inputName, setInputName] = useState("");
    const [menus, setMenus] = useState([]);
    useEffect(() => {
        fetch();
    }, [currentUser]);

    const fetch = async () => {
        if (dig(currentUser, "currentUser", "uid")) {
            const data = await Api.initGet(currentUser.currentUser.uid);
            await setMenus(data);
        }
    };

    const post = async () => {
        await Api.addEvent(inputName, currentUser.currentUser.uid);
        await setInputName("");
        fetch();
    };
    const formRender = () => {
        let Dom;
        if (dig(currentUser, "currentUser", "uid")) {
            Dom = (
                <form className={classes.form}>
                    <TextField
                        value={inputName}
                        className={classes.input}
                        onChange={(e) => setInputName(e.target.value)}
                        placeholder="Menu"
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        type="button"
                        disabled={inputName.length ? false : true}
                        onClick={() => post()}
                    >
                        追加
                    </Button>
                </form>
            );
        } else {
            Dom = <Button onClick={signInWithGoogle}>googleログイン</Button>;
        }
        return Dom;
    };

    return (
        <>
            <MenuProvider>
                <MakeMenuList />
                <div className={classes.root}>
                    {formRender()}
                    <MenuList menus={menus} fetch={fetch} />
                </div>
            </MenuProvider>
        </>
    );
};
export default MakeMenu;
