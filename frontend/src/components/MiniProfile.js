import React, { useEffect, useState } from "react";
import { Card, Row, Col, Statistic } from "antd";
import Axios from "axios";
import "./MiniProfile.scss";

const { Meta } = Card;

const apiUrl = "http://127.0.0.1:8000/accounts/api/user/";

function MiniProfile() {
    const [user, setUser] = useState([]);

    useEffect(() => {
        Axios.get(apiUrl)
            .then((response) => {
                const { data } = response;
                console.log("loaded res : ", data);
                setUser(data);
            })
            .catch((error) => {
                // error.response
            });
        console.log("mounted");
    }, []); // 빈어레이는 마운트 될때 한번만 실행

    // console.log(user[0].username);

    return (
        <Card
            className="cardstyle"
            style={Style}
            cover={
                <img
                    className="imgStyle"
                    style={{ borderRadius: "50%" }}
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
            }
        >
            <Meta
                //TODO: 유저네임 가져오기
                // title={user}
                description="This is the description"
            />
            <Row gutter={36} style={{ marginTop: "1rem" }}>
                <Col span={12}>
                    <Statistic title="Posts" value={24} />
                </Col>
                <Col span={12}>
                    <Statistic title="Tags " value={12} />
                </Col>
            </Row>
        </Card>
    );
}

const Style = {
    //     width: "60px",
    //     height: "102px",
    borderRadius: "8px",
    //     marginRight: "24px",
    boxShadow: "0px 0px 12px 2px rgba(208, 216, 243, 0.6)",
};

export default MiniProfile;
