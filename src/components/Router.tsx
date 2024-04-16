import {Route, Routes, Navigate, Link} from 'react-router-dom';
import React, { useState } from 'react';
import Home from '../pages/home';
import PostListPage from '../pages/posts';
import PostPage from 'pages/posts/detail';
import New from '../pages/posts/new';
import Edit from '../pages/posts/edit';
import Profile from '../pages/profile';
import Login from '../pages/login';
import Logout from '../pages/logout';
import Signupp from 'pages/login/signup';

interface RouteProps{
    isAuthenticated:boolean;
}

//여기가 왜 {isAuthxxx} 가 맞고, 그냥{}를 뺴고 하면 안되는지 생각해보자.
function Router({isAuthenticated}: RouteProps){


    return (
        <Routes>
            {isAuthenticated ? (
                <>
                    <Route path="/" element={<Home />} />
                    <Route path="/posts" element={<PostListPage />} />
                    <Route path="/posts/:id" element={<PostPage />} />
                    <Route path="/posts/new" element={<New />} />
                    <Route path="/posts/edit/:id" element={<Edit />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/logout" element={<Logout />} />

                    {/* 위의 경로들 제외하고 모든경로는 /로 보낸다.*/}
                    <Route path="*" element={<Navigate replace to="/" />} />
                </>
            ) : (
                <>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signupp />} />
                    <Route path="*" element={<Login />} />
                </>
            ) }
            
      </Routes>
    );
}

export default Router;

