import { Link } from "react-router-dom";
import {ThemeContext} from "context/ThemeContext"
import React, { useContext, useEffect } from "react";
import { BsSun, BsMoonFill } from "react-icons/bs";

export default function Footer(){

    const themeContext = useContext(ThemeContext);

    /* useEffect(() => {
        if(themeContext.theme === "light"){
            
        }
    }, [themeContext]); */

    return (
        <footer>
            <Link to="/posts/new">글쓰기</Link>
            <Link to="/posts">게시글</Link>
            <Link to="/profile">프로필</Link>
            <div onClick={themeContext.toggleMode}>
                {themeContext.theme === "light" ? 
                    <BsSun className="footer__theme-btn"></BsSun> 
                    : 
                    <BsMoonFill className="footer__theme-btn"></BsMoonFill>
                }
            </div>
        </footer>
    );
}