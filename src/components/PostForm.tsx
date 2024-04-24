import React, { useState, useContext, useEffect } from "react";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import AuthContext from "context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { PostProps, CategoryType, CATEGORIES } from "./PostList";

export default function PostForm(){

    //parameter가 있으면..edit, 없으면 post폼.
    const params = useParams();
    const [posts, setPosts] = useState<PostProps | null>(null);

    const getDocs = async (id:string) => {
        if(id){
            const docRef = doc(db, 'posts', id);
            const document = await getDoc(docRef);

            setPosts({...document.data() as PostProps, id : document.id});
        }
    };
    
    useEffect(() => {
        console.log('params.id : ', params?.id);
        if(params?.id){
            getDocs(params?.id);
        }
    },[params?.id]);

    useEffect(() => {
        console.log('posts : ', posts); 
        if(posts){
            setTitle(posts?.title as string);
            setSummary(posts?.summary as string);
            setContent(posts?.content as string);
            setCategory(posts?.category as CategoryType)
        }
    },[posts]);

    const [title, setTitle] = useState<string>("");
    const [summary, setSummary] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [category, setCategory] = useState<CategoryType | string>("");

    const {user} = useContext(AuthContext);
    const navigate = useNavigate();

    const onChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {target : {name, value}} = e;

        if(name === "title"){
            setTitle(value);
        }else if(name === "summary"){
            setSummary(value);
        }else if(name === "content"){
            setContent(value);
        }else if(name === "category"){
            setCategory(value);
        }
    };

    const onSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(posts){
            try {
                const docRef = doc(db, 'posts', posts?.id);
                await updateDoc(docRef,{
                    title       : title,
                    summary     : summary,
                    content     : content,
                    updatedAt : new Date()?.toLocaleDateString("ko",{
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                    }),
                    category: category
                });
                toast.success('수정완료 되었습니다.');
                navigate(`/posts/${params?.id}`);
            } catch (error:any) {
                toast.error(error?.code);
                
            }
        }else{
            try {
                await addDoc(collection(db,"posts"),{//collection이름은 posts로.
                    title       : title,
                    summary     : summary,
                    content     : content,
                    createAt    : new Date()?.toLocaleDateString("ko",{
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                    }),
                    email : user?.email,
                    uid: user?.uid,
                    category: category
                });

                toast.success("게시글을 등록하였습니다.");
                navigate("/");
            } catch (error:any) {
                toast.error(error?.code);
            }
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
                <label htmlFor="category">카테고리</label>
                 <select name="category" id="category" onChange={onChange}>
                     <option value="">카테고리를 선택해주세요.</option>
                     {CATEGORIES?.map((e) => <option value={e} key={e}>{e}</option>)}
                 </select>
            </div>
            <div className="form__block">
                <label htmlFor="content">내용</label>
                <textarea name="content" id="content" value={content} onChange={onChange} required></textarea> 
            </div>
            <div className="form__block">
                <input type="submit" value={posts? "수정":"저장"} className="form__btn-submit"/>
            </div>
        </form>
    )
}