import React, { useState, useEffect, useContext } from 'react';
import {getAuth, onAuthStateChanged} from "firebase/auth"
import './App.css';
import Router from './components/Router';
import { app } from 'firebaseApp';
import {ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import Loader from 'components/Loader';
import AuthContext from 'context/AuthContext';


function App() { 
  const auth = getAuth(app)

  //auth를 체크하기전에 loading을 띄워주는 용도.
  const [init, setInit] = useState<boolean>(false);

  //auth의 current가 있으면 true반환, 없으면 false반환하는 표현식이라함.
  //처음에 auth는에는 currentUser가 없고 나중에 로그인되면 auth.currentUser가 업데이트 되는 형식이다
  //따라서 아래처럼 만해놓으면.. 초기에만값을 체크하니까 확인할방법이 없다. 이때 실시간으로 체크하는게 onAuthStateChanged 이다.

  const {user} = useContext(AuthContext); 
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!user);

  

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(user){
        setIsAuthenticated(true);
      }else{
        setIsAuthenticated(false);
      }
      setInit(true);
    })
    
  },[auth]);

  return (
    <>
      <ToastContainer />
      {init ? <Router isAuthenticated={isAuthenticated}/> :<Loader />}
    </>
  );
}

export default App;
