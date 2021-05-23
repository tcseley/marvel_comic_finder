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
      models.comicbooks.belongsToMany(models.user, { through: "collection" });
      models.comicbooks.belongsToMany(models.superhero, {through: "appearances"});
      // define association here
    }
  };
  comicbook.init({
    title: DataTypes.STRING,
    //creators: DataTypes.STRING,
    //issueNumber: DataTypes.INTEGER,
    image: DataTypes.STRING,
    description: DataTypes.TEXT,
    //series: DataTypes.STRING,
    //year: DataTypes.INTEGER
    //superheroId: DataTypes.INTEGER,
    //userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'comicbooks',
  });
  return comicbook;
};