const { Models } = require("../db.js");
const dayjs = require("dayjs");

// Trae citas pasadas: fecha, tiempo, tipo, diagnostico y comentario
const getPastAppointmentsService = async (DoctorId) => {
  try {
    const appointments = await Models.Appointment.findAll({
      attributes: ["date", "time", "type", "diagnostic"],
      where: {
        DoctorId: DoctorId,
      },
      include: [
        {
          model: Models.ExaMed,
          attributes: ["comment"],
          where: {
            state: 0,
          },
        },
      ],
    });

    return appointments;
  } catch (e) {
    throw new Error(e.message);
  }
};
const getFutureAppointmentsService = async (DoctorId) => {
  try {
    const appointments = await Models.Appointment.findAll({
      attributes: ["date", "time", "type", "diagnostic"],
      where: {
        DoctorId: DoctorId,
      },
      include: [
        {
          model: Models.ExaMed,
          attributes: ["comment"],
          where: {
            state: 1,
          },
        },
      ],
    });

    return appointments;
  } catch (e) {
    throw new Error(e.message);
  }
};

const getAvailabilityService = async (id) => {
  try {
    const result = await Models.Doctor.findOne({
      attributes: [
        "mondayDisponibility",
        "tuesdayDisponibility",
        "wednesdayDisponibility",
        "thursdayDisponibility",
        "fridayDisponibility",
        "saturdayDisponibility",
        "sundayDisponibility",
      ],
      where: {
        id: id,
      },
    });

    return result;
  } catch (e) {
    throw new Error(e.message);
  }
};

const Intervals = [
  "08:00 - 09:00",
  "09:00 - 10:00",
  "10:00 - 11:00",
  "11:00 - 12:00",
  "12:00 - 13:00",
  "13:00 - 14:00",
  "14:00 - 15:00",
  "15:00 - 16:00",
  "16:00 - 17:00",
  "17:00 - 18:00",
  "18:00 - 19:00",
  "19:00 - 20:00",
];

const updateAvailabilityService = async (id, body) => {
  try {
    const result = await Models.Doctor.findOne({
      where: {
        id: id,
      },
    });

    await result.update({
      mondayDisponibility: body.mondayDisponibility,
      tuesdayDisponibility: body.tuesdayDisponibility,
      wednesdayDisponibility: body.wednesdayDisponibility,
      thursdayDisponibility: body.thursdayDisponibility,
      fridayDisponibility: body.fridayDisponibility,
      saturdayDisponibility: body.saturdayDisponibility,
      sundayDisponibility: body.sundayDisponibility,
    });

    const availabilities = [
      "mondayDisponibility",
      "tuesdayDisponibility",
      "wednesdayDisponibility",
      "thursdayDisponibility",
      "fridayDisponibility",
      "saturdayDisponibility",
      "sundayDisponibility",
    ];

    await Models.Appointment.destroy({
      where: {
        DoctorId: id,
      },
    });

    availabilities.map((key, idx) => {
      const curAvailability = body[key];
      const chars = curAvailability.split("");
      const curDate = dayjs().day(idx + 1);
      chars.map(async (char, idx) => {
        const interval = Intervals[idx].split(" - ");
        const startTime = inteval[0].split(":");
        const endTime = inteval[1].split(":");
        const startDate = curDate.set('hour', parseInt(startTime[0], 10))
          .set('minute', parseInt(startTime[1], 10));
        const endDate = curDate.set('hour', parseInt(endTime[0], 10))
          .set('minute', parseInt(endTime[1], 10));
        if (char == "1") {
          await Models.Appointment.create({
            startDate: startDate,
            endDate: endDate,
            state: 0,
            intervalDigit: idx,
            DoctorId: id,
            PatientId: null,
          });
        }
      });
    });

    return result;
  } catch (e) {
    throw new Error(e.message);
  }
};

module.exports = {
  getPastAppointmentsService,
  getFutureAppointmentsService,
  getAvailabilityService,
  updateAvailabilityService,
};
