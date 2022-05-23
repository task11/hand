import React, { useEffect, useState } from "react";
import { authService, dbService } from "fBase";
import { onAuthStateChanged } from "@firebase/auth";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  where
} from "@firebase/firestore";
import Memo from "./Memo";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const MemoContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
`;

const MemoTitle = styled.div`
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

const MemoInput = styled.input`
  border: none;
  outline: none;
  font-size: 1.2rem;
  border-bottom: 1px solid ${props => props.theme.bgColor};
  width: 80%;
  margin-bottom: 1.5rem;
`;

const Memos = styled.div`
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


// 수정 기능 추가
const MemoList = ({ userObj }) => {

  const [memo, setMemo] = useState("");
  const [error, setError] = useState("");
  const [memos, setMemos] = useState([]);

  const onChange = (event) => {
    const {
      target: {
        value,
      }
    } = event;
    setMemo(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await addDoc(collection(dbService, "memos"), {
        text: memo,
        creatorId: userObj.uid,
        createdAt: Date.now(),
      });
    } catch (e) {
      setError(e);
    }
    setMemo("");
  };

  useEffect(() => {
    const q = query(collection(dbService, "memos"), orderBy("createdAt", "desc"), where("creatorId", "==", userObj.uid)); //userObj.uid가 왜 안될까 ?

    // unsubscribe(); 유저 로그 아웃 시에 onSnapshot 수신 대기 상태 제거해줘야함
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const memoArray = querySnapshot.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data()
        };
      });
      setMemos(memoArray);
    });

    onAuthStateChanged(authService, (user) => {
      if (user == null) {
        unsubscribe();
      }
    });

  }, [userObj.uid]);



  return (
    <MemoContent>
      <MemoTitle>
        <Title >MEMO</Title>

        <form onSubmit={onSubmit}>
          <MemoInput
            name="text"
            type="text"
            value={memo}
            onChange={onChange}
            placeholder="텍스트를 입력하세요."
          />
          <Button type="submit" name="add">
            <FontAwesomeIcon icon={faPlusSquare} size="2x" />
          </Button>
          {error && <span>{error}</span>}
        </form>
      </MemoTitle>
      <Memos>
        <ul>
          {memos.map((memo) => {
            return (
              <Memo
                key={memo.id}
                memoObj={memo}
              />
            );
          })}
        </ul>
      </Memos>

    </MemoContent>
  );
};

export default MemoList;