import React, { useState } from "react";
import { Button, Modal } from "antd";
import "./AppLayout.scss";
import MiniProfile from "./MiniProfile";
import RecentList from "./RecentList";
import Signup from "../pages/accounts/Signup";

function AppLayout({ children }) {
    const [show, setShow] = useState(false);

    const showModal = () => {
        setShow(true);
    };

    const CloseModal = () => {
        setShow(false);
    };

    return (
        <div className="app">
            <header className="header">
                <div className="main-header-box">This Is Your Perofomace</div>
                <div className="title">
                    <h1>This Plus!</h1>
                </div>
                <div className="topnav">
                    <Button type="primary" onClick={showModal}>
                        Singup
                    </Button>
                    <Signup Open={show} Close={CloseModal}></Signup>
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
