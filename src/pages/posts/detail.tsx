import React from "react";
import PostDetail from "../../components/PostDetail"
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Comments from "components/Comments";

export default function PostPage(){ 
    return (
        <div>
            <Header />
            <PostDetail />
            <Footer />
        </div>
    );
}