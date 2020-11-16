import React from "react";

function Post({ post }) {
    const { title, photo, tags } = post;
    return (
        <div>
            {title},{photo},{tags}
        </div>
    );
}

export default Post;
