import React, { useEffect, useState } from "react";
import { Card, Row, Col, Statistic } from "antd";
import Axios from "axios";
import "./RecentList.scss";

const { Meta } = Card;

const apiUrl = "http://localhost:8000/api/posts/";

function RecentList() {
    const [recentList, setRecentList] = useState([]);

    useEffect(() => {
        Axios.get(apiUrl)
            .then((response) => {
                const { data } = response;
                console.log("setRecentList res : ", data);
                setRecentList(data);
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
            bodyStyle={{ padding: "12px" }}
        >
            <h3 className="menu-label">Recent List</h3>
            {recentList ? (
                recentList.map((post, index) => {
                    return (
                        <div className="recentlist" key={post.id}>
                            <div>
                                <h2>{post.title}</h2>
                            </div>
                            <div style={{ fontSize: "12px" }}>
                                {post.content}
                            </div>
                        </div>
                    );
                })
            ) : (
                <div>최근글이 없습니다.</div>
            )}
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

export default RecentList;
