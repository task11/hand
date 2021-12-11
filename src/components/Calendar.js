import React from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

const Calendar = ({ userObj }) => {
  console.log(userObj);

  const handleDateClick = (arg) => { // bind with an arrow function calendar 클릭 이벤트
    alert(arg.dateStr)
  }

  const renderEventContent = (event) => {
    console.log(event.timeText);
  }

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      dateClick={handleDateClick} // 클릭 이벤트
      eventContent={renderEventContent} //
      events={[
        { title: 'event 1', date: '2021-12-05' },
        { title: 'event 2', date: '2021-12-12' }
      ]}
    />
  );

}

export default Calendar;