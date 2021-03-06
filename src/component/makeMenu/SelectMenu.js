import { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { db } from "../../firebase";
import { MenuContext } from "../../context/MenuContext";
import { UpdateContext } from "../../context/UpdateContext";

const SelectMenu = ({ currentTarget, currentCategory }) => {
    const [menu, setMenu] = useState([]);
    const { setAddMenu } = useContext(MenuContext);
    const { setUpdateMenu } = useContext(UpdateContext);
    const [currentMenu, setCurrentMenu] = useState("");

    useEffect(() => {
        db.collection("menu")
            .where("target", "==", `${currentTarget}`)
            .where("category", "==", `${currentCategory}`)
            .get()
            .then((snapshot) =>
                setMenu(
                    snapshot.docs.map((doc) => ({
                        name: doc.data().name,
                    }))
                )
            );
    }, [currentTarget, currentCategory]);

    useEffect(() => {
        setUpdateMenu(currentMenu);
        setAddMenu(currentMenu);
    }, [currentMenu]);

    const handleChange = (event) => {
        setCurrentMenu(event.target.value);
    };

    return (
        <>
            <Box sx={{ minWidth: 160 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Menu</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={currentMenu}
                        label="Menu"
                        onChange={handleChange}
                    >
                        {menu.map((e, i) => (
                            <MenuItem value={e.name} key={i}>
                                {e.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
        </>
    );
};

export default SelectMenu;
