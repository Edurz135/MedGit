const Router = require("express");
const { authenticateToken } = require("../middlewares/auth.middleware");

const {
  getPastAppointments,
  getListDoctors,
  getAvailability,
  getListSpecialties,
  getFutureAppointments,
  getAppointmentDetails,
  getupdatePacient,
  getVisualisePacient,
  bookAppointment,
} = require("../controllers/patient.controller");

const patientRouter = Router();

// Rutas del paciente
patientRouter.get(
  "/api/patient/getPastAppointments",
  authenticateToken,
  getPastAppointments
);
patientRouter.get(
  "/api/patient/getFutureAppointments",
  authenticateToken,
  getFutureAppointments
);
patientRouter.get(
  "/api/patient/getAppointmentDetails",
  authenticateToken,
  getAppointmentDetails
);
patientRouter.get(
  "/api/patient/listDoctors",
  authenticateToken,
  getListDoctors
);

patientRouter.get(
  "/api/patient/listSpecialties",
  authenticateToken,
  getListSpecialties
);

patientRouter.post(
  "/api/patient/availabilityList",
  authenticateToken,
  getAvailability
);

patientRouter.post(
  "/api/patient/bookAppointment",
  authenticateToken,
  bookAppointment
);
patientRouter.put(
  "/api/patient/updateGetPatient",
  authenticateToken,
  getupdatePacient
);
patientRouter.get(
  "/api/patient/getVisualisePacient",
  authenticateToken,
  getVisualisePacient
);

module.exports = patientRouter;
