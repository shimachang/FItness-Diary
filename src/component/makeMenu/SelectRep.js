import { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { MenuContext } from "../../context/MenuContext";
import { UpdateContext } from "../../context/UpdateContext";
import { TodayContext } from "../../context/TodayContext";
import { RouterContext } from "../../context/RouterContext";

const SelectRep = ({ listIndex, menuIndex }) => {
    const { tab } = useContext(RouterContext);
    const { todayEvent, setTodayEvent } = useContext(TodayContext);
    const initData = tab === "todayMenus" ? todayEvent[listIndex][0].menus[menuIndex].rep : "";
    const { setAddRep } = useContext(MenuContext);
    const { setUpdateRep } = useContext(UpdateContext);
    const [currentRep, setCurrentRep] = useState(initData);
    const handleChange = (e) => {
        setCurrentRep(e.target.value);
        if (tab === "todayMenus") {
            todayEvent[listIndex][0].menus[menuIndex].rep = e.target.value;
        }
        setTodayEvent(todayEvent);
    };

    useEffect(() => {
        setUpdateRep(currentRep);
        setAddRep(currentRep);
    }, [currentRep]);

    return (
        <Box sx={{ minWidth: 70 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Rep</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={currentRep}
                    label="rep"
                    onChange={handleChange}
                >
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                    <MenuItem value={30}>30</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
};

export default SelectRep;
