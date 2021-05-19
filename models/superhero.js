'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class superhero extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.superhero.belongsToMany(models.comicbook, { through: "appearances" });
      // define association here
    }
  };
  superhero.init({
    title: DataTypes.STRING,
    connections: DataTypes.STRING,
    appearences: DataTypes.STRING,
    series: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'superhero',
  });
  return superhero;
};