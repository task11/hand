// import Calendar from "components/Calendar";
import MemoList from "components/MemoList";
import ToDoList from "components/ToDoList";
import React from "react";

const Home = ({ userObj }) => {
  console.log(userObj);
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="flex m-5 w-1/2 h-full ">
        {/* <Calendar userObj={userObj} /> */}
      </div>
      <div className="flex m-5 w-1/2 h-full">
        <ToDoList userObj={userObj} />
        <MemoList userObj={userObj} />
      </div>
    </div>
  );
};

export default Home;