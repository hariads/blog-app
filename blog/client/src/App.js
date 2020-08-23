import React from "react"
import PostCreate from "./PostCreate"
import PostList from "./PostList";

export default () => {
    return (
        <div className="container">
            <h2>CreatePost!!!</h2>
            <PostCreate />
            <hr></hr>
            <h2>Posts</h2>
            <PostList />
        </div>);
};