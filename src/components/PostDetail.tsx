import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import {PostProps} from "components/PostList";
import { db } from "firebaseApp";
import Loader from "./Loader";

export default function PostDetail(){

    const params = useParams();
    const [posts, setPosts] = useState<PostProps | null>(null);

    const getDocs = async (iid:string) => {
        if(iid){
            const docRef = doc(db, "posts",iid);
            const document = await getDoc(docRef);

            setPosts({...(document.data() as PostProps), id:document?.id});
        }
    }

    useEffect(() => {
        if(params?.id)
            getDocs(params?.id);
    },[params?.id]);

    return (
    <>
        <div className="post__detail">
            {posts ? (
            <div className="post__box">
                <div className="post__title">
                    {posts?.title}
                </div>
                <div className="post__profile-box">
                    <div className="post__profile"></div>
                    <div className="post__author-name">{posts?.email}</div>
                    <div className="post__date">{posts?.createAt}</div>
                    </div>
                    {params?.id === posts?.id && (
                        <div className="post__utils-box">
                            <div className="post__delete">삭제</div>
                            <div className="post__edit"><Link to={`/posts/edit/params?.id`}>수정</Link></div>
                        </div>
                    )}
                    
                    <div className="post__text post__text--pre-wrap">
                        {posts?.content}
                    </div>
                </div>
            ) : <Loader />}
            
        </div>
    </>
    );
}