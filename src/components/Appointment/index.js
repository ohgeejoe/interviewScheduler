import React from "react";
import classNames from "classnames";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";

//mode constats
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE;"

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
          interviewers={[]}
          onCancel={back}

        />
      )}

    </article>
  );
}