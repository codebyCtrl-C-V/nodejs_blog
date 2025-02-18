const multer = require('multer');
const path = require('path');

// Cấu hình nơi lưu trữ file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/resources/uploads'); // Lưu file vào thư mục này
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Đổi tên file để tránh trùng lặp
  }
});

// Middleware upload
const upload = multer({ storage: storage });

module.exports = upload;
