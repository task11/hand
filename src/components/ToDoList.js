import React, { useEffect, useState } from "react";
import { authService, dbService } from "fBase";

import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  deleteDoc
} from "@firebase/firestore";
import { onAuthStateChanged } from "@firebase/auth";
import ToDoEdit from "./ToDo";


const ToDoList = ({ userObj }) => {

  const [toDo, setToDo] = useState("");
  const [error, setError] = useState("");
  const [isChecked, setIsChecked] = useState(true); // check box value 초기 값이 true여야지 첫 번쨰 클릭때 onCheck 함수에서 true로 바뀜
  const [toDos, setToDos] = useState([]);
  const [editToggle, setEditToggle] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedToDo, setSelectedToDo] = useState("");
  const [newTask, setNewTask] = useState("");

  const toDoRef = doc(dbService, "todos", `${toDo.id}`);

  const onChange = (event) => {
    const {
      target: {
        value,
      }
    } = event;
    setToDo(value);
  }

  const onEditChange = (event) => {
    const {
      target: {
        value,
      }
    } = event;
    setNewTask(value);
    console.log(newTask);
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const docRef = await addDoc(collection(dbService, "todos"), {
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

  const onCheck = (prev) => {
    setIsChecked((prev) => !prev);
    // 데이터베이스 업데이트 코드 추가
    updateDoc(toDoRef, {
      done: isChecked
    });
  };

  const onEditClick = (prev) => {
    setEditToggle((prev) => !prev);
    setSelectedToDo(prev.target.name);
  };

  const onDeleteToDo = async () => {
    setEditToggle(false);
    await deleteDoc(toDoRef);
  };

  const onEditToDo = async (event) => {
    setIsEdit((event) => !event);
    setEditToggle(false);
  };

  const onEditSubmit = async (event) => {
    event.preventDefault();
    setIsEdit(false);
    await updateDoc(toDoRef, {
      task: newTask
    });
  }

  useEffect(() => {
    const q = query(collection(dbService, "todos"), orderBy("createdAt")); //userObj.uid가 왜 안될까 ?

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

  }, [])

  return (
    <div>
      <div>To-Do-List</div>
      <div>
        <form onSubmit={onSubmit}>
          <input
            name="text"
            type="text"
            value={toDo}
            onChange={onChange}
            placeholder="할 일을 입력하세요.."
          />
          <button type="submit" name="add">+</button>
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
                isOwner={toDo.creatorId === userObj.uid}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default ToDoList;