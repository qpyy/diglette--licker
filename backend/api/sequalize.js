const { Sequelize, DataTypes } = require('sequelize');

// Создаём подключение к базе данных
const sequelize = new Sequelize('postgresql://postgres:Edega2003@host.docker.internal:5432/clicker');

const Users = sequelize.define(
  'Users',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    login: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    refresh_token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    access_token: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    coins: {
      type: DataTypes.INTEGER
    },
  }, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
}
);

// Позже добавить администратора

// Синхронизация модели с базой данных
(async () => {
  try {
    await Users.sync({ force: false }); // Синхронизируем модель users
    await sequelize.authenticate();
    console.log('Соединение с БД было успешно установлено');
  } catch (e) {
    console.log('Невозможно выполнить подключение к БД: ', e);
  }
})();

module.exports = {
  sequelize,
  Users
};