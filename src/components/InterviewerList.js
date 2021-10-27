import React from "react";
import classNames from "classnames";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props) {
  let InterviewerItems = props.interviewers.map((interviewer) => <InterviewerListItem 
  key={interviewer.id}
  name={interviewer.name}
  avatar={interviewer.avatar}
  //cahnge from setInterviwer to onChange might've broke something
  setInterviewer={() => props.onChange(interviewer.id)}
  // interviwer prop is a number which represents the id of currently selected interviewer.
  selected={interviewer.id === props.value}
  />
  )

  return (
    <section className="interviewers">
  <h4 className="interviewers__header text--light">Interviewer</h4>
  <ul className="interviewers__list">{InterviewerItems}</ul>
</section>
  )
}