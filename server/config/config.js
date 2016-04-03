var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');
module.exports = {
    development: {
        db: 'mongodb://localhost/multivision', //specify the mongodb connction string
        rootPath: rootPath,
        port: process.env.PORT || 3040
    },
    production: {
        rootPath: rootPath,
        db: 'mongodb://kbarlow:multivision@ds011830.mlab.com:11830/multivision', //specify the mongodb connction string
        port: process.env.PORT || 80
    }
};
