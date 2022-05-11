import {
  HashRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Navigator from "components/Navigator";
import Auth from "routes/Auth";
import Setting from "routes/Setting";
import Footer from "./Footer";

const AppRouter = ({ userObj, isLoggedIn }) => {
  return (
    <Router>
      {isLoggedIn && <Navigator />}
      <Routes>{isLoggedIn ?
        <>
          <Route
            path="/"
            element={<Home userObj={userObj} />}
          />
          <Route
            path="/profile"
            element={<Profile userObj={userObj} />}
          />
          <Route
            path="/setting"
            element={<Setting userObj={userObj} />}
          />
        </>
        :
        <Route
          path="/"
          element={<Auth />}
        />
      }

      </Routes>
      <Footer />
    </Router>
  );
};

export default AppRouter;