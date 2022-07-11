const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('courses', {
    course_id: {
      type: DataTypes.STRING(4),
      allowNull: false,
      primaryKey: true
    },
    course_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    sks: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'courses',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "courses_pkey",
        unique: true,
        fields: [
          { name: "course_id" },
        ]
      },
    ]
  });
};
