import React, { useState, ReactElement, ChangeEvent, useContext, useEffect } from "react";
import AuthContext from "context/AuthContext";
import { doc, updateDoc, arrayUnion, getDoc, arrayRemove } from "firebase/firestore";
import { db } from "firebaseApp";
import { toast } from "react-toastify";
import { CommentsProps, CommentsInfo } from "./PostList";

export default function Comments({post, getDocs}: CommentsProps){

    const {user} = useContext(AuthContext);
    const [comment, setComment] = useState<string>("");

    const onChnage = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
        const {target : { value}} = e;
        setComment(value);
    }

    const postsRef = doc(db, 'posts',post?.id);
    //let postsQuery = query(postsRef,where("uid","==", post?.uid));

    const onSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const commentData:CommentsInfo = {
            uid : post?.uid,
            email : user?.email as string,
            createAt: new Date()?.toLocaleDateString("ko",{
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
            }),
            contents: comment
        };

        
        if(post && user?.email){
            try {
                await updateDoc(postsRef,{
                    comments: arrayUnion(commentData)
                });
                toast.success('댓글이 등록되었습니다.');
                //navigate(`/posts/${post?.id}`);
                //setPushbtn(prev => !prev);

                await getDocs(post?.id);
            } catch (error:any) {
                toast.error(error?.code);
            }
            
        }
    };

    const onDelete = async (document:CommentsInfo) => {
        if(document){
            if(window.confirm("댓글을 삭제하시겠습니까??")){
                
                try {
                    await updateDoc(postsRef,{
                        comments: arrayRemove(document)
                    });
                    toast.success('댓글이 삭제 되었습니다.');
                    await getDocs(post?.id);
                } catch (error:any) {
                    toast.error(error?.code);
                }
            }
        }
    };


    return (
        <div className="comments">
            <form className="comments__form" onSubmit={onSubmit}>
                <div className="form__block">
                    <label htmlFor="comment">comment</label>
    <textarea name="comment" id="comment" required onChange={onChnage} value={comment} placeholder="댓글을 입력해주세요."></textarea>
                </div>
                <div className="form__block form__block-reverse">
                    <input type="submit" value="입력" className="form__btn-submit"/>
                </div>
            </form>
            <div className="comments__list">
                {/* slice하는 이유는 새로운 배열return 하기위해. */}
                {post?.comments?.slice(0).reverse().map((m, i) => {
                    return (
                        <div key={m?.uid + i} className="comment__box">
                            <div className="comment__profile-box">
                                <div className="comment__email">{m?.email}</div>
                                <div className="comment__createAt">{m?.createAt}</div>
                                {user?.uid === m?.uid && <div className="comment__delete" onClick={() => onDelete(m)}>삭제</div>}
                            </div>
                            <div className="comment__text">{m?.contents}</div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
} 