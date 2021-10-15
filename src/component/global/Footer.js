import dig from "object-dig";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles(() => ({
    root: {
        width: "100%",
        height: 56,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#FFF",
        backgroundColor: "#3f51b5",
        position: "fixed",
        bottom: 0,
    },
}));

const Footer = () => {
    const classes = useStyles();

    return <Box className={classes.root}>copyright SHIMAChang</Box>;
};

export default Footer;
