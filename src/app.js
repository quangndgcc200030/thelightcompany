const path = require('path')
const express = require('express')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const session = require('express-session');

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
hbs.registerHelper('ifCond', function (v1, operator, v2, options) {
    switch (operator) {
        case '==':
            return (v1 == v2) ? options.fn(this) : options.inverse(this);
        case '===':
            return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '!=':
            return (v1 != v2) ? options.fn(this) : options.inverse(this);
        case '!==':
            return (v1 !== v2) ? options.fn(this) : options.inverse(this);
        case '<':
            return (v1 < v2) ? options.fn(this) : options.inverse(this);
        case '<=':
            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
        case '>':
            return (v1 > v2) ? options.fn(this) : options.inverse(this);
        case '>=':
            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
        case '&&':
            return (v1 && v2) ? options.fn(this) : options.inverse(this);
        case '||':
            return (v1 || v2) ? options.fn(this) : options.inverse(this);
        default:
            return options.inverse(this);
    }
});
hbs.registerHelper('times', function (from, to, block) {
    var accum = '';
    for (var i = from; i <= to; i++)
        accum += block.fn(i);
    return accum;
});
const app = express()

//use session
app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 5 * 60 * 1000
    }
}))

app.use(express.static(path.join(__dirname, 'public')))

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(methodOverride('_method'))

// HTTP logger
app.use(morgan('combined'))

// Templete engine
app.engine('hbs', exphbs.engine({
    extname: '.hbs',
    helpers: {
        sum: (a, b) => a + b,
    }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

//Routes init
route(app)

app.listen(process.env.PORT || 3000, function () {
    console.log("Access at http://localhost:%d in %s mode", this.address().port, app.settings.env);
});