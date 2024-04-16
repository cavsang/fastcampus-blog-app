import  React,{ createContext, ReactNode, useState, useEffect } from "react";
import {User, getAuth, onAuthStateChanged} from "firebase/auth";
import { app } from "firebaseApp";

interface AuthProps{
    children : ReactNode
};

const AuthContext = createContext({user: null as User | null});

export const AuthContextProvider = ({children}: AuthProps) => {
    const auth = getAuth(app);
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        })
    },[auth]);
    
    return (
        //왜 {}를 한번더감싸냐면 createContext부분에 key=user, value=User 또는 null 이라고 해놔서...
        <AuthContext.Provider value={{user: currentUser}}>{children}</AuthContext.Provider>
    );
}

export default AuthContext;

