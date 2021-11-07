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

// takes the state and a day and gets all the interviewers for that day
// export function getInterviewersForDay(state, day) {
//   if (state.days.length === 0) {
//     return [];
//   }

//   if (state.days[day] === undefined) {
//     return [];
//   }
//   const interviewers = state.interviewers;
//   //need to fix
//   const dayInterviewer = state.days[interviewers];
//   console.log("dayinterviewers "+ dayInterviewer)

//   //builds a new array.
//   const dayInterviewers = dayInterviewer.map((interviewerID) => {
//     return interviewers[interviewerID];
//   })

// return dayInterviewers;
// }

// takes the state and a day and gets all the interviewers for that day
export function getInterviewersForDay(state, day) {
  // state.days is an array of days
  let intArr = [];
  for (let date of state.days) {
    if (date.name === day) {
      intArr.push(...date.interviewers);
    }
  }

  let interviewersArr = [];
  for (let intObj in state.interviewers) {
    for (let id of intArr) {
      if (id === parseInt(intObj)) {
        interviewersArr.push(state.interviewers[intObj])
      }
    }
  }
  return interviewersArr;
}