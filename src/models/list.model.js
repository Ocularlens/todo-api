const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class ListModel extends Model {}

  ListModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      timestamps: true,
      paranoid: true,
    }
  );

  return ListModel;
};
