'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  student.init({
    name: DataTypes.STRING,
    surname: DataTypes.STRING,
    classNumber: DataTypes.STRING,
    class: DataTypes.STRING,
    perm: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'student',
  });
  return student;
};