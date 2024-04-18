import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { getDocs, collection } from "firebase/firestore";
import { db } from "firebaseApp";
import AuthContext from "context/AuthContext";

interface PostListProps{
    hasNavigation?: boolean;
}

interface PostProps{
    id : string,
    title : string,
    summary: string,
    content: string,
    createAt: string,
    email: string
}

type TabType = "all"|"my";

export default function PostList({hasNavigation = true}: PostListProps){ 

    const [activeTab, setActiveTab] = useState<TabType>("all");//기본값을 all로.

    const [posts, setPosts] = useState<PostProps[]>([]);

    const {user} = useContext(AuthContext);

    const getPosts = async () => {
        const datas = await getDocs(collection(db, "posts"));

        datas?.forEach((doc) => {
            const dataObj = {...doc.data(), id: doc.id}; //collection의 컬럼이 아니라..id가 내부적으로 가지고있구나.
            //setPosts(prev => [...prev, dataObj as PostProps]);
            
            //내생각엔 이렇게 해도될꺼같은데.. 일단 강의버전으로가자.
            //setPosts([...posts, dataObj as PostProps]);
            setPosts(prev => [...prev, dataObj as PostProps]);
        });
    };

    useEffect(() => {
        getPosts();
    },[]); //[]가 없으면 계속 불러온다. 의존성배열..

    return (
        <>
            {hasNavigation && (
                <div className="post__navigation">
                <div role="presentaion" 
                    onClick={() => {setActiveTab("all")}}
                    className={activeTab==="all"?"post__navigation--active":""}>전체</div>
                <div role="presentaion"
                    onClick={() => {setActiveTab("my")}} 
                className={activeTab==="my"?"post__navigation--active":""}>나의 글  </div>
            </div>
            )} 
            <div className="post__list">
            {posts?.length > 0 ? posts.map((e, index)=>(
                <div key={e?.id} className="post__box">
                    <Link to={`/posts/${e?.id}`}>
                        <div className="post__profile-box">
                            <div className="post__profile"></div>
            <div className="post__author-name">{e?.email}</div>
            <div className="post__date">{e?.createAt}</div>
                        </div>
                        <div className="post__title">게시글 {index}</div>
                        <div className="post__text">
                            {e?.content}
                        </div>
                    </Link> 
                        {e?.email === user?.email &&
                            <div className="post__utils-box">
                                <div className="post__delete">삭제</div>
                                <Link to={`/posts/edit/${e?.id}`} className="post__edit">수정</Link>
                            </div> 
                        }
                        
                    
                </div>
            )):<div className="post__no-post">게시글이 없습니다.</div>}
        </div>
        </>
    );
}