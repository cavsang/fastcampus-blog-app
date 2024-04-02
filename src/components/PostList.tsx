import React from "react";
import { Link } from "react-router-dom";

interface PostListProps{
    hasNavigation?: boolean;
}

export default function PostList({hasNavigation = true}: PostListProps){ 
    return (
        <>
            {hasNavigation && (
                <div className="post__navigation">
                <div className="post__navigation--active">전체</div>
                <div>나의 글  </div>
            </div>
            )} 
            <div className="post__list">
            {[...Array(10)].map((e, index)=>(
                <div key={index} className="post__box">
                    <Link to={`/posts/${index}`}>
                        <div className="post__profile-box">
                            <div className="post__profile"></div>
                            <div className="post__author-name">fastcampus</div>
                            <div className="post__date">2024.03.29</div>
                        </div>
                        <div className="post__title">게시글 {index}</div>
                        <div className="post__text">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque iaculis cursus nisi interdum condimentum. Integer pretium quam vestibulum sapien malesuada convallis. Aliquam nec sapien sed lorem ornare semper nec nec risus. Quisque nunc leo, sodales at mattis a, pretium id purus. Phasellus fermentum condimentum faucibus. Nulla non neque non lacus volutpat tincidunt. Etiam lacinia enim a purus efficitur, non congue mauris congue. Nunc cursus efficitur accumsan. Cras ullamcorper felis at ligula finibus feugiat. Cras in metus malesuada, luctus enim eu, placerat justo. Sed sed turpis sed sem elementum interdum. Fusce non pellentesque nunc. Vivamus tincidunt, nibh ut pharetra semper, nibh dolor mollis odio, eget scelerisque odio mauris eget magna. Nunc sit amet bibendum enim.
                        </div>
                        <div className="post__utils-box">
                            <div className="post__delete">삭제</div>
                            <div className="post__edit">수정</div>
                        </div>
                    </Link> 
                </div>
            ))}
        </div>
        </>
    );
}