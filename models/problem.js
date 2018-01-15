'use strict';
module.exports = (sequelize, DataTypes) => {
  var problem = sequelize.define('problem', {
    question: DataTypes.TEXT,
    correctanswer: DataTypes.TEXT,
    incorrectanswerone: DataTypes.TEXT,
    incorrectanswertwo: DataTypes.TEXT,
    incorrectanswerthree: DataTypes.TEXT,
    topicId: DataTypes.INTEGER
  });
  problem.associate = function(models) {
    models.problem.belongsTo(models.topic);
  }
  return problem;
};