import React, { useState } from "react";
import { Link } from "react-router-dom";
import {app} from "firebaseApp";
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth"
import {toast} from "react-toastify"

export default function Signup(){
    const [error, setError] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [password2, setPassword2] = useState<string>("");


    const onSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const auth = getAuth(app);
            await createUserWithEmailAndPassword(auth, email, password);

            toast.success("회원 가입에 성공하였습니다.");
        } catch (error: any) {
            toast.error(error?.code);
        }
    }

    const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {target:{name, value}} = e;
        
        if(name === "email"){
            setEmail(value);
             const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
             
             if(!value?.match(validRegex)){
                setError("Email 형식이 잘못되었습니다.");
             }else{
                 setError("");
             }
        }
        if(name === "password"){
            setPassword(value);

            if(value.length < 8){
                setError("비밀번호는 8자리 이상으로 입력 해주세요.");
            }else{
                setError("");
            }
        }
        if(name === "password2"){
            setPassword2(value);

            if(password !== value){
                setError("비밀번호 확인이 정확하지 않습니다.");
            }else{
                setError("");
            }
        }
    };


    return (
        <form onSubmit={onSubmit} className="form form--lg">
            <h1 className="form__title">회원가입</h1>
            <div className="form__block">
                <label htmlFor="email">이메일</label>
                <input type="text" name="email" id="email" required onChange={onChange}/> 
            </div>
            <div className="form__block">
                <label htmlFor="password">비밀번호</label>
                <input type="password" name="password" id="password" required onChange={onChange}/> 
            </div>
            <div className="form__block">
                <label htmlFor="password2">비밀번호 확인</label>
                <input type="password" name="password2" id="password2" required onChange={onChange}/> 
            </div>
            {error && error?.length > 0 && (
                <div className="form__block">
                    <div className="form__error">{error}</div>
                </div>
            )}
            <div className="form__block">
                계정이 있으신가요?
                <Link to="/login" className="form__link">로그인하기</Link>
            </div>
            <div className="form__block">
                <input type="submit" value="회원가입" className="form__btn-submit" disabled={error?.length > 0}/>
            </div>
        </form>
    );
}