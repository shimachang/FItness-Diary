import Calender from "./component/calender/Calender";
import Header from "./component/global/Header";
import { AuthProvider } from "./context/AuthContext";
import UpdateProvider from "./context/UpdateContext";
import MakeMenu from "./component/makeMenu/MakeMenu";
import TodayMenus from "./component/todayMenu/TodayMenus";
import { useState } from "react";

const App = () => {
    const [tab, setTab] = useState("makeMenu");

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
                <Header setTab={setTab} />
                <Body />
            </UpdateProvider>
        </AuthProvider>
    );
};

export default App;
