const path = require('path')
const express = require('express')
const morgan = require('morgan')
const exphbs = require('express-handlebars')

const route = require('./routes')
const db = require('./config/db')

//Connect to DB
try {
    db.connect();
    console.log('Connect database successfully!')
} catch (error) {
    console.log('Connect database fail!')
}

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

app.listen(process.env.PORT, function () {
    console.log("Access at http://localhost:%d in %s mode", this.address().port, app.settings.env);
});