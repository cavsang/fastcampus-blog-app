import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { getDocs, collection, query, orderBy, getDoc, where } from "firebase/firestore";
import { db } from "firebaseApp";
import AuthContext from "context/AuthContext";

/* interface, type을 걍 이곳에 모아놈. */

interface PostListProps{
    hasNavigation?: boolean;
    defaultTab?: TabType
}

export interface CommentsInfo{
    uid : string,
    email : string,
    createAt: string,
    contents: string
}

export interface PostProps{
    id : string,
    title : string,
    summary: string,
    content: string,
    createAt: string,
    email: string,
    updatedAt : string,
    uid: string,
    category? : CategoryType,
    comments? : CommentsInfo[]
}

export interface CommentsProps{
    post: PostProps,
    getDocs : (id:string) => Promise<void>
}

type TabType = "all"|"my" | CategoryType;

export type CategoryType = "Frontend" | "Backend" | "Web" | "Native";
export const CATEGORIES : CategoryType[] = ["Frontend","Backend","Web","Native"];

/* interface, type을 걍 이곳에 모아놈. */




export default function PostList({hasNavigation = true, defaultTab="all"}: PostListProps){ 

    const [activeTab, setActiveTab] = useState<TabType>(defaultTab);//기본값을 all로.

    const [posts, setPosts] = useState<PostProps[]>([]);

    const {user} = useContext(AuthContext);

    const getPosts = async () => {
        //const datas = await getDocs(collection(db, "posts")); 
        setPosts([]);//초기화.

        const postsRef = collection(db, 'posts');
        let postsQuery;
        if(activeTab === "my"){
            postsQuery = query(postsRef, where("uid","==",user?.uid), orderBy("createAt", "desc"));
        }else if(activeTab === "Frontend" ||
                 activeTab === "Backend"  ||
                 activeTab === "Web" ||
                 activeTab === "Native"){
            postsQuery = query(postsRef,where("category","==", activeTab));
        }else{
            postsQuery = query(postsRef, orderBy("createAt", "desc"));
        }
        const datas = await getDocs(postsQuery);
    
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
    },[activeTab]); //[]가 없으면 계속 불러온다. 의존성배열..

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
                
                {CATEGORIES.map( c  => (
                    <div role="presentaion" onClick={() => {setActiveTab(c)}} 
                        className={activeTab === c ?"post__navigation--active":""}>{c} </div>
                ))}
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
                        <div className="post__title">{e?.title}</div>
                        <div className="post__text">
                            {e?.summary}
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