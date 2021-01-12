import React, { Fragment, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";

const Form = ({ createAppointment }) => {
  // Appointments state
  const [appointment, updateAppointment] = useState({
    pet: "",
    owner: "",
    date: "",
    time: "",
    symptoms: "",
  });

  const [error, updateError] = useState(false);

  const handleChange = (e) => {
    updateAppointment({
      ...appointment,
      [e.target.name]: e.target.value,
    });
  };

  // Appointment destructuring
  const { pet, owner, date, time, symptoms } = appointment;

  // Method to send appointment
  const submitAppointment = (e) => {
    e.preventDefault();

    // Fields validation
    if (
      pet.trim() === "" ||
      owner.trim() === "" ||
      date.trim() === "" ||
      time.trim() === "" ||
      symptoms.trim() === ""
    ) {
      updateError(true);
      return;
    }

    // Delete previous state
    updateError(false);

    // Assigns a UUID for each appointment
    appointment.id = uuidv4();

    // Create appointment
    createAppointment(appointment);

    // Reset form fields
    updateAppointment({
      pet: "",
      owner: "",
      date: "",
      time: "",
      symptoms: "",
    });
  };

  return (
    <Fragment>
      <h2>Create Appointment</h2>

      {error ? (
        <p className="alerta-error"> All fields must be filled </p>
      ) : null}

      <form onSubmit={submitAppointment}>
        <label>Pet name</label>
        <input
          type="text"
          name="pet"
          className="u-full-width"
          placeholder="Pet name"
          onChange={handleChange}
          value={pet}
        />

        <label>Owner name</label>
        <input
          type="text"
          name="owner"
          className="u-full-width"
          placeholder="Owner name"
          onChange={handleChange}
          value={owner}
        />

        <label>Date</label>
        <input
          type="date"
          name="date"
          className="u-full-width"
          onChange={handleChange}
          value={date}
        />

        <label>Time</label>
        <input
          type="time"
          name="time"
          className="u-full-width"
          onChange={handleChange}
          value={time}
          locale="es-CR"
        />

        <label>Symptoms</label>
        <textarea
          name="symptoms"
          className="u-full-width"
          placeholder="Symptoms"
          onChange={handleChange}
          value={symptoms}
        />

        <button type="submit" className="u-full-width button-primary">
          Create appointment
        </button>
      </form>
    </Fragment>
  );
};

Form.propTypes = {
  createAppointment: PropTypes.func.isRequired,
};

export default Form;
