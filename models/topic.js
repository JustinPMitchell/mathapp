'use strict';
module.exports = (sequelize, DataTypes) => {
  var topic = sequelize.define('topic', {
    title: DataTypes.STRING,
    keyword: DataTypes.STRING,
    url: DataTypes.STRING,
    userId: DataTypes.INTEGER
  });
  topic.associate = function(models) {
    models.topic.hasMany(models.problem);
  }
  return topic;
};