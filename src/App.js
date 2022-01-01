import Calender from "./component/calender";
import Header from "./component/global/Header";
import MakeMenu from "./component/makeMenu";
import TodayMenus from "./component/todayMenu";
import { useContext } from "react";
import { RouterContext } from "./context/RouterContext";

const App = () => {
    const { tab } = useContext(RouterContext);
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
        <>
            <Header />
            <Body />
        </>
    );
};

export default App;
