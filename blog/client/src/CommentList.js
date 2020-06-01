import React from "react";
// import React, { useEffect, useState } from "react";
// import axios from "axios";

export default ({ comments }) => {

    // const [commentList, setCommetList] = useState({});

    // const fetchComments = async () => {
    //     const res = await axios.get(`http://localhost:4001/posts/${postId}/comments`);
    //     setCommetList(res.data);
    // };

    // useEffect(() => {
    //     fetchComments();
    // });

    const renderCommentList = comments.map(comment => {
        let content;
        if (comment.status === 'approved')
            content = comment.content;
        else if (comment.status === 'rejected')
            content = 'This comment has been rejected';
        else
            content = 'This comment is awaiting for verification';

        return <li key={comment.id}>{content}</li>;
    })

    return <ul>{renderCommentList}</ul>;
};