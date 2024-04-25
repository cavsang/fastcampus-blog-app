import React, { useState, ReactElement, ChangeEvent, useContext, useEffect } from "react";
import AuthContext from "context/AuthContext";
import { addDoc, collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "firebaseApp";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { CommentsProps } from "./PostList";

export default function Comments({postsId}:any){

    const {user} = useContext(AuthContext);
    const navigate = useNavigate();

    const [comment, setComment] = useState<string>("");
    const [comments, setComments] = useState<CommentsProps[]>([]);
    const [pushBtn, setPushbtn] = useState<boolean>(false);

    const onChnage = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
        const {target : {name, value}} = e;
        setComment(value);
    }

    const onSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data= {
            postsId : postsId,
            email : user?.email,
            createAt : new Date()?.toLocaleDateString("ko",{
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                }
            ),
            content: comment
        }
        if(postsId && user?.email){
            try {
                await addDoc(collection(db,'comments'),data);
                toast.success('댓글이 등록되었습니다.');
                navigate(`/posts/${postsId}`);
                setPushbtn(prev => !prev);
            } catch (error:any) {
                toast.error(error?.code);
            }
            
        }
    }

    const postsRef = collection(db, 'comments');
    let postsQuery = query(postsRef,where("postsId","==", postsId),orderBy("createAt", "asc"));
    
    const getComments = async () => {
        setComments([]);
        const datas = await getDocs(postsQuery);
        console.log(datas.size);
        datas.forEach((data) => {
            const newComments = {...data.data(), id: data.id};
            //setComments(prev => [...prev, newComments as CommentsProps]);
        });


    }

    useEffect(() => {
        getComments();
    },[pushBtn]);

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
            {/* <div className="comments__list">
                {comments?.map(m => {
                    return (
                        <div key={m.id} className="comment__box">
                            <div className="comment__profile-box">
                                <div className="comment__email">{m?.email}</div>
                                <div className="comment__createAt">{m?.createAt}</div>
                                <div className="comment__delete">삭제</div>
                            </div>
                            <div className="comment__text">{m?.content}</div>
                        </div>
                    )
                })}
            </div> */}
        </div>
    )
} 