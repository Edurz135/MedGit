const { Models } = require("../db.js");
const {
  createAppointmentsService,
} = require("../stored_procedures/weeklyTransactions.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const registerPatientService = async (body) => {
  try {
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const identityDoc = parseInt(body.identityDoc);

    const patient = await Models.Patient.create({
      name: body.name,
      lastName: body.lastName,
      email: body.email,
      password: hashedPassword,
      identityDoc: identityDoc,
      gender: body.gender,
      phone: 0,
    });
    return patient;
  } catch (e) {
    throw Error("Error while creating User: " + e);
  }
};

const registerDoctorService = async (body) => {
  try {
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const identityDoc = parseInt(body.identityDoc);
    const nroColegiatura = parseInt(body.nroColegiatura);
    const SpecialtyId = parseInt(body.specialtyId) || 0;

    const doctor = await Models.Doctor.create({
      name: body.name,
      lastName: body.lastName,
      email: body.email,
      password: hashedPassword,
      identityDoc: identityDoc,
      nroColegitura: nroColegiatura,
      gender: body.gender,
      phone: 999999999,
      SpecialtyId: SpecialtyId,
      mondayDisponibility: "001110110000",
      tuesdayDisponibility: "001110110000",
      wednesdayDisponibility: "001110110000",
      thursdayDisponibility: "001110110000",
      fridayDisponibility: "001110110000",
      saturdayDisponibility: "001110000000",
      sundayDisponibility: "001110000000",
    });

    // asdf
    await createAppointmentsService(doctor.id);

    return doctor;
  } catch (e) {
    throw Error("Error while creating User: " + e);
  }
};

const registerLabAnalystService = async (body) => {
  try {
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const identityDoc = parseInt(body.identityDoc);
    const nroColegiatura = parseInt(body.nroColegiatura);

    const LabAnalyst = await Models.LabAnalyst.create({
      name: body.name,
      lastName: body.lastName,
      email: body.email,
      password: hashedPassword,
      identityDoc: identityDoc,
      nroColegitura: nroColegiatura,
      gender: body.gender,
      phone: 0,
    }).then(async (nuevoLab) => {
      const idNuevalab = nuevoLab.dataValues.id;
      for (let index = 1; index < 21; index++) {
        await Models.TipExMedLabAnalyst.create({
          LabAnalystId: idNuevalab,
          TipExMedId: index,
        });
      }
    })

    return LabAnalyst;
  } catch (e) {
    throw Error("Error while creating User: " + e);
  }
};

const loginPatientService = async (email, password) => {
  try {
    const patient = await getPatientService(email);
    const match = await bcrypt.compare(password, patient.dataValues.password);
    if (!match) throw new Error("Invalid credentials");

    const accessToken = await jwt.sign(
      JSON.stringify(patient),
      process.env.TOKEN_SECRET
    );
    return "Bearer " + accessToken;
  } catch (e) {
    throw Error("Error while finding a User");
  }
};

const loginDoctorService = async (email, password) => {
  try {
    const doctor = await getDoctorService(email);
    const match = await bcrypt.compare(password, doctor.dataValues.password);
    if (!match) throw new Error("Invalid credentials");

    const accessToken = await jwt.sign(
      JSON.stringify(doctor),
      process.env.TOKEN_SECRET
    );
    return "Bearer " + accessToken;
  } catch (e) {
    throw Error("Error while finding a User");
  }
};

const loginLabAnalystService = async (email, password) => {
  try {
    const labAnalyst = await getLabAnalystService(email);
    const match = await bcrypt.compare(
      password,
      labAnalyst.dataValues.password
    );
    if (!match) throw new Error("Invalid credentials");

    const accessToken = await jwt.sign(
      JSON.stringify(labAnalyst),
      process.env.TOKEN_SECRET
    );
    return "Bearer " + accessToken;
  } catch (e) {
    throw Error("Error while finding a User");
  }
};

const loginAdministratorService = async (email, password) => {
  try {
    const admin = await getAdministratorService(email);
    const match = await bcrypt.compare(password, admin.dataValues.password);
    if (!match) throw new Error("Invalid credentials");

    const accessToken = await jwt.sign(
      JSON.stringify(admin),
      process.env.TOKEN_SECRET
    );
    return "Bearer " + accessToken;
  } catch (e) {
    throw Error("Error while finding an administrator. Error: " + e);
  }
};

const getPatientService = async (email) => {
  try {
    const patient = await Models.Patient.findOne({
      where: { email: email },
    });
    return patient;
  } catch (e) {
    throw Error("Error while finding a Patient");
  }
};

const getDoctorService = async (email) => {
  try {
    const doctor = await Models.Doctor.findOne({
      where: { email: email },
    });
    return doctor;
  } catch (e) {
    throw Error("Error while finding a Doctor");
  }
};

const getLabAnalystService = async (email) => {
  try {
    const labAnalyst = await Models.LabAnalyst.findOne({
      where: { email: email },
    });
    return labAnalyst;
  } catch (e) {
    throw Error("Error while finding a LabAnalyst");
  }
};

const getAdministratorService = async (email) => {
  try {
    const admin = await Models.Administrator.findOne({
      where: { email: email },
    });
    return admin;
  } catch (e) {
    throw Error("Error while finding an admin. Error: " + e);
  }
};

module.exports = {
  registerPatientService,
  registerDoctorService,
  registerLabAnalystService,
  getPatientService,
  getDoctorService,
  getLabAnalystService,
  loginPatientService,
  loginDoctorService,
  loginLabAnalystService,
  loginAdministratorService,
};
