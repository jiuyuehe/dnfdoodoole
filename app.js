/**
 * Module dependencies.
 */

var express = require('express')
    , routes = require('./routes')
    , http = require('http')
    , path = require('path')
    , MongoStore = require('connect-mongo')(express)
    , settings = require('./settings')
    , flash = require('connect-flash');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(flash());
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());

//cookie session 配置
app.use(express.cookieParser());

app.use(express.session({
    //session 密码
    secret: settings.cookieSecret,
    key: settings.db,
    cookie: {maxAge: 1000 * 60 },//30 days
    store: new MongoStore({
        db: settings.db
    })
}));


app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/u/:user', routes.user);
app.post('/post', routes.post);
app.get('/reg', routes.reg);
app.post('/reg', routes.doreg);
app.get('/login', routes.login);
app.post('/login', routes.dologin);
app.get('/logout', routes.logout);
app.get('/uper', routes.uper);
app.post('/getCode', routes.getCode);


http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
