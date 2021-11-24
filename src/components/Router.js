import {
  HashRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Navigator from "components/Navigator"
import Auth from "routes/Auth";

const AppRouter = ({ isLoggedIn }) => {
  console.log(isLoggedIn, "라우터");
  return (
    <Router>
      {isLoggedIn && <Navigator />}
      <Routes>{isLoggedIn ?
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
        :
        <Route
          path="/"
          element={<Auth />}
        />
      }
      </Routes>
    </Router>
  );
}

export default AppRouter;