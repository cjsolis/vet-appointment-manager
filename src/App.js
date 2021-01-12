import React, { Fragment, useState, useEffect } from "react";
import Form from "./components/Form";
import Appointment from "./components/Appointment";

function App() {
  // Check if there are stored appointments on Local Storage
  let savedAppointments = JSON.parse(localStorage.getItem("appointments"));

  if (!savedAppointments) {
    savedAppointments = [];
  }

  // Appointments array state
  const [appointments, saveAppointments] = useState(
    savedAppointments ? savedAppointments : []
  );

  // Use Effect to update the local storage when the state changes
  useEffect(() => {
    if (savedAppointments) {
      localStorage.setItem("appointments", JSON.stringify(appointments));
    } else {
      localStorage.setItem("appointments", JSON.stringify([]));
    }
  }, [appointments, savedAppointments]);

  // Method to create new appointments
  const createAppointment = (appointment) => {
    saveAppointments([...appointments, appointment]);
  };

  // Method to delete appointments
  const deleteAppointment = (id) => {
    saveAppointments(
      appointments.filter((appointment) => appointment.id !== id)
    );
  };

  return (
    <Fragment>
      <h1>Patient manager</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Form createAppointment={createAppointment} />
          </div>
          <div className="one-half column">
            {appointments.length === 0 ? (
              <h1>No appointments found</h1>
            ) : (
              <h1>Manage appointments</h1>
            )}

            {appointments.map((appointment) => (
              <Appointment
                key={appointment.id}
                appointment={appointment}
                deleteAppointment={deleteAppointment}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
