const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const path = require('path');
const app = express();
const port = 3000;

const route = require('./routes');
const db = require('./config/database')

//connect db
db.Sequelize;

// app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'resources/uploads')));

app.use(express.urlencoded({ extended: true }));

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

//http logger
app.use(morgan('combined'));

//template engine
app.engine(
    'hbs',
    engine({
        extname: '.hbs',
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

//route init
route(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
