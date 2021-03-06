import { Link } from "react-router-dom";
//import { updateReservationStatus } from "../utils/api";

function ReservationList({ reservations, cancelHandler }) {
  const list = reservations.map((reservation) => {
    if (reservation.status === "finished" || reservation.status === "cancelled")
      return null;
    return (
      <div
        className="col-lg-4 col-xl-3 bg-secondary m-3 card text-white"
        key={reservation.reservation_id}
      >
        <h3>Date: {reservation.reservation_date}</h3>
        <h4>
          Name: {reservation.last_name}, {reservation.first_name}
        </h4>
        <h5>Time: {reservation.reservation_time}</h5>

        <h5>Phone Number: {reservation.mobile_number}</h5>
        <h5>Size: {reservation.people}</h5>
        <br />
        <h6 data-reservation-id-status={reservation.reservation_id}>
          Status: {reservation.status}
        </h6>
        <div>
          {reservation.status === "Booked" ? (
            <div>
              <Link
                to={`/reservations/${reservation.reservation_id}/seat`}
                className="btn btn-success"
              >
                Seat
              </Link>{" "}
              &nbsp;
              <Link
                to={`/reservations/${reservation.reservation_id}/edit`}
                className="btn btn-warning"
              >
                Edit
              </Link>{" "}
              &nbsp;
              <button
                data-reservation-id-cancel={reservation.reservation_id}
                onClick={() => {
                  cancelHandler(reservation.reservation_id);
                }}
                value={reservation.reservation_id}
                className="btn btn-danger"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              data-reservation-id-cancel={reservation.reservation_id}
              onClick={() => {
                cancelHandler(reservation.reservation_id);
              }}
              value={reservation.reservation_id}
              className="btn btn-danger"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    );
  });
  // if no reservation return no reservation message
  if (reservations.length < 1) {
    return (
      <div>
        <br />
        <h3 className="alert alert-success" style={{ width: "50%" }}>
          No reservations found
        </h3>
        <br />
      </div>
    );
  }
  return (
    <div className="row">
      {list}
      <br />
    </div>
  );
}

export default ReservationList;
