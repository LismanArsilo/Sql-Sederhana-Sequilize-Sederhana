import Sequelize from "sequelize";
import config from "../../config/config";

const sequelize = new Sequelize(
  config.db_name,
  config.db_username,
  config.db_password,
  {
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

const DataTypes = require("sequelize").DataTypes;
const _courses = require("./courses");
const _majors = require("./majors");
const _students = require("./students");
const _teachers = require("./teachers");

function initModels(sequelize) {
  const courses = _courses(sequelize, DataTypes);
  const majors = _majors(sequelize, DataTypes);
  const students = _students(sequelize, DataTypes);
  const teachers = _teachers(sequelize, DataTypes);

  teachers.belongsTo(courses, { as: "course", foreignKey: "course_id" });
  courses.hasMany(teachers, { as: "teachers", foreignKey: "course_id" });
  students.belongsTo(majors, { as: "major", foreignKey: "major_id" });
  majors.hasMany(students, { as: "students", foreignKey: "major_id" });
  students.belongsTo(teachers, { as: "teacher", foreignKey: "teacher_id" });
  teachers.hasMany(students, { as: "students", foreignKey: "teacher_id" });

  return {
    courses,
    majors,
    students,
    teachers,
  };
}

const models = initModels(sequelize);
export default models;
export { sequelize };

// module.exports = initModels;
// module.exports.initModels = initModels;
// module.exports.default = initModels;
