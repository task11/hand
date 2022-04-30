import React, {
  useEffect,
  useState
} from "react";
import AppRouter from "./Router";
import { authService } from "fBase";
import { onAuthStateChanged } from "firebase/auth";
import Cookie from "../static/loading.svg";

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
