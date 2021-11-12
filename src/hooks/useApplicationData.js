import axios from "axios";
import { useState, useEffect, useReducer } from "react";

export default function useApplicationData() {
const setDay = day => setState({...state, day});

const [state, setState] = useState({
  day: "Monday",
  days: [],
  appointments: {}
});

function bookInterview(id, interview) {

  console.log(state);
  
  const appointment = {
    ...state.appointments[id],
    interview: { ...interview }
  };

  const appointments = {
    ...state.appointments,
    [id]: appointment
  };

  let bookedSpots = 0;
  let totalSpots = 0;
  state.days.forEach(day => {
    totalSpots++
    if (day.name === state.day) {
      day.appointments.forEach(
        (app) =>
        {
         if (appointments[app].interview != null) {
           bookedSpots++
         }
         }
      )
      
    }
  })

  state.days.forEach(day => {
    if (day.name === state.day) {
      day.spots = totalSpots - bookedSpots
    }
  });
  console.log(state.days)


  setState({
    ...state,
    appointments
  });

  

  return axios.put(`http://localhost:8001/api/appointments/${id}`,{

    ...state.appointments[id],
    interview: { ...interview }
  }

  )
}

function editInterview(id, interview) {

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

function cancelInterview(id) {

  return axios.delete(`http://localhost:8001/api/appointments/${id}`)
    .then((res) => {
      const appointment = {
        ...state.appointments[id],
        interview: null
      };
  
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };

      let bookedSpots = 0;
      let totalSpots = 0;
      state.days.forEach(day => {
      totalSpots++
       if (day.name === state.day) {
            day.appointments.forEach(
            (app) =>
        {
         if (appointments[app].interview != null) {
           bookedSpots++
         }
         }
      )
      
    }
  })

  state.days.forEach(day => {
    if (day.name === state.day) {
      day.spots = totalSpots - bookedSpots
    }
  });
  console.log(state.days)


      setState({
        ...state,
        appointments
      });
})
};


return {
  setState,
  setDay,
  state,
  bookInterview,
  cancelInterview,
  editInterview
}
}