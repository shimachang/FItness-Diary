import { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { MenuContext } from "../../context/MuneContext";

const SelectRep = () => {
    const {setAddRep} = useContext(MenuContext)
    const [currentRep, setCurrentRep] = useState("");

    const handleChange = (event) => {
        setCurrentRep(event.target.value);
    };

    useEffect(()=> {
        setAddRep(currentRep)
    }, [currentRep])

    return (
        <Box sx={{ minWidth: 80 }}>
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
