import Calender from "./component/calender/Calender";
import Header from "./component/global/Header";
import { AuthProvider } from "./context/AuthContext";
import MakeMenu from "./component/makeMenu/MakeMenu";
import Footer from "./component/global/Footer";
import TodayMenus from "./component/todayMenu/TodayMenus";
import { useState } from "react";

const App = () => {
    const [tab, setTab] = useState("calender");

    const Body = () => {
        switch (tab) {
            case "todayMenus":
                return <TodayMenus />;
                break;
            case "calender":
                return <Calender />
                break;
            case "makeMenu":
                return <MakeMenu />
                break
        }
    };

    return (
        <AuthProvider>
            <Header setTab={setTab} />
            <Body />
            {/* <Footer /> */}
        </AuthProvider>
    );
};

export default App;
