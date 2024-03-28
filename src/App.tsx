import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Route, Routes, Navigate, Link} from 'react-router-dom'

function App() {
  return (
    <>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/posts">Post List</Link></li>
        <li><Link to="/posts/:id">Post Detail</Link></li>
        <li><Link to="/posts/new">New</Link></li>
        <li><Link to="/posts/edit/:id">Edit</Link></li>
        <li><Link to="/profile">Profile</Link></li>
      </ul>
      <Routes>
        <Route path="/" element={<h1>Home Page.</h1>} />
        <Route path="/posts" element={<h1>Post List Page.</h1>} />
        <Route path="/posts/:id" element={<h1>Post Detail Page</h1>} />
        <Route path="/posts/new" element={<h1>Create New Page</h1>} />
        <Route path="/posts/edit/:id" element={<h1>Edit New Page</h1>} />
        <Route path="/profile" element={<h1>Profile Page</h1>} />
        {/* 위에 정의되지않은 다른경로는 모두 /로 보낸다. */}
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </>
  );
}

export default App;
