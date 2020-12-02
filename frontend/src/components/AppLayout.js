import React, { useState } from "react";
import { Button } from "antd";
import "./AppLayout.scss";
import MiniProfile from "./MiniProfile";
import RecentList from "./RecentList";
import Signup from "../pages/accounts/Signup";
import Login from "../pages/accounts/Login";

function AppLayout({ children }) {
    const [SignupShow, setSignupShow] = useState(false);
    const [SignInShow, setSignInShow] = useState(false);

    const ShowSignInModal = () => setSignInShow(true);
    const CloseSignInModal = () => setSignInShow(false);
    const ShowSignupModal = () => setSignupShow(true);
    const CloseSignupModal = () => setSignupShow(false);

    return (
        <div className="app">
            <header className="header">
                <div className="main-header-box">This Is Your Perofomace</div>
                <div className="title">
                    <h1>This Plus!</h1>
                </div>
                <div className="topnav">
                    <Button
                        type="primary"
                        onClick={ShowSignInModal}
                        style={{ marginRight: "1em" }}
                    >
                        Singin
                    </Button>
                    <Login Open={SignInShow} Close={CloseSignInModal}></Login>
                    <Button type="primary" onClick={ShowSignupModal}>
                        Singup
                    </Button>
                    <Signup Open={SignupShow} Close={CloseSignupModal}></Signup>
                </div>
            </header>
            <div className="leftsidebar">
                <MiniProfile />
            </div>
            <div className="contents">{children}</div>
            <div className="rightsidebar">
                <RecentList />
            </div>
            <div className="footer">&copy; 2020 CraDeed</div>
        </div>
    );
}

export default AppLayout;
