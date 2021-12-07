import React, {
  useEffect,
  useState
} from "react";
import AppRouter from "./Router";
import { authService } from "fBase";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [isLoggedIn, setIsloggedIn] = useState(authService.currentUser);
  const [userObj, setUserObj] = useState("");
  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      setIsloggedIn(user);
      setUserObj(user);
    });
  }, [])

  return (
    <div>
      <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} />
      < footer >& copy; {new Date().getFullYear()} have a nice day</footer>
    </div >
  );
}

export default App;
