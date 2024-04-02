import React from "react";
import { Link } from "react-router-dom";

export default function ProfileComp(){
    return (
        <div className="profile__box">
            <div className="flex__box-lg">
                <div className="profile__image"></div>
                <div>
                    <div className="profile__email">cavsang@naver.com</div>
                    <div className="profile__name">꿀돌이</div>
                </div>
            </div>
            <Link to="/" className="profile__logout">로그아웃</Link>
        </div>
    );
}