import React, {
  useEffect,
  useState
} from "react";
import AppRouter from "./Router";
import { authService } from "fBase";
import { onAuthStateChanged } from "firebase/auth";

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
      {init ? <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} /> : "로딩중..."}
      <div>
        <footer style={{
          width: "100%",
          height: "0px", /* footer의 높이 */
          position: "absolute",
          bottom: "0",
          left: "0"
        }}>& copy; {new Date().getFullYear()} have a nice day</footer>
      </div>
    </div >
  );
}

export default App;
