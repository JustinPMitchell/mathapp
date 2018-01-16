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

//todo
//delete all data bases
//delete all models
//delete all migrations

//uninstall sequelize
//reinstall sequelize

//add models and migrations on the command line
//adjust models to be the correct associations
//readd fb stuff
//db:migrate
//pray everything works

//or 2nd plan
//change models to look like old version of sequelize
//db:migrate
//pray migrations go through

//after one of the plans is done try heroku again