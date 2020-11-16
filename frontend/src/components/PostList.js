import React, { useEffect, useState } from "react";
import Axios from "axios";
import Post from "./Post";

const apiUrl = "http://localhost:8000/api/posts/";

function PostList() {
    const [postList, setPostList] = useState([]);

    useEffect(() => {
        Axios.get(apiUrl)
            .then((response) => {
                const { data } = response;
                console.log("home res : ", response);
                setPostList(data);
            })
            .catch((error) => {
                // error.response
            });
        // console.log("mounted");
    }, []); // 빈어레이는 마운트 될때 한번만 실행

    return (
        <div>
            <h2>PostList</h2>
            {postList.map((post, index) => {
                return <Post post={post} key={post.id} />;
            })}
        </div>
    );
}

export default PostList;
