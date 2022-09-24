const path = require('path')
const express = require('express')
const morgan = require('morgan')
const exphbs = require('express-handlebars')

const route = require('./routes')
const db = require('./config/db')

const hbs = require('handlebars')
hbs.registerHelper('dateFormat', require('handlebars-dateformat'));
const app = express()

app.use(express.static(path.join(__dirname, 'public')))

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// HTTP logger
app.use(morgan('combined'))

// Templete engine
app.engine('hbs', exphbs.engine({
    extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

//Routes init
route(app)

let port = process.env.PORT
app.listen(port, function () {
    console.log("Access at http://localhost:%d in %s mode", this.address().port, app.settings.env);
});

//Connect to DB
try {
    db.connect();
    console.log('connect successfully!')
} catch (error) {
    console.log('connect fail!')
}