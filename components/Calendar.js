import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


export default function TheCalendar({dateRangeParam, dateRange, setDateRange}) {
  const [date, setDate] = useState(new Date());

  function onChange(date){
    setDate(date)
    setDateRange({...dateRange, [dateRangeParam]:date})
  }

  useEffect(()=>{
    // console.log(date)
  }, [date])

  // console.log(Date())

  return (
    
      <Calendar
       next2Label={"›"}
       nextLabel={"»"}
       onChange={onChange}
       value={date}
       prevLabel= "«"
       prev2Label= "‹"
       />
    
  );
}