import { Button } from "@mui/material";
import MakeMenuCard from "./MakeMenuCard";
import { useState } from "react";


const MakeMenuList = () => {
    const [menuList, setMenuList] = useState({
        target: '',
        category: '',
        menu: '',
        weight: '',
        rep: ''
    })

    const submit = () => {
        console.log('goo')
    }
    return (
        <div className='bg-green-50  pt-6 pb-6'>
            <div className="text-center text-xl  pb-4">My Menu List</div>
            <MakeMenuCard />
            <div className='text-center mt-4 mb-6'>
                <Button variant="contained" onClick={submit}>追加</Button>
            </div>
        </div>
    );
};

export default MakeMenuList;
