'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comicbook extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.comicbook.belongsToMany(models.user, { through: "collection" });
      models.comicbook.belongsToMany(models.superhero, {through: "appearances"});
      // define association here
    }
  };
  comicbook.init({
    title: DataTypes.STRING,
    creators: DataTypes.STRING,
    issueNumber: DataTypes.INTEGER,
    image: DataTypes.STRING,
    description: DataTypes.STRING,
    series: DataTypes.STRING,
    //superheroId: DataTypes.INTEGER,
    //userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'comicbook',
  });
  return comicbook;
};