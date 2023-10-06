module.exports = (sequelize, Sequelize) => {
  const Doctor = sequelize.define("Doctor", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    lastName: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    identityDoc: {
      type: Sequelize.INTEGER,
    },
    nroColegiatura: {
      type: Sequelize.INTEGER,
    },
    gender: {
      type: Sequelize.STRING,
    },
    phone: {
      type: Sequelize.INTEGER,
    },
  });

  return Doctor;
};