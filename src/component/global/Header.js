import React, { useContext, useState } from "react";
import dig from "object-dig";
import { signInWithGoogle, logOut } from "../../firebase";
import { AuthContext } from "../../context/AuthContext";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles(() => ({
    toolbar: {
        justifyContent: "space-between",
    },
    button: {
        color: "#FFF",
    },
    grid: {
        justifyContent: "space-around",
        width: "60%",
        fontSize: 12,
    },
}));

const Header = ({ setTab }) => {
    const classes = useStyles();
    const currentUser = useContext(AuthContext);

    const buttonRender = () => {
        let buttonDom;
        if (dig(currentUser, "currentUser", "uid")) {
            buttonDom = (
                <Button className={classes.button} variant="text" onClick={logOut}>
                    ログアウト
                </Button>
            );
        } else {
            buttonDom = (
                <Button className={classes.button} variant="text" onClick={signInWithGoogle}>
                    googleログイン
                </Button>
            );
        }
        return buttonDom;
    };

    return (
        <AppBar position="static">
            <Toolbar className="justify-between">
                <Typography variant="h6">Fitness Diary</Typography>
                <Grid className={classes.grid} container spacing={3}>
                    <Grid
                        className="cursor-pointer"
                        onClick={() => setTab("todayMenus")}
                        item
                        xs={4}
                        md={3}
                    >
                        今日のメニュー
                    </Grid>
                    <Grid
                        className="cursor-pointer"
                        onClick={() => setTab("calender")}
                        item
                        xs={4}
                        md={3}
                    >
                        カレンダー
                    </Grid>
                    <Grid
                        className="cursor-pointer"
                        onClick={() => setTab("makeMenu")}
                        item
                        xs={4}
                        md={3}
                    >
                        メニュー作成
                    </Grid>
                </Grid>
                {buttonRender()}
            </Toolbar>
        </AppBar>
    );
};

export default Header;
