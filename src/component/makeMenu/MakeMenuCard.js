import { useState } from "react";
import { Stack } from "@mui/material";
import SelectWeight from "./SelectWeight";
import SelectRep from "./SelectRep";
import SelectTarget from "./SelectTarget";

const MakeMenuCard = () => {
    return (
        <div className="container  mx-auto mt-4 py-4 flex flex-wrap: wrap">
            <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
                margin="0 auto"
            >
                <SelectTarget />
                <SelectWeight />
                <SelectRep />
            </Stack>
        </div>
    );
};
export default MakeMenuCard;
