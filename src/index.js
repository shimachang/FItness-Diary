import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "dayjs/locale/ja";
import dayjs from "dayjs";
import ContextWrapper from "./context/ContextWrapper";
import { AuthProvider } from "./context/AuthContext";
import UpdateProvider from "./context/UpdateContext";
import MenuProvider from "./context/MenuContext";
import { TodayProvider } from "./context/TodayContext";
import RouterProvider from "./context/RouterContext";
import ShowContext from "./context/ShowContext";

dayjs.locale("ja");

ReactDOM.render(
    <React.StrictMode>
        <ContextWrapper>
            <AuthProvider>
                <RouterProvider>
                    <UpdateProvider>
                        <MenuProvider>
                            <TodayProvider>
                                <ShowContext>
                                    <App />
                                </ShowContext>
                            </TodayProvider>
                        </MenuProvider>
                    </UpdateProvider>
                </RouterProvider>
            </AuthProvider>
        </ContextWrapper>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
