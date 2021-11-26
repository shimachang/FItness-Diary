import React, { useState, useContext, useEffect } from "react";
import dig from "object-dig";
import { AuthContext } from "../../context/AuthContext";
import GlobalContext from "../../context/GlobalContext";
import MenuProvider from "../../context/MenuContext";
import * as Api from "../../firebase/api";
import SelectMenuModal from "./SelectMenuModal";
import MakedList from "./MakedList";
import MakeMenuModal from "./MakeMenuModal";

const MakeMenu = () => {
    const currentUser = useContext(AuthContext);
    const [menus, setMenus] = useState([]);
    const { showMakeMenuModal, showSelectMenuModal } = useContext(GlobalContext);

    useEffect(() => {
        fetch();
    }, [currentUser]);

    const fetch = async () => {
        if (dig(currentUser, "currentUser", "uid")) {
            const data = await Api.getTemporaryList(currentUser.currentUser.uid);
            await setMenus(data);
        }
    };


    return (
        <>
            <MenuProvider>
                <MakedList />
                {showMakeMenuModal && <MakeMenuModal menus={menus} fetch={fetch} />}
                {showSelectMenuModal && <SelectMenuModal menus={menus} fetch={fetch} />}
            </MenuProvider>
        </>
    );
};
export default MakeMenu;
