import React, {
  useEffect,
  useState
} from "react";
import { authService } from "fBase";
import { onAuthStateChanged } from "firebase/auth";
import AppRouter from "./Router";
import Loader from "./Loader";
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
        <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} />
        :
        <Loader />
      }
    </ >
  );
}

export default App;
