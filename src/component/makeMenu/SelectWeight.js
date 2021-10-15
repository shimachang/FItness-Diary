import { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const SelectWeight = () => {
    const [weight, setWeight] = useState("");

    const handleChange = (event) => {
        setWeight(event.target.value);
    };

    return (
        <Box sx={{ minWidth: 90 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Weight</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={weight}
                    label="Weight"
                    onChange={handleChange}
                >
                    <MenuItem value={10}>10kg</MenuItem>
                    <MenuItem value={15}>15kg</MenuItem>
                    <MenuItem value={29}>20kg</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
};

export default SelectWeight;
