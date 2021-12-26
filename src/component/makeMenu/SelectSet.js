import { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { TodayContext } from "../../context/TodayContext";

const SelectSet = (props) => {
    const { setTodaySetName } = useContext(TodayContext);
    const [currentSetName, setCurrentSetName] = useState("");

    const handleChange = (event) => {
        setCurrentSetName(event.target.value);
    };

    useEffect(() => {
        setTodaySetName(currentSetName);
    }, [currentSetName]);

    return (
        <Box sx={{ minWidth: 70 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Set</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={currentSetName}
                    label="rep"
                    onChange={handleChange}
                >
                    <MenuItem value={"drop"}>ドロップセット</MenuItem>
                    <MenuItem value={"3/7"}>3/7</MenuItem>
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={3}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
};

export default SelectSet;
