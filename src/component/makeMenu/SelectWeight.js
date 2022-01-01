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

const SelectWeight = ({ listIndex, menuIndex }) => {
    const { tab } = useContext(RouterContext);
    const { todayEvent, setTodayEvent, todayWeight, setTodayWeight } = useContext(TodayContext);
    const initData = tab === "todayMenus" ? todayEvent[listIndex][0].menus[menuIndex].weight : "";
    const [currentWeight, setCurrentWeight] = useState(initData);
    const { setAddWeight } = useContext(MenuContext);
    const { setUpdateWeight } = useContext(UpdateContext);

    const handleChange = (e) => {
        setCurrentWeight(e.target.value);
        if (tab === "todayMenus") {
            todayEvent[listIndex][0].menus[menuIndex].weight = e.target.value;
        }
        setTodayEvent(todayEvent);
    };
    useEffect(() => {
        setUpdateWeight(currentWeight);
        setAddWeight(currentWeight);
        setTodayWeight(currentWeight);
    }, [currentWeight]);

    return (
        <Box sx={{ minWidth: 90 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Weight</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={currentWeight}
                    label="Weight"
                    onChange={handleChange}
                >
                    <MenuItem value={10}>10kg</MenuItem>
                    <MenuItem value={15}>15kg</MenuItem>
                    <MenuItem value={20}>20kg</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
};

export default SelectWeight;
