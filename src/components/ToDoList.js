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
  }

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
  }



  useEffect(() => {
    const q = query(collection(dbService, "todos"), orderBy("createdAt"), where("creatorId", "==", userObj.uid)); //userObj.uid가 왜 안될까 ?
    // unsubscribe(); 유저 로그 아웃 시에 onSnapshot 수신 대기 상태 제거해줘야함
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const toDoArray = querySnapshot.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data()
        }
      });
      setToDos(toDoArray);
    });

    onAuthStateChanged(authService, (user) => {
      if (user == null) {
        unsubscribe();
      }
    });
  }, [userObj.uid])

  return (
    <div className="flex flex-col m-5 p-9 w-5/6 h-1/2 border-2 rounded-2xl">
      <div className="text-center">
        <span className="font-bold text-2xl" >To-Do-List</span>
        <br />
        <form onSubmit={onSubmit}>
          <input
            name="text"
            type="text"
            value={toDo}
            onChange={onChange}
            placeholder="할 일을 입력하세요.."
          />
          <button type="submit" name="add">
            <FontAwesomeIcon icon={faPlusSquare} />
          </button>
          {error && <span>{error}</span>}
        </form>
      </div>
      <div>
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
      </div>
    </div>
  );
}

export default ToDoList;