'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.changeColumn('Tasks', 'title', {
          type: Sequelize.STRING,
          allowNull: false,
        }, { transaction: t }),
        queryInterface.changeColumn('Tasks', 'completed', {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        }, { transaction: t })
      ]);
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.changeColumn('Tasks', 'title', { transaction: t }),
        queryInterface.changeColumn('Tasks', 'completed', { transaction: t })
      ]);
    });
  }
};
