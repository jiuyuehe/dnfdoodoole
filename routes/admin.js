var crypto = require('crypto')
    , UserDao = require("../dao/user_dao")
    , User = require("../models/user")
    , flash = require('connect-flash');

exports.toadmin = function (req, res) {
    res.render('manager/admin_login', { title: 'this is admin Express' });
};

exports.admin_login = function (req, res) {

    console.log(req.body.password);
    var md5 = crypto.createHash('md5'),
        password = md5.update(req.body.password).digest('hex');
    UserDao.findUserByEmail(req.body.email, function (err, user) {
        if (!user) {
            res.send({"error": "用户不存在!"});
            return;
        }
        //检查密码是否一致
        if (user.password != password) {
            res.send({"error": "密码错误"});
            return;
        }

        console.log("user.role:"+user.role);

        if (user.role === "com") {
            res.send({"error": "您不是管理员，无法进入！"});
            return;
        }
        //用户名密码都匹配后，将用户信息存入 session

        console.log("进入这里了");

        req.session.user = user;
        res.send({"success": "登录成功"});
       //res.redirect('/admin/main');
//        res.render('manager/main', {
//            title: '欢迎您进入管理员后台',
//            userName: req.session.user.niname
//        });
        console.log("login end")
    });

};

exports.adminMain = function (req, res) {
    console.log("你到那里了");
    res.render('manager/main', {
        title: 'this is main Express',
        userName: req.session.user.niname
    });

    console.log("main end")

};

exports.admin_logout = function (req, res) {
    res.render('admin', { title: 'this is admin Express' });
};
exports.checkRole = function (req, res, next) {

    console.log("默认调用checkRole 方法"+"next :"+next);

    if(req.session.user){
        var role = req.session.user.role;
        if(role ==="com"){
            res.send({"error":"非法操作错误"});
            return;
        }
        next();
    } else{
        res.redirect("/admin_mgr");
    }
};

exports.userList = function (req, res) {
    res.render('admin', { title: 'this is userList Express' });
};
exports.weaponList = function (req, res) {
    res.render('admin', { title: 'this is weaponList Express' });
};

