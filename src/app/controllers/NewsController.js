const News = require('../models/News');
const path = require('path');
const fs = require('fs'); 

class NewsController {
  //[get] /news
  index(req, res) {
    res.render('news');
  }

  //[get] /news/:slug
  show(req, res) {
    (async () => {
      try {
        const news = await News.findOne({
          where: { id: req.params.slug }
        });
        const newsData = news.toJSON();
        res.render('news/show', {
          ...newsData
        });
      } catch (error) {
        console.error('Lỗi khi truy xuất dữ liệu:', error);
      }
    })();
  }

  //[get] /news/create
  create(req, res) {
    res.render('news/create');
  }

  //[post] /news/upload
  upload(req, res) {
    (async () => {
      try {
        const { title, content } = req.body;
        const imagePath = req.file ? `/uploads/${req.file.filename}` : null; // Lưu đường dẫn file
    
        await News.create({
          title,
          content,
          image: imagePath
        });

        res.redirect('/'); 
      } catch (error) {
        console.error('Lỗi khi lưu tin tức:', error);
        res.status(500).send('Lỗi server');
      }
    })();
  }

  // [GET] /news/update/:slug - Hiển thị form cập nhật
  async edit(req, res) {
    try {
      const news = await News.findByPk(req.params.id); // Tìm bài viết theo ID
      if (!news) {
        return res.status(404).send('Tin tức không tồn tại');
      }
      res.render('news/update', { news: news.toJSON() }); // Gửi dữ liệu đến view
    } catch (error) {
      console.error('Lỗi khi lấy tin tức:', error);
      res.status(500).send('Lỗi server');
    }
  }

  // [POST] /news/update/:id - Xử lý cập nhật dữ liệu
  async update(req, res) {
    try {
      const { title, content } = req.body;
      const news = await News.findByPk(req.params.id);

      if (!news) {
        return res.status(404).send('Tin tức không tồn tại');
      }

      // Nếu có file ảnh mới, cập nhật đường dẫn ảnh
      let imagePath = news.image; // Mặc định giữ nguyên ảnh cũ
      if (req.file) {
      
        // Xóa ảnh cũ nếu có
        const oldImagePath = path.join(__dirname, '../../resources', news.image);
        if (news.image && fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      
        // Cập nhật đường dẫn ảnh mới
        imagePath = `/uploads/${req.file.filename}`;
      }

      // Cập nhật thông tin
      news.title = title;
      news.content = content;
      news.image = imagePath;

      await news.save(); // Lưu vào DB
      res.redirect('/'); // Quay về trang chủ sau khi cập nhật
    } catch (error) {
      console.error('Lỗi khi cập nhật tin tức:', error);
      res.status(500).send('Lỗi server');
    }
  }

  // [DELETE] /news/delete/:id
  async delete(req, res) {
    try {
      const news = await News.findByPk(req.params.id);
      if (!news) {
        return res.status(404).json({ success: false, message: "Bài viết không tồn tại" });
      }

      // Xóa ảnh nếu có
      if (news.image) {
        const imagePath = path.join(__dirname, '../../resources', news.image);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }

      // Xóa bài viết trong database
      await News.destroy({ where: { id: req.params.id } });

      res.json({ success: true });
    } catch (error) {
      console.error('Lỗi khi xóa bài viết:', error);
      res.status(500).json({ success: false, message: "Lỗi server" });
    }
  }

}

module.exports = new NewsController();
