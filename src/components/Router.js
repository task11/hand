import React from "react";
import {
  HashRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Navigator from "components/Navigator"

const AppRouter = () => {
  return (
    <Router>
      <Navigator />
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