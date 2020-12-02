import React, { useEffect, useState } from "react";
import Axios from "axios";
import Post from "./Post";
import { useAppContext } from "store";

const apiUrl = "http://localhost:8000/api/posts/";

function PostList() {
    const {
        store: { jwtToken },
        dispatch,
    } = useAppContext();
    const [postList, setPostList] = useState([]);

    useEffect(() => {
        Axios.get(apiUrl)
            .then((response) => {
                const { data } = response;
                setPostList(data);
            })
            .catch((error) => {
                // error.response
            });
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
