import { dbService } from "fBase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const Button = styled.button`
  background-color: white;
  border: none;
  cursor: pointer;
`;

const MemosWrapper = styled.li`
/* relative m-3.5 inline-block border-2 border-yellow-200 rounded-xl w-36 h-36 bg-yellow-200 */
  display: flex;
  flex-flow: row wrap;
  margin: 2rem;
  border: 1px solid yellow;
  border-radius: 10px;
  background-color: yellow;
  position: relative;
  width: 30%;
  height: 200px;
  
  form{
    padding:1rem;
  }
`;

const EditInput = styled.input`
  border: none;
  outline: none;
  font-size: inherit;
  color: gray;
  border-bottom: 1px solid ${props => props.theme.bgColor};
`;

const EditButton = styled(Button)`
  background-color: yellow;
  position: absolute;
  right: 0;
  bottom: 0;
`;


const Memo = ({ memoObj }) => {
  const [editToggle, setEditToggle] = useState(false);
  const [newMemo, setNewMemo] = useState(memoObj.text);
  const [isEdit, setIsEdit] = useState(false);

  const memoRef = doc(dbService, "memos", `${memoObj.id}`);

  const onSetClik = (prev) => setEditToggle((prev) => !prev);

  const onEditClick = (prev) => {
    setIsEdit((prev) => !prev);
    onSetClik();
  };

  const onDeleteClick = async () => {
    const ok = window.confirm("정말로 삭제할까요?");
    if (ok) {
      setEditToggle(false);
      await deleteDoc(memoRef);
    }
  };


  const onEditChange = (event) => {
    const {
      target: {
        value,
      }
    } = event;
    setNewMemo(value);
  };

  const onEditSubmit = async (event) => {
    event.preventDefault();
    setIsEdit(false);
    await updateDoc(memoRef, {
      text: newMemo
    });
  };

  const onCancle = (prev) => setIsEdit((prev) => !prev);


  return (
    <MemosWrapper>
      {isEdit ?
        <form onSubmit={onEditSubmit}>
          <EditInput
            value={newMemo}
            onChange={onEditChange}
          />
          <Button name="edit" type="submit">수정</Button>
          <Button name="cancle" type="button" onClick={onCancle} >취소</Button>
        </form>
        :
        <>
          <span>{memoObj.text}</span>

          <EditButton
            onClick={onSetClik}
          >
            <FontAwesomeIcon icon={faEdit} />
          </EditButton>
        </>
      }
      {
        editToggle &&
        <div>
          <Button
            onClick={onEditClick}
          >수정</Button>
          <br />
          <Button
            onClick={onDeleteClick}
          >삭제</Button>
        </div>
      }
    </MemosWrapper >
  );
};


export default Memo;