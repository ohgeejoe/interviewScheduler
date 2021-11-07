import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Confirm from "./Confirm";
import useVisualMode from "hooks/useVisualMode";
import Status from "./Status";
import Error from "./Error";

//mode constants
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

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
      transition(ERROR_DELETE,true)
  })
  }
  
  function deleteButton() {
    transition(CONFIRM);
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
          onDelete={deleteButton}
          onEdit={() => transition(EDIT)}
        />
      )}

      {mode === CREATE && (
        <Form
          name={props.name}
          interviewer={props.interviewer}
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}

        />
      )}

      {mode === SAVING && (
        <Status 
        message={"Loadingggggg"}/>
      )}

      {mode === CONFIRM && (
        <Confirm
        onCancel={back}
        onConfirm={() => {
          props.cancelInterview(props.id)
          transition(EMPTY)}

        }
        />
      )}

      {mode === EDIT && 
      <Form 
      name={props.name}
      interviewer={props.interviewer}
      interviewers={props.interviewers}
      onCancel={back}
      onSave={save}
    />}

      {mode === ERROR_SAVE && 
      <Error onClose={() => transition(SHOW)} message={"Error saving"}/>} 

      {mode === ERROR_DELETE && 
      <Error onClose={() => transition(SHOW)} message={"Error deleting"}/>} 

    </article>
  );
}