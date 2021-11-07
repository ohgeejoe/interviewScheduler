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