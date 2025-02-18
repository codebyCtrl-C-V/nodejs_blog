const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database'); 

const News = sequelize.define('News', {
  // Định nghĩa các thuộc tính của model
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'news',
  timestamps: true, // Thêm các trường createdAt và updatedAt
});

module.exports = News;
