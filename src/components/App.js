import React, {
  useEffect,
  useState
} from "react";
import AppRouter from "./Router";
import { authService } from "fBase";
import { onAuthStateChanged } from "firebase/auth";
import Cookie from "../static/loading.svg"

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
    <div>
      {init ?
        <>
          <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} />
          <footer className="flex flex-col text-center fixed w-full font-bold  bottom-0 left-0 pt-4 text-xs text-slate-400">
            <nav className="flex justify-center content-end">
              <a href='https://task11.tistory.com' target='_blank'>Blog</a> |
              <a href='https://github.com/task11' target='_blank'>Github</a>
            </nav>
            <p className="flex-col justify-center content-end">
              <span >저자 : task11</span><br />
              <span>이메일 : 6539305@gmail.com</span><br />
              <span>Copyright; {new Date().getFullYear()} have a nice day. All Rights Reserved.</span>
            </p>
          </footer>
        </>
        :
        <div className="flex flex-col justify-center items-center h-screen">
          <img src={Cookie}></img>
        </div>
      }

    </div >
  );
}

// style={{
//   width: "100%",
//   height: "0px", /* footer의 높이 */
//   position: "absolute",
//   bottom: "0",
//   left: "0"
// }}

export default App;
