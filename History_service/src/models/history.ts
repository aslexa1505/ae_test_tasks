// src/models/history.ts
'use strict';
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class History extends Model {
  public id!: number;
  public shopId!: number;
  public plu!: string;
  public action!: string;
  public timestamp!: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

History.init(
  {
    shopId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    plu: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    action: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'History',
    tableName: 'Histories',
  }
);

export default History;
