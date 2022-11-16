'use strict';

module.exports = (sequelize, DataTypes) => {
  const task = sequelize.define("Tasks", {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    additionalInfo: {
      type: DataTypes.STRING,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
  });
  task.associate = function (models) {
    // associations can be defined here
  };
  return task;
};