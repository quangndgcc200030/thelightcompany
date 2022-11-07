const path = require('path')
const express = require('express')
const app = express()
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const route = require('./routes')
const db = require('./config/db')
const hbs = require('handlebars')
require('dotenv').config()
const session = require('express-session');

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
    for (var i = from; i <= to; i++) {
        block.data.index = i;
        accum += block.fn(i);
    }

    return accum;
});

//Handlebars "join" block helper that supports arrays of objects or strings.  
//If "delimiter" is not speficified, then it defaults to ",".  You can use "start", 
//and "end" to do a "slice" of the array.
hbs.registerHelper('join', function (items, block) {
    var delimiter = block.hash.delimiter || ",",
        start = start = block.hash.start || 0,
        len = items ? items.length : 0,
        end = block.hash.end || len,
        out = "";

    if (end > len) end = len;

    if ('function' === typeof block) {
        for (i = start; i < end; i++) {
            if (i > start)
                out += delimiter;
            if ('string' === typeof items[i])
                out += items[i];
            else
                out += block(items[i]);
        }
        return out;
    } else {
        return [].concat(items).slice(start, end).join(delimiter);
    }
});

//use session
app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: process.env.SECRET_KEY,
    // store: new RedisStore({ client: redisClient }),
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24
    }
}))

//Auth Google
const passport = require('passport');
// var userProfile;

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});

app.use(express.static(path.join(__dirname, 'public')))

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Override method send to server
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

//Connect to DB
try {
    db.connect();
    console.log('Connect database successfully!')
} catch (error) {
    console.log('Connect database fail!')
}

app.listen(process.env.PORT || 3000, function () {
    console.log("Access at http://localhost:%d in %s mode", this.address().port, app.settings.env);
});