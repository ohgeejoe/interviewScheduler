import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {
  
  let dayClass = classNames("day-list__item", {"day-list__item--selected": props.selected, "day-list__item--full": props.spot === 0});

  const updateSpot = function () {
    let spotsRemaining = "";
  if (props.spots > 1) {
    spotsRemaining = `${props.spots} spots remaining`
  } else if (props.spots === 1) {
    spotsRemaining = `1 spot remaining`
  } else if (props.spots === 0) {
    spotsRemaining = `no spots remaining`
  }
  return spotsRemaining;
};

  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)} selected={props.selected}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{updateSpot()}</h3>
    </li>
  );
}