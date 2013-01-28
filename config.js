module.exports = function(app, express) {
    this.folder = '/opt/images';
    this.convert = '/opt/local/bin/convert';
    var config = this;
    
    app.configure(function () {
        app.set('port', 8081);
        app.use(express.logger('tiny'));  /* 'default', 'short', 'tiny', 'dev' */
        app.use(express.bodyParser());
    });
    
    return config;
};