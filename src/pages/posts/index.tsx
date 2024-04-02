import React from "react";
import PostList from "../../components/PostList";
import Header from "../../components/Header";
import Footer from "components/Footer";

export default function PostListPage(){ 
    return (
        <>
            <Header />
            <PostList hasNavigation={false}/>
            <Footer />
        </>
    );
}