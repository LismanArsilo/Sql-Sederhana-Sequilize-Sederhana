var DataTypes = require("sequelize").DataTypes;
var _courses = require("./courses");
var _majors = require("./majors");
var _students = require("./students");
var _teachers = require("./teachers");

function initModels(sequelize) {
  var courses = _courses(sequelize, DataTypes);
  var majors = _majors(sequelize, DataTypes);
  var students = _students(sequelize, DataTypes);
  var teachers = _teachers(sequelize, DataTypes);

  teachers.belongsTo(courses, { as: "course", foreignKey: "course_id"});
  courses.hasMany(teachers, { as: "teachers", foreignKey: "course_id"});
  students.belongsTo(majors, { as: "major", foreignKey: "major_id"});
  majors.hasMany(students, { as: "students", foreignKey: "major_id"});
  students.belongsTo(teachers, { as: "teacher", foreignKey: "teacher_id"});
  teachers.hasMany(students, { as: "students", foreignKey: "teacher_id"});

  return {
    courses,
    majors,
    students,
    teachers,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
