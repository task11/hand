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
  }

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
  }

  useEffect(() => {
    const q = query(collection(dbService, "memos"), orderBy("createdAt", "desc"), where("creatorId", "==", userObj.uid)); //userObj.uid가 왜 안될까 ?

    // unsubscribe(); 유저 로그 아웃 시에 onSnapshot 수신 대기 상태 제거해줘야함
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const memoArray = querySnapshot.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data()
        }
      });
      setMemos(memoArray);
    });

    onAuthStateChanged(authService, (user) => {
      if (user == null) {
        unsubscribe();
      }
    });

  }, [userObj.uid])



  return (
    <div className=" m-5 w-full h-1/2">
      <div>MEMO</div>
      <div>
        <form onSubmit={onSubmit}>
          <input
            name="text"
            type="text"
            value={memo}
            onChange={onChange}
            placeholder="텍스트를 입력하세요."
          />
          <button type="submit" name="add">추가</button>
          {error && <span>{error}</span>}
        </form>
      </div>
      <div className="border-2 rounded-xl w-32 h-32 bg-gray-200">
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
      </div>

    </div>
  );
}

export default MemoList;