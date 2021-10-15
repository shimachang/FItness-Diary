import { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const SelectRep = () => {
    const [rep, setRep] = useState("");

    const handleChange = (event) => {
        setRep(event.target.value);
    };

    return (
        <Box sx={{ minWidth: 80 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Rep</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={rep}
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
