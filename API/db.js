var chalk = require("chalk");
var config = require(__dirname + '/config');
var mongoose = require('mongoose');

mongoose.connect(config.database);
mongoose.connection.on('open', function () {
    console.log(chalk.green('MongoDB connection opened'), chalk.cyan(config.database));
});
mongoose.connection.on('error', function (err) {
    console.log(err);
    console.info(chalk.bold.red('Error: Could not connect to MongoDB. Did you forget to run `mongod`?'));
});

exports.mongoose = mongoose;


