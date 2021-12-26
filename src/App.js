import Calender from "./component/calender";
import Header from "./component/global/Header";
import { AuthProvider } from "./context/AuthContext";
import UpdateProvider from "./context/UpdateContext";
import MakeMenu from "./component/makeMenu";
import TodayMenus from "./component/todayMenu";
import { useState } from "react";
import MenuProvider from "./context/MenuContext";
import { TodayProvider } from "./context/TodayContext";

const App = () => {
    const [tab, setTab] = useState("todayMenus");

    const Body = () => {
        switch (tab) {
            case "todayMenus":
                return <TodayMenus />;
                break;
            case "calender":
                return <Calender />;
                break;
            case "makeMenu":
                return <MakeMenu />;
                break;
        }
    };

    return (
        <AuthProvider>
            <UpdateProvider>
                <MenuProvider>
                    <TodayProvider>
                        <Header setTab={setTab} />
                        <Body />
                    </TodayProvider>
                </MenuProvider>
            </UpdateProvider>
        </AuthProvider>
    );
};

export default App;
