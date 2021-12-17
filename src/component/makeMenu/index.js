import { useState, useContext, useEffect } from "react";
import dig from "object-dig";
import { AuthContext } from "../../context/AuthContext";
import GlobalContext from "../../context/GlobalContext";
import MenuProvider from "../../context/MenuContext";
import * as Api from "../../firebase/api";
import SelectMenuModal from "./SelectMenuModal";
import MadeList from "./MadeList";
import MakeMenuModal from "./MakeMenuModal";
import UpdateMadeModal from "./UpdateMadeModal";

const MakeMenu = () => {
    const currentUser = useContext(AuthContext);
    const [menus, setMenus] = useState([]);
    const [madeMenus, setMadeMenus] = useState([]);
    const { showMakeMenuModal, showSelectMenuModal, showUpdateMadeModal, currentMenuList } =
        useContext(GlobalContext);

    useEffect(() => {
        fetch();
        madeFetch();
    }, [currentUser, showUpdateMadeModal]);

    const fetch = async () => {
        if (showUpdateMadeModal) {
            setMenus(currentMenuList[0]);
        } else {
            const newData = await Api.getNewStorage(dig(currentUser, "currentUser", "uid"));
            setMenus(newData);
        }
    };
    const madeFetch = async () => {
        if (dig(currentUser, "currentUser", "uid")) {
            const madeData = await Api.getMyMenuLists(currentUser.currentUser.uid);
            setMadeMenus(madeData);
        }
    };

    return (
        <>
            <MenuProvider>
                <MadeList madeMenus={madeMenus} madeFetch={madeFetch} />
                {showMakeMenuModal && <MakeMenuModal menus={menus} fetch={fetch} madeFetch={madeFetch} />}
                {showUpdateMadeModal && <UpdateMadeModal menus={menus} fetch={fetch} />}
                {showSelectMenuModal && <SelectMenuModal menus={menus} fetch={fetch} />}
            </MenuProvider>
        </>
    );
};
export default MakeMenu;
