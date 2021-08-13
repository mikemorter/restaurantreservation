import { useHistory, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { reservationById, listTables, seatTable } from "../utils/api";
import ErrorAlert from "../Errors/ErrorAlert";

function SeatReservation() {
  const history = useHistory();
  const [reservation, setReservation] = useState([]);
  const [tables, setTables] = useState([]);
  const [currentTable, setCurrentTable] = useState({ table_id: "" });
  const [errors, setErrors] = useState(null);
  const { reservation_id } = useParams();

  useEffect(load, [reservation_id]);

  function load() {
    const abortController = new AbortController();
    reservationById(reservation_id, abortController.signal)
      .then(setReservation)
      .catch(setErrors);
    listTables(abortController.signal).then(setTables).catch(setErrors);
    return () => abortController.signal;
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const abortController = new AbortController();
    try {
      await seatTable(
        reservation_id,
        currentTable.table_id,
        abortController.signal
      );

      history.push("/dashboard");
    } catch (error) {
      setErrors(error);
    }
    return () => abortController.abort();
  };

  const changeHandler = (e) => {
    setCurrentTable({
      ...currentTable,
      [e.target.name]: e.target.value,
    });
  };

  //only list options for tables that are not currently seated
  const freeTables = tables.filter((table) => table.reservation_id === null);

  const reservationCard = (
    <div
      className="col-lg-4 col-xl-3 bg-secondary m-3 card text-white"
      key={reservation.reservation_id}
    >
      <div className="card-header">
        <h3>Date: {reservation.reservation_date}</h3>
        <h4>
          Name:
          {reservation.last_name} {reservation.first_name}
        </h4>
        <h5>Time: {reservation.reservation_time}</h5>
        <h5>Number: {reservation.mobile_number}</h5>
        <h5>Size: {reservation.people}</h5>
      </div>
    </div>
  );

  return (
    <div>
      <h2>Seat Reservation</h2>
      {errors && <ErrorAlert error={errors} />}
      <div>{reservationCard}</div>
      <div>
        <form>
          <h3>Select a table</h3>
          <select name="table_id" onChange={changeHandler}>
            <option>Select Table</option>
            {freeTables.map((table) => (
              <option
                key={table.table_id}
                value={table.table_id}
                defaultValue="Select Table"
              >
                {table.table_name} - {table.capacity}
              </option>
            ))}
          </select>
        </form>
      </div>
      <button className="btn btn-secondary" onClick={() => history.goBack()}>
        Cancel
      </button>
      <button
        onClick={submitHandler}
        type="submit"
        className="btn btn-secondary"
      >
        Seat
      </button>
    </div>
  );
}

export default SeatReservation;
