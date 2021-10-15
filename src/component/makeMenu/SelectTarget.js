import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import SelectMenu from "./SelectMenu";

const SelectTarget = () => {
    const targets = ["腕", "胸", "脚", "肩", "背中", "腹"];
    const [target, setTarget] = useState([]);
    const [currentTarget, setCurrentTarget] = useState("");
    const handleTargetChange = (event) => {
        setCurrentTarget(event.target.value);
    };
    
    const categories = ["ダンベル", "自重", "ベンチ", "ケーブル", "マシン"];
    const [category, setCategory] = useState([]);
    const [currentCategory, setCurrentCategory] = useState("");
    const handleCategoryChange = (event) => {
        setCurrentCategory(event.target.value);
    };

    return (
        <>
            {/* <Avatar alt="Menu icon" src={icon_arm_192} /> */}
            <Box sx={{ minWidth: 100 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Target</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={currentTarget}
                        label="target"
                        onChange={handleTargetChange}
                    >
                        {targets.map((e, i) => (
                            <MenuItem value={e} key={i}>
                                {e}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
            <Box sx={{ minWidth: 100 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={currentCategory}
                        label="category"
                        onChange={handleCategoryChange}
                    >
                        {categories.map((e, i) => (
                            <MenuItem value={e} key={i}>
                                {e}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
            <div>
                <SelectMenu currentTarget={currentTarget} currentCategory={currentCategory}  />
            </div>
        </>
    );
};

export default SelectTarget;
