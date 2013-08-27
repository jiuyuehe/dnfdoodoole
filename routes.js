

var index = require('./routes/index');
var admin = require('./routes/admin');

module.exports = function(app){
    // index block
    app.get('/', index.index);
    app.get('/u/:user', index.user);
    app.post('/post', index.post);
    app.get('/reg', index.reg);
    app.post('/reg', index.doreg);
    app.get('/login', index.login);
    app.post('/login', index.dologin);
    app.get('/logout', index.logout);
    app.get('/uper', index.uper);
    app.post('/getCode', index.getCode);
}


