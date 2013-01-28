var express = require('express'),
    fs = require('fs'),
    im = require("imagemagick"),
    util = require('util');

var app = express();

var config = require('./config.js')(app, express);

app.get('/:id/:img', function (req, res) {
        im.convert.path = config.convert;
        var folder = config.folder + '/' + req.params.id + '/';
        var size = req.param("s");
        var orig = folder + req.params.img;
        var dest = (size)?folder + size + '.png':orig;
        fs.exists(dest, function(exists) {
            if (exists) {
                var img = fs.readFileSync(dest, 'binary');
                res.contentType("image/png");
                res.end(img, 'binary');
            } else {
                fs.exists(orig, function(oexists) {
                    if (oexists) {
                        im.resize({
                            srcPath : orig,
                            strip : false,
                            width : req.param("s"),
                            height : req.param("s") + "^",
                            customArgs: [ "-gravity", "center", "-extent", req.param("s")+ "x" + req.param("s") ]
                        }, function(err, stdout, stderr) {
                            fs.writeFileSync(dest, stdout, 'binary');
                            res.contentType("image/png");
                            res.end(stdout, 'binary');
                        });
                    } else {
                        var img = fs.readFileSync(config.folder + '/nophoto.png', 'binary');
                        res.contentType("image/png");
                        res.end(img, 'binary');
                    }
                });
            }
        });
    });

app.listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});