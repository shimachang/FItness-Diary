import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const MakedListCard = (props) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const propsMenus = props.menu.menus;
    const newPropsMenus = Object.values(propsMenus[0]);
    console.log(newPropsMenus);

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const MenuList = newPropsMenus.map((list, i) => {
        return (
            <MenuItem key={i} >{list}</MenuItem>
        );
    });

    // const List = () => {
    //     return (
    //         <diV>{propsMenus}</diV>
    //     )
    // }

    // for (const list of propsMenus) {
    //     console.log(list)
    // }
    return (
        <>
            <div className="text-center mt-10">
                <Button
                    id="basic-button"
                    aria-controls="basic-menu"
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    variant="contained"
                    onClick={handleClick}
                >
                    {props.menu.listName}
                </Button>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        "aria-labelledby": "basic-button",
                    }}
                    >{MenuList}</Menu>
                    
            </div>
        </>
    );
};
export default MakedListCard;
