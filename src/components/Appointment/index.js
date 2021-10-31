import React from "react";
import classNames from "classnames";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

//is this necessary? i think its broken.
const appointmentMsg = function(props) {
  const time = props.time;
  let returnStr = '';
  if (!time) {
    returnStr = `No appointments`
  } else {
    //appointment at 
    returnStr = `Appointment at ${time}`
  }
  return returnStr;
}

export default function Appointment(props) {
  const message = appointmentMsg(props)
  return (
    <article className="appointment">{message}
    <Header time={props.time}/>
    {props.interview && <Show student={props.interview && props.interview.student}  interviewer={props.interview.interviewer}/>}
     {!props.interview && <Empty />}
    </article>
  );
}