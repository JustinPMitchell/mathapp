'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('problems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      question: {
        type: Sequelize.TEXT
      },
      correctanswer: {
        type: Sequelize.TEXT
      },
      incorrectanswerone: {
        type: Sequelize.TEXT
      },
      incorrectanswertwo: {
        type: Sequelize.TEXT
      },
      incorrectanswerthree: {
        type: Sequelize.TEXT
      },
      topicId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('problems');
  }
};