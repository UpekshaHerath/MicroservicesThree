module.exports = (sequelize, DataTypes) => {
  const Orders = sequelize.define(
    "Orders",
    {
      order_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      // userid: {
      //   type: DataTypes.INTEGER,
      // },
      // productid: {
      //   type: DataTypes.INTEGER,
      // },
      weight: {
        type: DataTypes.FLOAT,
      },
      price: {
        type: DataTypes.FLOAT,
      },
      order_status: {
        type: DataTypes.ENUM("placed", "shipped", "delivered", "cancelled"),
      },
    },
    {
      timestamps: true,
    }
  );

  return Orders;
};
