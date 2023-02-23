'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class classes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  classes.init({
    lesson: DataTypes.STRING,
    teacherName: DataTypes.STRING,
    studentName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'classes',
  });
  return classes;
};