"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Stock extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Stock.belongsTo(models.Product, { foreignKey: 'productId' });
      Stock.belongsTo(models.Shop, { foreignKey: 'shopId' });
    }
  }
  Stock.init(
    {
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      shopId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      quantityOnShelf: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
      },
      quantityInOrder: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: "Stock",
    }
  );
  return Stock;
};
