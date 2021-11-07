import React from "react";

import "components/Application.scss";
import DayList from "./DayList";
import { useState } from "react";
import Appointment from "components/Appointment/index.js";
import { useEffect } from "react";
import axios from 'axios';
import { getAppointmentsForDay, getInterview, getInterviewersForDay} from "helpers/selectors";


export default function Application(props) {

  function cancelInterview(id) {
    return axios.delete(`/appointments/${id}`)
      .then(() => {
        // interviewer = null
      // cant "After we delete an interview, it will need to have its value set to null. If we are still in the SHOW mode and the interview isn't set to null, we may get a TypeError.""

      //i think i need to setState for interviewer
      
      })
  }

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  function bookInterview(id, interview) {
    console.log(id, interview);

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    setState({
      ...state,
      appointments
    });

    return axios.put(`http://localhost:8001/api/appointments/${id}`, {
      ...state.appointments[id],
      interview: { ...interview }
    })
  }


  const dailyAppointments = getAppointmentsForDay(state, state.day);

  
  const setDay = day => setState({...state, day});

  useEffect(() => {
    Promise.all([
    axios.get(`http://localhost:8001/api/days`),
    axios.get('http://localhost:8001/api/appointments'),
    axios.get('http://localhost:8001/api/interviewers')
    ])
    .then(res => {
      setState(prev => ({...prev, days: res[0].data, appointments: res[1].data, interviewers: res[2].data }));
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
   onChange={setDay} />
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
        />
        
        )}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
    
  );
}
