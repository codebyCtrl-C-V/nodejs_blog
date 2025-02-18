const sequelize = require('./database');
const News = require('../app/models/News');

(async () => {
  try {
    await sequelize.sync({ force: true }); // Dùng `{ force: true }` để reset bảng (xóa và tạo lại)
    console.log('Model đã được đồng bộ thành công.');
  } catch (error) {
    console.error('Đồng bộ model thất bại:', error);
  } finally {
    await sequelize.close();
  }
})();
