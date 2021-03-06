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
    models.comicbooks.belongsTo(models.user)
    models.comicbooks.hasMany(models.reviews)
      // define association here
    }
  };
  comicbook.init({
    title: DataTypes.STRING,
    creators: DataTypes.STRING,
    digitalId: DataTypes.STRING,
    //issueNumber: DataTypes.INTEGER,
    image: DataTypes.STRING,
    description: DataTypes.TEXT,
    series: DataTypes.STRING,
    year: DataTypes.STRING,
    //superheroId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'comicbooks',
  });
  return comicbook;
};