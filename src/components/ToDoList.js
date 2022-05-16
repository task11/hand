import React, { useEffect, useState } from "react";
import { authService, dbService } from "fBase";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "@firebase/firestore";
import { onAuthStateChanged } from "@firebase/auth";
import ToDoEdit from "./ToDo";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const TodoContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
`;

const TodoTitle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  form{
    width: 100%
  }
`;

const Title = styled.span`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const TodoInput = styled.input`
  border: none;
  outline: none;
  font-size: 1.2rem;
  border-bottom: 1px solid ${props => props.theme.bgColor};
  width: 80%;
  margin-bottom: 1.5rem;
`;

const Todos = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: left;
  font-size: 1.2rem;
  width: 100%;
  ul li{
    margin-bottom: 1rem;
  }
`;

const Button = styled.button`
  background-color: white;
  border: none;
  cursor: pointer;
  width: 20%;
`;

const ToDoList = ({ userObj }) => {

  const [toDo, setToDo] = useState("");
  const [error, setError] = useState("");
  const [toDos, setToDos] = useState([]);


  const onChange = (event) => {
    const {
      target: {
        value,
      }
    } = event;
    setToDo(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await addDoc(collection(dbService, "todos"), {
        task: toDo,
        done: false,
        creatorId: userObj.uid,
        createdAt: Date.now(),
      });
    } catch (e) {
      setError(e);
    }
    setToDo("");
  };



  useEffect(() => {
    const q = query(collection(dbService, "todos"), orderBy("createdAt"), where("creatorId", "==", userObj.uid)); //userObj.uid가 왜 안될까 ?
    // unsubscribe(); 유저 로그 아웃 시에 onSnapshot 수신 대기 상태 제거해줘야함
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const toDoArray = querySnapshot.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data()
        };
      });
      setToDos(toDoArray);
    });

    onAuthStateChanged(authService, (user) => {
      if (user == null) {
        unsubscribe();
      }
    });
  }, [userObj.uid]);

  return (
    <TodoContent>
      <TodoTitle>
        <Title>To-Do-List</Title>
        <form onSubmit={onSubmit}>
          <TodoInput
            name="text"
            type="text"
            value={toDo}
            onChange={onChange}
            placeholder="할 일을 입력하세요.."
          />
          <Button type="submit" name="add">
            <FontAwesomeIcon icon={faPlusSquare} size="2x" />
          </Button>
          {error && <span>{error}</span>}
        </form>
      </TodoTitle>
      <Todos>
        <ul>
          {toDos.map((toDo) => {
            return (
              <ToDoEdit
                key={toDo.id}
                toDoObj={toDo}
              />
            );
          })}
        </ul>
      </Todos>
    </TodoContent>
  );
};

export default ToDoList;