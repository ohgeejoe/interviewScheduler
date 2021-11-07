import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";
import Status from "./Status";

//mode constants
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";

const appointmentMsg = function (props) {
  const time = props.time;
  let returnStr = '';
  if (!time) {
    returnStr = `No appointments`
  } else {
    //"appointment at" text
    returnStr = `Appointment at ${time}`
  }
  return returnStr;
}

export default function Appointment(props) {


  function save(name, interviewer) {
   transition(SAVING);
    const interview = {
      student: name,
      interviewer
    }
    props.bookInterview(props.id, interview)
    //update to .then and .catch after writing the axios put. since it is async. (connection to server takes time and could also error out).
    .then(() => transition(SHOW))
    //what to write in the catch? goes back to CREATE for now.
    .catch((err) => {
    console.log("ERROR BABY!", err);
    transition(CREATE);
  })
  }


  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  const message = appointmentMsg(props)
  return (
    <article className="appointment">{message}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}

      {mode === CREATE && (
        <Form
          name={props.name}
          interviewer={props.interviewer}
          // am i passing interviewers correctly?
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}

        />
      )}

      {mode === SAVING && (
        <Status 
        message={"Loadingggggg"}/>
      )}

    </article>
  );
}