import React, { useEffect, useState } from "react";
import AppRouter from "./Router";
import { authService } from "fBase";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [isLoggedIn, setIsloggedIn] = useState(authService.currentUser);

  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      setIsloggedIn(authService.currentUser);
    });
  }, [])

  return (
    <div>
      <AppRouter isLoggedIn={isLoggedIn} />
      < footer >& copy; {new Date().getFullYear()} have a nice day</footer>
    </div >
  );
}

export default App;
