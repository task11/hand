import React from "react";
import {
  HashRouter as Router,
  Routes,
  Route
}
  from "react-router-dom";
import Home from "routes/Home";
import Profile from "routes/Profile";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/profile"
            element={<Profile />}
          />
        </>
      </Routes>
    </Router>
  )
}

export default AppRouter;