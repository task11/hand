import React from "react";

const ToDo = ({ toDoObj, isOwner }) => {
  console.log(isOwner);
  console.log(toDoObj);



  return (
    /* {
            isEdit && (
              <form onSubmit={onEditSubmit}>
                <input
                  type="text"
                  value={newTask}
                  onChange={onEditChange}
                />
                <button type="submit">수정</button>
              </form>
            )
          } */

    <div key={toDo.id}>
      <input type="checkbox"
        value={isChecked}
        onChange={onCheck}
        checked={toDo.done}
        name={toDo.id}
      />
      <li>{toDo.task}</li>
      <button
        value="edit"
        name={toDo.id}
        onClick={onEditClick}>...</button>
      {
        editToggle && (toDo.id === selectedToDo) &&
        (
          <div>
            <button
              onClick={onEditToDo}
              name={toDo.id}
            >수정</button>
            <button
              onClick={onDeleteToDo}
              name={toDo.id}
            >삭제</button>
          </div>
        )
      }
    </div>

  );
};

export default ToDo;