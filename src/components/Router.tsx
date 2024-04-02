import {Route, Routes, Navigate, Link} from 'react-router-dom';
import React from 'react';
import Home from '../pages/home';
import PostListPage from '../pages/posts';
import PostPage from '../pages/posts/detail';
import New from '../pages/posts/new';
import Edit from '../pages/posts/edit';
import Profile from '../pages/profile';
import Login from '../pages/login';
import Logout from '../pages/logout';

function Router(){
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts" element={<PostListPage />} />
            <Route path="/posts/:id" element={<PostPage />} />
            <Route path="/posts/new" element={<New />} />
            <Route path="/posts/edit/:id" element={<Edit />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />

            {/* 위의 경로들 제외하고 모든경로는 /로 보낸다.*/}
            <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    );
}

export default Router;
