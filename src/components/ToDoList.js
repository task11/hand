import React, { useEffect, useState } from "react";
import { authService, dbService } from "fBase";
import { addDoc, collection, doc, onSnapshot, orderBy, query, updateDoc, where } from "@firebase/firestore";


const ToDoList = ({ userObj }) => {

  const [toDo, setToDo] = useState("");
  const [error, setError] = useState("");
  const [isChecked, setIsChecked] = useState(true); // check box value 초기 값이 true여야지 첫 번쨰 클릭때 onCheck 함수에서 true로 바뀜
  const [toDos, setToDos] = useState([]);

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
    setToDo("");
  }

  const onCheck = (prev) => {
    setIsChecked((prev) => !prev);
    // 데이터베이스 업데이트 코드 추가
    const washingtonRef = doc(dbService, "todos", prev.target.name);

    updateDoc(washingtonRef, {
      done: isChecked
    });
  };

  useEffect(() => {
    const q = query(collection(dbService, "todos"), orderBy("createdAt"), where("creatorId", "==", authService.currentUser.uid)); //userObj.uid가 왜 안될까 ?

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
              <div key={toDo.id}>
                <input type="checkbox"
                  value={isChecked}
                  onChange={onCheck}
                  checked={toDo.done}
                  name={toDo.id}
                />
                <li>{toDo.task}</li>
              </div>
            );
          })}
        </ul>
      </div>

    </div>
  );
}

export default ToDoList;