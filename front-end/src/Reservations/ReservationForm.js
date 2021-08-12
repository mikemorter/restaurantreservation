import React from "react";
import { useHistory } from "react-router";

function ReservationForm({ changeHandler, submitHandler, reservationData }) {
  const history = useHistory();
  return (
    <div>
      <div>
        <h2> New Reservation</h2>
      </div>
      <form>
        <div>
          <label htmlFor="first_name">First Name</label>
          <input
            id="first_name"
            className="form-control"
            type="text"
            name="first_name"
            onChange={changeHandler}
            value={reservationData.first_name}
            style={{ width: "50%" }}
            required
          />
        </div>
        <div>
          <label htmlFor="last_name">Last Name</label>
          <input
            id="last_name"
            className="form-control"
            type="text"
            name="last_name"
            onChange={changeHandler}
            value={reservationData.last_name}
            style={{ width: "50%" }}
            required
          />
        </div>

        <div>
          <label htmlFor="mobile_number">Mobile Number</label>
          <input
            id="mobileNumber"
            className="form-control"
            type="tel"
            name="mobile_number"
            onChange={changeHandler}
            value={reservationData.mobile_number}
            style={{ width: "50%" }}
            required
          />
        </div>

        <div>
          <label htmlFor="reservation_date">Date of Reservation</label>
          <input
            id="date"
            className="form-control"
            type="date"
            name="reservation_date"
            onChange={changeHandler}
            value={reservationData.reservation_date}
            style={{ width: "50%" }}
            required
          />
        </div>

        <div>
          <label htmlFor="reservation_time">Time of Reservation</label>
          <input
            id="time"
            className="form-control"
            type="time"
            name="reservation_time"
            onChange={changeHandler}
            value={reservationData.reservation_time}
            style={{ width: "50%" }}
            required
          />
        </div>

        <div>
          <label htmlFor="people">Number of People in Party</label>
          <input
            id="people"
            type="number"
            className="form-control"
            name="people"
            onChange={changeHandler}
            value={reservationData.people}
            style={{ width: "50%" }}
            required
          />
        </div>
        <button
          onClick={submitHandler}
          type="submit"
          className="btn btn-secondary"
        >
          Submit
        </button>
        <button
          onClick={() => history.push("/dashboard")}
          type="button"
          className="btn btn-secondary"
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default ReservationForm;
