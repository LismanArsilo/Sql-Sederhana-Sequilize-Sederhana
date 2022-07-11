const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('students', {
    student_id: {
      type: DataTypes.STRING(4),
      allowNull: false,
      primaryKey: true
    },
    first_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    phone_number: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    teacher_id: {
      type: DataTypes.STRING(4),
      allowNull: false,
      references: {
        model: 'teachers',
        key: 'teacher_id'
      }
    },
    major_id: {
      type: DataTypes.STRING(4),
      allowNull: false,
      references: {
        model: 'majors',
        key: 'major_id'
      }
    },
    student_profile: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'students',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "students_pkey",
        unique: true,
        fields: [
          { name: "student_id" },
        ]
      },
    ]
  });
};
