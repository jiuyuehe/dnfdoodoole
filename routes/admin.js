var crypto = require('crypto')
    , UserDao = require("../dao/user_dao")
    , User = require("../models/user")
    , flash = require('connect-flash');

exports.toadmin = function (req, res) {
    res.render('manager/admin_login', { title: 'doodoole' });
};

exports.admin_login = function (req, res) {

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

        if (user.role === "com") {
            res.send({"error": "您不是管理员，无法进入！"});
            return;
        }
        //用户名密码都匹配后，将用户信息存入 session
        req.session.user = user;
        res.send({"success": "登录成功"});
        console.log("login end")
    });

};

exports.adminMain = function (req, res) {
    UserDao.forAll(function (err, userList) {
        if (!userList) {
            res.send({"error": "查询用户出现数据库系统错误！"});
            return;
        }

        res.render('manager/main', {
            title: '用户管理板块',
            userName: req.session.user.niname,
            userList: userList
        });
    });

};


exports.admin_logout = function (req, res) {
    res.render('admin', { title: 'this is admin Express' });
};

exports.checkRole = function (req, res, next) {

    console.log("默认调用checkRole 方法" + "next :" + next);

    if (req.session.user) {
        var role = req.session.user.role;
        if (role === "com") {
            res.send({"error": "非法操作错误"});
            return;
        }
        next();
    } else {
        res.redirect("/admin_mgr");
    }
};


exports.userList = function (req, res) {
    res.render('admin', { title: 'this is userList Express' });
};


exports.weaponList = function (req, res) {
    res.render('admin', { title: 'this is weaponList Express' });
};

