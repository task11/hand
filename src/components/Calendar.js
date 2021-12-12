import React, { useState } from "react";
import FullCalendar, { formatDate } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import Modal from "react-modal";

const Calendar = ({ userObj }) => {
  const [eventColor, SetEventColor] = useState("red");
  const [isOpen, setIsOpen] = useState(false);
  const [test, setTest] = useState("");

  Modal.setAppElement("#root");

  const toggleModal = (arg) => {
    setIsOpen((prev) => !prev);
    setTest(arg.dateStr);
    console.log(test);
  }

  console.log(userObj);

  const handleDateClick = (arg) => { // bind with an arrow function calendar 클릭 이벤트
    alert(arg.dateStr)
  }

  let str = formatDate(new Date(), {
    month: 'long',
    year: 'numeric',
    day: 'numeric'
  });
  console.log(str);// today

  const events = [
    {
      id: 1,
      title: 'event 1',
      start: '2021-12-14T10:00:00',
      end: '2021-12-14T12:00:00',
    },
    {
      id: 2,
      title: 'event 2',
      start: '2021-12-16T13:00:00',
      end: '2021-12-16T18:00:00',
    },
    { id: 3, title: 'event 3', start: '2021-12-17', end: '2021-12-20' },
  ];

  const eventClick = (e) => {
    console.log(e.event.id)
  }

  const newButtonClick = () => {
    console.log('new event')
  }





  return (
    <>
      <FullCalendar
        id="calendar"
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

      <Modal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        contentLabel="My dialog"
      >
        <div>My Modal</div>
        <span>{test}</span>
        <button onClick={toggleModal}>Close</button>
      </Modal>
    </>


  );

}

export default Calendar;