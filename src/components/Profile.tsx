import React, { useContext } from "react";
import { getAuth, signOut } from "firebase/auth";
import { app } from "firebaseApp";
import { toast } from "react-toastify";
import AuthContext from "context/AuthContext";

const auth = getAuth(app);

const onSignOut = async () => {
    
    try {
        const auth = getAuth(app);
        await signOut(auth);
        toast.success("로그아웃 되었습니다.");
    } catch (error:any) {
        toast.error(error?.code);
    }
}

export default function ProfileComp(){

    const {user} = useContext(AuthContext);

    return (
        <div className="profile__box">
            <div className="flex__box-lg">
                <div className="profile__image"></div>
                <div>
                    <div className="profile__email">{auth?.currentUser?.email}</div>
                    <div className="profile__name">{auth?.currentUser?.displayName || '사용자'}</div>
                </div>
            </div>
            <div className="profile__logout" onClick={onSignOut}>로그아웃</div>
        </div>
    );
}