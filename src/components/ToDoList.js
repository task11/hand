import React, { useState } from "react";
import { dbService } from "fBase";

const ToDoList = (userObj) => {
  const [toDo, setToDo] = useState("");

  const onChange = (event) => {
    const {
      target: {
        value,
      }
    } = event;
    setToDo(value);
  }

  const onSubmit = (event) => {
    event.preventDefault();


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