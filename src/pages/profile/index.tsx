import React from "react";
import ProfileComp from "../../components/Profile";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PostList from "../../components/PostList";

export default function Profile(){ 
    return (
        <>
            <Header />
            <ProfileComp />
            <PostList hasNavigation={false}/>
            <Footer />
        </>
    );
}