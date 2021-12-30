import {
  HashRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Navigator from "components/Navigator"
import Auth from "routes/Auth";
import Setting from "routes/Setting";

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
      <footer className="flex flex-col text-center fixed w-full h-20 font-bold  bottom-0 left-0 pt-4 text-xs text-slate-400">
        <nav className="flex justify-center content-end">
          <a href='https://task11.tistory.com' target='_blank'>Blog</a> |
          <a href='https://github.com/task11' target='_blank'>Github</a>
        </nav>
        <p className="flex-col justify-center content-end">
          <span >저자 : task11</span><br />
          <span>이메일 : 6539305@gmail.com</span><br />
          <span>Copyright; {new Date().getFullYear()} have a nice day. All Rights Reserved.</span>
        </p>
      </footer>
    </Router>
  );
}

export default AppRouter;