import React, { useState } from "react";
import AppRouter from "./Router";

function App() {
  const [isLoggedIn, setIsloggedIn] = useState(false);
  console.log(isLoggedIn);
  return (
    <div>
      <AppRouter isLoggedIn={isLoggedIn} />
      < footer >& copy; {new Date().getFullYear()} have a nice day</footer>
    </div >
  );
}

export default App;
