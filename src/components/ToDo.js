import { dbService } from "fBase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";

const ToDo = ({ toDoObj }) => {
  const [editToggle, setEditToggle] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [newTask, setNewTask] = useState(toDoObj.task);
  const [isChecked, setIsChecked] = useState(true); // check box value 초기 값이 true여야지 첫 번쨰 클릭때 onCheck 함수에서 true로 바뀜
  const toDoRef = doc(dbService, "todos", `${toDoObj.id}`);

  const onEditChange = (event) => {
    const {
      target: {
        value,
      }
    } = event;
    setNewTask(value);
  }

  const onEditClick = (prev) => {
    setEditToggle((prev) => !prev);
  };

  const onDeleteToDo = async () => {
    const ok = window.confirm("정말로 삭제할까요?");
    if (ok) {
      setEditToggle(false);
      await deleteDoc(toDoRef);
    }

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

  const onCheck = (prev) => {
    setIsChecked((prev) => !prev);
    // 데이터베이스 업데이트 코드 추가
    updateDoc(toDoRef, {
      done: isChecked
    });
  };

  const onCancle = (prev) => setIsEdit((prev) => !prev);


  return (
    <>
      <div >
        <input type="checkbox"
          value={isChecked}
          onChange={onCheck}
          checked={toDoObj.done}
        />
        {isEdit ?
          (<li>
            <form onSubmit={onEditSubmit}>
              <input
                value={newTask}
                onChange={onEditChange}
              />
              <button name="edit" type="submit">수정!</button>
              <button name="cancle" type="button" onClick={onCancle} >취소</button>
            </form>
          </li>) :
          <li>{toDoObj.task}</li>
        }
        <input
          value="..."
          type="button"
          onClick={onEditClick} />
        {
          editToggle &&
          (
            <div>
              <button
                onClick={onEditToDo}
              >수정</button>
              <button
                onClick={onDeleteToDo}
              >삭제</button>
            </div>
          )
        }
      </div >
    </>
  );
};

export default ToDo;