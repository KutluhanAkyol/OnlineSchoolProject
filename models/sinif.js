'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class sinif extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  sinif.init({
    className: DataTypes.STRING,
    lessonName: DataTypes.STRING,
    teacherName: DataTypes.STRING,
    studentName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'sinif',
  });
  return sinif;
};