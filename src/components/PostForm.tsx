import React, { useState, useContext } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "firebaseApp";
import AuthContext from "context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function PostForm(){

    const [title, setTitle] = useState<string>("");
    const [summary, setSummary] = useState<string>("");
    const [content, setContent] = useState<string>(""); 
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();

    const onChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {target : {name, value}} = e;

        if(name === "title"){
            setTitle(value);
        }else if(name === "summary"){
            setSummary(value);
        }else if(name === "content"){
            setContent(value);
        }
    };

    const onSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await addDoc(collection(db,"posts"),{//collection이름은 posts로.
                title       : title,
                summary     : summary,
                content     : content,
                createAt    : new Date()?.toLocaleDateString(),
                email : user?.email
            });

            toast.success("게시글을 등록하였습니다.");
            navigate("/");
        } catch (error:any) {
            toast.error(error?.code);
        }

    };

    return (
        <form onSubmit={onSubmit} className="form">
            <div className="form__block">
                <label htmlFor="title">제목</label>
                <input type="text" name="title" id="title" value={title} onChange={onChange} required/> 
            </div>
            <div className="form__block">
                <label htmlFor="summary">요약</label>
                <input type="text" name="summary" id="summary" value={summary} onChange={onChange} required/> 
            </div>
            <div className="form__block">
                <label htmlFor="content">내용</label>
                <textarea name="content" id="content" value={content} onChange={onChange} required></textarea> 
            </div>
            <div className="form__block">
                <input type="submit" value="제출" className="form__btn-submit"/>
            </div>
        </form>
    )
}