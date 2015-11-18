/**
 * DEPENDANCIES
 */
var _ = require('lodash'),
    async = require('async'),
    bcrypt = require('bcrypt-nodejs'),
    bodyParser = require('body-parser'),
    chalk = require("chalk"),
    compression = require('compression'),
    errorHandler = require('errorhandler'),
    express = require("express"),
    favicon = require('serve-favicon'),
    fs = require('fs'),
    http = require('http'),
    nodemailer = require('nodemailer'),
    morgan = require('morgan'),
    multer = require('multer'),
    path = require('path'),
    request = require('request'),
    socket = require('socket.io'),
    validator = require('validator');


/**
 * CONFIG
 **/
var config = require(__dirname + '/config');

/**
 * PASSPORT
 */
var passport = require(__dirname + "/config/passport.js").passport;

/**
 * Connect to database
 */
var db = require(__dirname + "/db.js");

/**
 * MODULES
 **/
var modules = {
    _: _,
    async: async,
    bcrypt: bcrypt,
    nodemailer: nodemailer,
    passport: passport,
    validator: validator
};

/**
 * MODELS
 **/
var models = {};
try {
    fs.readdirSync(path.join(__dirname, '/api/')).forEach(function (dir) {
        var path = './api/' + dir + "/" + dir + '.model.js';
        if (fs.existsSync(path)) {
            // Uppercase first letter of model (ex: User.find() instead of user.find())
            var modelName = dir.charAt(0).toUpperCase() + dir.slice(1);
            // Load the models
            models[modelName] = require(path);
        }
    });
} catch (err) {
    console.error(err);
}

/**
 * EXPRESS
 **/
var app = express();

// Set port
app.set('port', config.port);
// Compress
app.use(compression());
// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Static files
app.use(express.static(path.join(__dirname, '/../client/')));
// Router
var router = express.Router();
// Prefix all of our routes will be prefixed with /api
app.use('/api', router);
// Passport
app.use(passport.initialize());
app.use(passport.session());

// Multipart form (for file upload)
app.use(multer({
    dest: config.tmpDirectory
}).single('photo'));

/**
 * LOGGER
 */
if (config.debug) {
    app.all("*", function (req, res, next) {
        var start = new Date();
        next();
        var ms = new Date() - start;
        var status = res.statusCode || 404;
        console.log('%s %s - %s', chalk.green(req.method), req.url, chalk.cyan(status), ms < 1000 ? ms + 'ms' : ms + 's');
    });
} else {
    app.use(morgan('combined', {}));
    app.use(errorHandler());
}

/**
 * MIDDLEWARES
 **/

var middlewares = {};
try {
    fs.readdirSync(path.join(__dirname, '/api/middleware')).forEach(function (name) {
        if (name != '.DS_Store') {
            // load middleware
            var middleware = require('./api/middleware/' + name)(app, config, models, modules);
            if (typeof middleware !== 'function') {
                _.extend(middlewares, middleware);
            } else {
                app.all("*", middleware);
                router.use(middleware);
            }
        }
    });
} catch (err) {
    console.error(err);
}

/**
 * CONTROLLERS
 **/
var controllers = {};
try {
    fs.readdirSync(path.join(__dirname, '/api/')).forEach(function (dir) {
        if (dir != '.DS_Store') {
            var path = __dirname + '/api/' + dir + '/' + dir + '.controller.js';
            if (fs.existsSync(path)) {
                // load controllers
                var controller = require(path)(app, router, config, modules, models, middlewares);
                _.extend(controllers, controller);
            }
        }
    });
} catch (err) {
    console.error(err);
}

/**
 * CREATE STORAGE DIR
 **/
async.series([
    // Create data if it doesn't exists
    function (callback) {
        fs.mkdir(__dirname + '/data/', function (error) {
            if (!error || error.code == 'EEXIST') return callback(null);
            return callback(error);
        });
    },
    // Create .tmp, pictures and thumbnails folders if they do not exist
    function (callback) {
        async.parallel([
            function (callbackSub) {
                fs.mkdir(__dirname + '/data/.tmp', function (error) {
                    if (!error || error.code == 'EEXIST') return callbackSub(null);
                    return callbackSub(error);
                });
            },
            function (callbackSub) {
                fs.mkdir(__dirname + '/data/pictures', function (error) {
                    if (!error || error.code == 'EEXIST') return callbackSub(null);
                    return callbackSub(error);
                });
            },
            function (callbackSub) {
                fs.mkdir(__dirname + '/data/thumbnails', function (error) {
                    if (!error || error.code == 'EEXIST') return callbackSub(null);
                    return callbackSub(error);
                });
            }
            // Throw an error if there was one during the creation of subfolders
        ], function (error) {
            if (error) return callback(error);
            return callback(null);
        });
    },
    // Empty the tmp folder
    function (callback) {
        fs.readdir(config.tmpDirectory, function (error, files) {
            files.forEach(function (file) {
                fs.unlink(config.tmpDirectory + '/' + file, function (error) {
                    return callback(error);
                });
            });
        });
    }
    // Log the error if there is one
], function (error, results) {
    if (error) return console.log(error);
});

/**
 * Socket.io
 */
var server = http.createServer(app);

var io = socket(server);
var onlineUsers = 0;

io.sockets.on('connection', function (socket) {
    onlineUsers++;

    io.sockets.emit('onlineUsers', { onlineUsers: onlineUsers });

    socket.on('disconnect', function () {
        onlineUsers--;
        io.sockets.emit('onlineUsers', { onlineUsers: onlineUsers });
    });
});

/**
 * Start
 */
server.listen(app.get('port'), function () {
    middlewares.getRoute();
    console.log(chalk.bold.yellow('          ***** Things *****'));
    console.log(chalk.green('Start time: '), chalk.cyan(new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')));
    console.log(chalk.green('Environement:'), chalk.cyan(config.env));
    console.log(chalk.green('The server is listening on '), config.address + ":" + chalk.cyan(app.get('port')));
});