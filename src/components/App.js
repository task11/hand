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
          <footer className="font-bold text-center w-full absolute bottom-0 left-0 pt-4 text-xs text-slate-400">
            <nav>
              <a className="inline-block mx-5 mt-0" href='https://task11.tistory.com' target='_blank'>Blog</a> |
              <a className="inline-block mx-5 mt-0" href='https://github.com/task11' target='_blank'>Github</a>
            </nav>
            <p className="mt-0 mb-0">
              <span className="inline-block">저자 : task11</span><br />
              <span className="inline-block ">이메일 : 6539305@gmail.com</span><br />
              <span className="inline-block ">Copyright; {new Date().getFullYear()} have a nice day. All Rights Reserved.</span>
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
