// import Calendar from "components/Calendar";
import MemoList from "components/MemoList";
import ToDoList from "components/ToDoList";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

const Wrapper = styled.div`
  min-width: 20%;
  min-height: 40%;
  max-width: 30%;
  max-height: 70%;
  width: 30%;
  height: 70%;
  resize: both;
  overflow: auto;
  background-color: white;
  border-radius: 20px;
`;

const CalendarWrapper = styled(Wrapper)`
  
`;

const ToDoWrapper = styled(Wrapper)`
  
`;

const MemoWrapper = styled(Wrapper)`
  
`;

const Home = ({ userObj }) => {
  console.log(userObj);
  return (
    <Container>
      <CalendarWrapper>

      </CalendarWrapper>
      <ToDoWrapper>
        <ToDoList userObj={userObj} />
      </ToDoWrapper>
      <MemoWrapper>
        <MemoList userObj={userObj} />
      </MemoWrapper>
    </Container >
  );
};

export default Home;