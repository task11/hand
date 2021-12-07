import React, { useState } from "react";
import { dbService } from "fBase";
import { addDoc, collection } from "@firebase/firestore";


const ToDoList = ({ userObj }) => {

  const [toDo, setToDo] = useState("");
  const [error, setError] = useState("");

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
      const docRef = await addDoc(collection(dbService, "todos"), {
        task: toDo,
        done: false,
        creatorId: userObj.uid,
        createdAt: Date.now(),
      });
    } catch (e) {
      setError(e);
    }
  }
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
          <li>밥 먹기</li>
        </ul>
      </div>

    </div>
  );
}

export default ToDoList;