import React, { useEffect, useState } from "react";
import FullCalendar, { formatDate } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import Modal from "react-modal";
import { addDoc, collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { dbService } from "fBase";

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

  const toggleModal = (arg) => {
    setIsOpen((prev) => !prev);
    setStartDay(arg.dateStr);
  }

  let str = formatDate(new Date(), {
    month: 'long',
    year: 'numeric',
    day: 'numeric'
  });

  const eventClick = (e) => {
    console.log(e.event.id)
  }

  const newButtonClick = () => {
    console.log('new event')
  }

  const onAddCalendar = async (event) => {
    event.preventDefault();
    if (!everydayBtn) {
      setStartDay(String(startDay + "T" + startTime));
      setEndDate(String(endDate + "T" + endTime));
    }
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
  }

  const onStartTimeChange = (event) => {
    const { target: { name, value } } = event;
    if (name === "startTime") {
      setStartTime(value);
    }
  }

  const onEndDateChange = (event) => {
    const { target: { name, value } } = event;
    if (name === "endDate") {
      setEndDate(value);
    } else if (name === "endTime") {
      setEndTime(value);
    }
  }

  const onSetTitle = (event) => {
    const { target: { value } } = event;

    setTitle(value);

  }

  const toggleBtn = (arg) => {
    setEverydayBtn((prev) => !prev);
  }

  useEffect(() => {
    const q = query(collection(dbService, "schedules"), orderBy("start", "desc"), where("creatorId", "==", userObj.uid)); //userObj.uid가 왜 안될까 ? 

    // unsubscribe(); 유저 로그 아웃 시에 onSnapshot 수신 대기 상태 제거해줘야함
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const eventArray = querySnapshot.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data()
        }
      });
      setEvents(eventArray);
    });

    console.log("useEffect");
  }, [userObj.uid]);

  return (
    <>
      <div>
        <Modal
          style={{
            overlay: {
              position: 'fixed',
              zIndex: 1050,
              top: 300,
              left: 200,
              right: 600,
              bottom: 300,
              backgroundColor: 'rgba(255, 255, 255, 0.75)'
            },
            content: {
              position: 'fixed',
              top: 200,
              left: 200,
              right: 600,
              bottom: 200,
              border: '1px solid #ccc',
              background: 'rgba(255, 255, 255, 0.8)',
              overflow: 'auto',
              WebkitOverflowScrolling: 'touch',
              borderRadius: '4px',
              outline: 'none',
              padding: '20px'
            }
          }}

          isOpen={isOpen}
          onRequestClose={toggleModal}
          contentLabel="My dialog"
        >
          <div>일정 추가</div>
          <input type="checkbox" value={everydayBtn} onClick={toggleBtn} />
          <span>종일</span>
          <form onSubmit={onAddCalendar}>
            {everydayBtn ?
              <>
                <input
                  type="text"
                  value={title}
                  onChange={onSetTitle}
                  placeholder="일정명"
                />
                <span>시작시간</span>
                <input
                  type="date"
                  value={startDay}
                  readOnly
                />
                <br />
                <span>종료시간</span>
                <input
                  name="endDate"
                  type="date"
                  value={endDate}
                  onChange={onEndDateChange}
                />
              </>
              :
              <>
                <input
                  type="text"
                  value={title}
                  onChange={onSetTitle}
                  placeholder="일정명"
                />
                <span>시작시간</span>
                <input type="date"
                  value={startDay}
                  readOnly />
                <input
                  name="startTime"
                  type="time"
                  value={startTime}
                  onChange={onStartTimeChange}
                />
                <br />
                <span>종료시간</span>
                <input
                  name="endDate"
                  type="date"
                  value={endDate}
                  onChange={onEndDateChange}
                />
                <input
                  name="endTime"
                  type="time"
                  value={endTime}
                  onChange={onEndDateChange}
                />
              </>

            }
            <button type="submit">완료</button>

          </form>
          <button onClick={toggleModal}>닫기</button>

        </Modal>
      </div>
      <div>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            center: 'dayGridMonth,timeGridWeek,timeGridDay new',
          }}
          dateClick={toggleModal} // 클릭 이벤트
          customButtons={{
            new: {
              text: 'new',
              click: newButtonClick,
            },
          }}
          eventClick={eventClick}
          events={events}
          eventColor={eventColor}
        />
      </div>

    </>


  );

}

export default Calendar;