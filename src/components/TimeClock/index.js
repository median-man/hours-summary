import React, { useReducer, useRef } from "react";
import { createPunch } from "../../utils/time-tracker-api";
import Container from "../Container";
import Button from "./Button";

const initialState = {
  punchType: "",
  isPending: false,
  error: null
};

// action types
const PENDING = "PENDING";
const PUNCH_CREATED = "PUNCH_CREATED";
const ERROR = "ERROR";

const reducer = (state, action) => {
  switch (action.type) {
    case PENDING:
      return { ...state, isPending: true, punchType: action.punchType };
    case PUNCH_CREATED:
      return { ...state, isPending: false, punchType: "" };
    case ERROR:
      return { ...state, isPending: false, error: action.error };
    default:
      throw new Error(`Invalid action type: ${action.type}`);
  }
};

const TimeClock = () => {
  const [{ isPending, punchType }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const remarksInputRef = useRef();

  const handleButtonClick = async event => {
    try {
      const punchType = event.target.value;
      dispatch({ type: PENDING, punchType });
      const date = new Date();
      const remarks = remarksInputRef.current.value;
      await createPunch({
        type: punchType,
        timeStamp: date.getTime(),
        remarks
      });
      console.log("punch saved");
      alert(
        `${punchType[0].toUpperCase() +
          punchType.substr(1)} punch created at ${date.toLocaleTimeString()}`
      );
      dispatch({ type: PUNCH_CREATED });
      remarksInputRef.current.value = "";
    } catch (error) {
      alert("An error occurred attempting to create time clock punch.");
      dispatch({ type: ERROR, error });
    }
  };
  return (
    <Container>
      <div style={{ maxWidth: "400px" }}>
        <h1 className="h2 pb-3">Time Clock</h1>
        <Button
          value="in"
          disabled={isPending}
          isPending={isPending && punchType === "in"}
          onClick={handleButtonClick}
        >
          In
        </Button>
        <Button
          value="out"
          disabled={isPending}
          isPending={isPending && punchType === "out"}
          onClick={handleButtonClick}
        >
          Out
        </Button>
        <div className="form-group mt-3">
          <label htmlFor="remarks">Remarks</label>
          <textarea
            className="form-control"
            id="remarks"
            rows={3}
            ref={remarksInputRef}
          />
        </div>
      </div>
    </Container>
  );
};

export default TimeClock;
