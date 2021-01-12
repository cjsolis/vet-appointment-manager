import React from "react";
import PropTypes from "prop-types";

const Appointment = ({ appointment, deleteAppointment }) => {
  /*
   * Code from https://stackoverflow.com/questions/13898423/javascript-convert-24-hour-time-of-day-string-to-12-hour-time-with-am-pm-and-no
   */
  const convertTime = (time) => {
    // Check correct time format and split into components
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? " AM" : " PM"; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }

    return time.join(""); // return adjusted time or original string
  };

  return (
    <div className="cita">
      <p>
        Pet name: <span>{appointment.pet}</span>
      </p>
      <p>
        Owner name: <span>{appointment.owner}</span>
      </p>
      <p>
        Date: <span>{appointment.date}</span>
      </p>
      <p>
        Time: <span>{convertTime(appointment.time)}</span>
      </p>
      <p>
        Symptoms: <span>{appointment.symptoms}</span>
      </p>

      <button
        className="button eliminar u-full-width"
        onClick={() => deleteAppointment(appointment.id)}
      >
        Delete &times;
      </button>
    </div>
  );
};

Appointment.propTypes = {
  appointment: PropTypes.object.isRequired,
  deleteAppointment: PropTypes.func.isRequired,
};

export default Appointment;
