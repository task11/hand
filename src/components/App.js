import React, {
  useEffect,
  useState
} from "react";
import AppRouter from "./Router";
import { authService } from "fBase";
import { onAuthStateChanged } from "firebase/auth";
import Loader from "../static/loading.svg";
import GlobalStyle from "globalstyle";


function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState("");

  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if (user) {
        setUserObj(user);
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);


  return (
    <>
      <GlobalStyle />
      {init ?
        <>
          <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} />
        </>
        :
        <div className="flex flex-col justify-center items-center h-screen">
          <img src={Loader}></img>
        </div>
      }
    </ >
  );
}

export default App;
