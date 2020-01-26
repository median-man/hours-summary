import React from "react";
import Container from "../Container";

const Button = props => (
  <button type="button" className="btn btn-outline-dark btn-block" {...props} />
);

const TimeClock = () => {
  return (
    <Container>
      <div style={{ maxWidth: "400px" }}>
        <h1 className="h2 pb-3">Time Clock</h1>
        <Button>In</Button>
        <Button>Out</Button>
        <div className="form-group mt-3">
          <label htmlFor="remarks">Remarks</label>
          <textarea
            className="form-control"
            id="remarks"
            rows={3}
            defaultValue={""}
          />
        </div>
      </div>
    </Container>
  );
};

export default TimeClock;
