import React from "react";
import "components/Application.scss";
import DayList from "./DayList";
import { useState } from "react";
import Appointment from "components/Appointment/index.js";
import { useEffect } from "react";
import axios from 'axios';
import { getAppointmentsForDay, getInterview, getInterviewersForDay} from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData"


export default function Application(props) {

  const {
    setState,
    setDay,
    state,
    bookInterview,
    cancelInterview,
    editInterview
  } = useApplicationData();

  const dailyAppointments = getAppointmentsForDay(state, state.day);


  useEffect(() => {
    Promise.all([
    axios.get(`http://localhost:8001/api/days`),
    axios.get('http://localhost:8001/api/appointments'),
    axios.get('http://localhost:8001/api/interviewers')
    ])
    .then(res => {
      setState(prev => ({...prev, 
        days: res[0].data, 
        appointments: res[1].data, 
        interviewers: res[2].data }));
    })
    
    },[])
  

  
  return (
    <main className="layout">
      <section className="sidebar">
      <img
  className="sidebar--centered"
  src="images/logo.png"
  alt="Interview Scheduler"
/>
<hr className="sidebar__separator sidebar--centered" />
<nav className="sidebar__menu">
   <DayList days={state.days} 
   value={state.day} 
   onChange={setDay}
   bookInterview={bookInterview}/>
</nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
      </section>
      <section className="schedule">
       
        {dailyAppointments.map((appointment) => 
        <Appointment 
        key={appointment.id} 
        id={appointment.id} 
        time={appointment.time} 
        interview={getInterview(state, appointment.interview)} 
        interviewers={getInterviewersForDay(state, state.day)}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
        editInterview={editInterview}
        day={state.day}
        />
        
        )}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
    
  );
}
