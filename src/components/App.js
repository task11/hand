import React, {
  useEffect,
  useState
} from "react";
import AppRouter from "./Router";
import { authService } from "fBase";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsloggedIn] = useState(authService.currentUser);
  const [userObj, setUserObj] = useState("");
  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if (user) {
        setIsloggedIn(user);
        setUserObj(user);
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, [])

  return (
    <div>
      {init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} /> : "로딩중..."}
      < footer >& copy; {new Date().getFullYear()} have a nice day</footer>
    </div >
  );
}

export default App;
