const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('majors', {
    major_id: {
      type: DataTypes.STRING(4),
      allowNull: false,
      primaryKey: true
    },
    major_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    head_major: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'majors',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "majors_pkey",
        unique: true,
        fields: [
          { name: "major_id" },
        ]
      },
    ]
  });
};
