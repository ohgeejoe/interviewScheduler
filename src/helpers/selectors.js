export function getAppointmentsForDay(state, day) {
  // state.days is an array of days
  let aptArr = [];
  for (let date of state.days) {
    if (date.name === day) {
      aptArr.push(...date.appointments);
    }
  }

  let appointmentsArr = [];
  for (let aptObj in state.appointments) {
    for (let id of aptArr) {
      if (id === parseInt(aptObj)) {
        appointmentsArr.push(state.appointments[aptObj])
      }
    }
  }
  
  return appointmentsArr;
}

export function getInterview(state, interview) {
 //since some appointment slots will not have an interview.
  if (!interview) {
  return null;
  }
  return (
    {
      student: interview.student,
      interviewer: state.interviewers[interview.interviewer]
    }
  )

}