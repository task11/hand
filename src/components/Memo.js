import { dbService } from "fBase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";

const Memo = ({ memoObj }) => {
  const [editToggle, setEditToggle] = useState(false);
  const [newMemo, setNewMemo] = useState(memoObj.text);
  const [isEdit, setIsEdit] = useState(false);

  const memoRef = doc(dbService, "memos", `${memoObj.id}`);

  const onSetClik = (prev) => setEditToggle((prev) => !prev);

  const onEditClick = (prev) => {
    setIsEdit((prev) => !prev)
    onSetClik();
  };

  const onDeleteClick = async () => {
    const ok = window.confirm("정말로 삭제할까요?");
    if (ok) {
      setEditToggle(false);
      await deleteDoc(memoRef);
    }
  }


  const onEditChange = (event) => {
    const {
      target: {
        value,
      }
    } = event;
    setNewMemo(value);
  }

  const onEditSubmit = async (event) => {
    event.preventDefault();
    setIsEdit(false);
    await updateDoc(memoRef, {
      text: newMemo
    });
  }

  const onCancle = (prev) => setIsEdit((prev) => !prev);


  return (
    <div className="w-28 h-28">
      {isEdit ?
        <form onSubmit={onEditSubmit}>
          <input
            value={newMemo}
            onChange={onEditChange}
          />
          <button name="edit" type="submit">수정!</button>
          <button name="cancle" type="button" onClick={onCancle} >취소</button>
        </form>
        :
        <span>{memoObj.text}</span>}

      <input
        type="button"
        value="..."
        onClick={onSetClik}
      />
      {
        editToggle &&
        <div>
          <input
            type="button"
            value="수정"
            onClick={onEditClick}
          />
          <input
            type="button"
            value="삭제"
            onClick={onDeleteClick}
          />
        </div>
      }
    </div>
  );
}


export default Memo;