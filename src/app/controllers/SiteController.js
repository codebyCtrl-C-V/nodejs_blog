const News = require('../models/News');

class SiteController {
    //[get] /
    home(req, res) {
       
        (async () => {
            try {
              const news = await News.findAll();
              const newsData = news.map(item => item.toJSON());
              res.render('home', {
                news: newsData
              });
            
            } catch (error) {
              console.error('Lỗi khi truy xuất dữ liệu:', error);
            }
          })();
    }

    //[get] /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
