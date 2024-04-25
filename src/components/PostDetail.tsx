import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getDoc, doc, deleteDoc } from "firebase/firestore";
import {PostProps} from "components/PostList";
import { db } from "firebaseApp";
import Loader from "./Loader";
import { toast } from "react-toastify";
import Comments from "./Comments";

export default function PostDetail(){

    const params = useParams();
    const [posts, setPosts] = useState<PostProps | null>(null);
    const navigate = useNavigate();

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

    const onDelete = async (id:string) => {
        const isDel = window.confirm('해당 게시물을 삭제하시겠습니까?');
        if(isDel){
            await deleteDoc(doc(db, "posts", id));
            toast.success('삭제 되었습니다.');
            navigate("/");
        }
    }

    return (
    <>
        <div className="post__detail">
            {posts ? (
            <>
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
                            <div className="post__delete" role="role" onClick={() => {onDelete(params?.id as string)}}>삭제</div>
                            <div className="post__edit"><Link to={`/posts/edit/${params?.id}`}>수정</Link></div>
                        </div>
                    )}
                    <div className="post__category">{posts?.category}</div>
                    
                    <div className="post__text post__text--pre-wrap">
                        {posts?.content}
                    </div>
                </div>
                <Comments post={posts}/>
            </>
            ) : <Loader />}
            
        </div>
    </>
    );
}