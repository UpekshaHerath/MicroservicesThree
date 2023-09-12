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
      user_id: {
        type: DataTypes.STRING, // this is the NIC of user
        allowNull: false,
      },
      product_id: {
        type: DataTypes.INTEGER, // just a integer
        allowNull: false,
      },
      weight: {
        type: DataTypes.FLOAT,
      },
      price: {
        type: DataTypes.FLOAT,
      },
      order_status: {
        type: DataTypes.ENUM("placed", "shipped", "delivered", "cancelled"),
      },
      item_count: {
        type: DataTypes.INTEGER,
      }
    },
    {
      timestamps: true,
    }
  );

  return Orders;
};
