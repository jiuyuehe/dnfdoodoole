var index = require('./routes/index');
var admin = require('./routes/admin');

module.exports = function (app) {
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

    //admin block

    app.get('/admin_mgr', admin.toadmin);
    app.post('/admin_login', admin.admin_login);
    app.get('/admin_logout', admin.admin_logout);
    app.get('/admin/*',admin.checkRole);
    app.get('/admin/userList', admin.userList);
    app.get('/admin/weaponList', admin.weaponList);

}


