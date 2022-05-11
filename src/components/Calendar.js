import React, { useEffect, useState } from "react";
import FullCalendar, { formatDate } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import Modal from "react-modal";
import { addDoc, collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { authService, dbService } from "fBase";
import { onAuthStateChanged } from "firebase/auth";

const Calendar = ({ userObj }) => {
  const [eventColor, SetEventColor] = useState("red");
  const [isOpen, setIsOpen] = useState(false);
  //const [event, setEvent] = useState({});
  const [everydayBtn, setEverydayBtn] = useState(false);
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [startDay, setStartDay] = useState("");
  const [startTime, setStartTime] = useState("");

  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");

  Modal.setAppElement("#root");

  const closeModal = (prev) => setIsOpen((prev) => !prev);

  const toggleModal = (arg) => {
    setIsOpen((prev) => !prev);
    setStartDay(arg.dateStr);
  };

  let str = formatDate(new Date(), {
    month: 'long',
    year: 'numeric',
    day: 'numeric'
  });

  const eventClick = (e) => {
    console.log(e.event.id);
  };

  const newButtonClick = () => {
    console.log('new event');
  };

  const onAddCalendar = async (event) => {
    event.preventDefault();
    // if (!everydayBtn) {
    //   setStartDay(String(startDay + "T" + startTime));
    //   setEndDate(String(endDate + "T" + endTime));
    // } 구현 예정
    try {
      await addDoc(collection(dbService, "schedules"), {
        title: title,
        start: startDay,
        end: endDate,
        creatorId: userObj.uid,
        createdAt: Date.now(),
      });
    } catch (e) {

    }
    setIsOpen((prev) => !prev);
    setTitle("");
    setStartDay("");
    setStartTime("");
    setEndDate("");
    setEndTime("");
  };

  const onStartTimeChange = (event) => {
    const { target: { name, value } } = event;
    if (name === "startTime") {
      setStartTime(value);
    }
  };

  const onEndDateChange = (event) => {
    const { target: { name, value } } = event;
    if (name === "endDate") {
      setEndDate(value);
    } else if (name === "endTime") {
      setEndTime(value);
    }
  };

  const onSetTitle = (event) => {
    const { target: { value } } = event;

    setTitle(value);

  };

  const toggleBtn = (arg) => {
    setEverydayBtn((prev) => !prev);
  };

  useEffect(() => {
    const q = query(collection(dbService, "schedules"), orderBy("start", "desc"), where("creatorId", "==", userObj.uid)); //userObj.uid가 왜 안될까 ? 

    // unsubscribe(); 유저 로그 아웃 시에 onSnapshot 수신 대기 상태 제거해줘야함
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const eventArray = querySnapshot.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data()
        };
      });
      setEvents(eventArray);
    });
    onAuthStateChanged(authService, (user) => {
      if (user == null) {
        unsubscribe();
      }
    });
  }, [userObj.uid]);

  return (
    <>
      <Modal
        style={{
          overlay: {
            position: 'fixed',
            zIndex: 1050,
            margin: 'auto',
            width: '450px',
            height: '450px',
            overflowY: 'auto',
            overflowX: 'hidden',
            borderRadius: '16px',
            backgroundColor: 'rgba(255, 255, 255)'
          },
          content: {
            position: 'fixed',
            margin: 'auto',
            width: '450px',
            height: '450px',
            border: '1px solid #ccc',
            background: 'rgba(255, 255, 255)',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '16px',
            outline: 'none',
            padding: '20px',
          }
        }}

        isOpen={isOpen}
        onRequestClose={toggleModal}
        contentLabel="My dialog"
      >
        <section className="flex flex-col text-base">
          <div className="font-bold text-lg">
            <p >일정 추가</p>
          </div>
          <div className="">
            <input type="checkbox" value={everydayBtn} onClick={toggleBtn} />
            <span>종일</span>
          </div>
          <div className="">
            <form onSubmit={onAddCalendar}>
              {everydayBtn ?
                <>
                  <input
                    className="border-2 bg-slate-300 border-slate-300 m-1 p-1"
                    type="text"
                    value={title}
                    onChange={onSetTitle}
                    placeholder="일정명"
                  />
                  <div>
                    <span>시작시간</span>
                    <input
                      className="border-1 bg-slate-300 border-slate-300 m-1 p-1"
                      type="date"
                      value={startDay}
                      readOnly
                    />
                  </div>
                  <div>
                    <span>종료시간</span>
                    <input
                      className="border-1 bg-slate-300 border-slate-300 m-1 p-1"
                      name="endDate"
                      type="date"
                      value={endDate}
                      onChange={onEndDateChange}
                    />
                  </div>
                </>
                :
                <>
                  <input
                    className="border-2 bg-slate-300 border-slate-300 m-1 p-1"
                    type="text"
                    value={title}
                    onChange={onSetTitle}
                    placeholder="일정명"
                  />
                  <div>
                    <span>시작시간</span>
                    <input
                      className="border-1 bg-slate-300 border-slate-300 m-1 p-1"
                      type="date"
                      value={startDay}
                      readOnly />
                    <input
                      className="border-1 bg-slate-300 border-slate-300 m-1 p-1"
                      name="startTime"
                      type="time"
                      value={startTime}
                      onChange={onStartTimeChange}
                    />
                  </div>
                  <div>
                    <span>종료시간</span>
                    <input
                      className="border-1 bg-slate-300 border-slate-300 m-1 p-1"
                      name="endDate"
                      type="date"
                      value={endDate}
                      onChange={onEndDateChange}
                    />
                    <input
                      className="border-1 bg-slate-300 border-slate-300 m-1 p-1"
                      name="endTime"
                      type="time"
                      value={endTime}
                      onChange={onEndDateChange}
                    />
                  </div>
                </>

              }
              <div className="absolute right-2 bottom-2">
                <button className="m-1 p-1 border-2 border-slate-300 bg-slate-300" type="submit">완료</button>
                <button className="m-1 p-1 border-2 border-slate-300 bg-slate-300" onClick={closeModal}>닫기</button>
              </div>
            </form>
          </div>
        </section>

      </Modal>

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          center: 'dayGridMonth,timeGridWeek,timeGridDay new',
        }}
        dateClick={toggleModal} // 그리드 클릭 이벤트
        customButtons={{
          new: {
            text: 'new',
            click: newButtonClick, // 커스텀 버튼 (New)
          },
        }}
        eventClick={eventClick} // 이벤트 클릭 이벤트
        events={events} // 캘린더에 표시되는 이벤트
        eventColor={eventColor} // 이벤트 색상
      />
    </ >


  );

};

export default Calendar;