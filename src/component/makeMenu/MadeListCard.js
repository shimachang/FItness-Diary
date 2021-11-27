import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { ExpandMore } from "@material-ui/icons";

const MadeListCard = (props) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const propsMenus = props.menu.menus;
    const newPropsMenus = Object.values(propsMenus[0]);

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const MenuList = newPropsMenus.map((list, i) => {
        return (
            <Typography
                mb={2}
                sx={{ borderBottom: 1, borderColor: "grey.500" }}
                key={i}
            >{`${list[2]} ${list[3]}kg ${list[4]}rep `}</Typography>
        );
    });

    return (
        <div>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>{props.menu.listName}</Typography>
                </AccordionSummary>
                <AccordionDetails>{MenuList}</AccordionDetails>
            </Accordion>
        </div>
    );
};
export default MadeListCard;
