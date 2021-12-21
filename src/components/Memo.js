import { dbService } from "fBase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
    <div className="relative m-3.5 inline-block border-2 border-yellow-200 rounded-xl w-32 h-32 bg-yellow-200">
      {isEdit ?
        <form onSubmit={onEditSubmit}>
          <input
            className="bg-transparent"
            value={newMemo}
            onChange={onEditChange}
          />
          <button name="edit" type="submit">수정</button>
          <button name="cancle" type="button" onClick={onCancle} >취소</button>
        </form>
        :
        <div className="m-1.5 p-1.5">
          <span>{memoObj.text}</span>

          <button
            className=" absolute right-0 bottom-0"
            onClick={onSetClik}
          >
            <FontAwesomeIcon icon={faEdit} />
          </button>
        </div>
      }
      {
        editToggle &&
        <div className="absolute right-0 -bottom-10">
          <input
            type="button"
            value="수정"
            onClick={onEditClick}
          />
          <br />
          <input
            type="button"
            value="삭제"
            onClick={onDeleteClick}
          />
        </div>
      }
    </div >
  );
}


export default Memo;