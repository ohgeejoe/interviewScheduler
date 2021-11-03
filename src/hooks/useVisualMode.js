import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

// returns current mode
  function transition(change, replace) {
    if (!replace) {
      setHistory(history => ([...history, change]));
    }
    return setMode(change);
  }

  //back
  function back() {
    if (history.length > 1) {
      history.pop();
      setMode(history[history.length - 1]);
      setHistory([ ...history ]);
    }
  }

  return { mode, transition, back };
};
