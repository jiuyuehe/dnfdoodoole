/*
 * GET home page, register,login ,logout
 */

var crypto = require('crypto')
    , UserDao = require("../dao/user_dao")
    , User = require("../models/user")
    , flash = require('connect-flash');


exports.getCode = function (req, res) {
    var items = 'abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPRSTUVWXYZ23456789'.split(''),
        vcode = '',
        textColors = ['#FD0', '#6c0', '#09F', '#f30', '#aaa', '#3cc', '#cc0', '#A020F0', '#FFA500', '#A52A2A', '#8B6914', '#FFC0CB', '#90EE90'];

    for (var i = 0; i < 4; i++) {
        var rnd = Math.random();
        var item = Math.round(rnd * (items.length - 1));
        vcode += items[item];
    }
    req.session.verifycode = vcode.toLowerCase();
    res.send({ "vcode": vcode });
};

exports.index = function (req, res) {
    res.render('index', {
        title: 'doodoole',
        user: req.session.user,
        success: req.flash('success').toString(),
        error: req.flash('error').toString()
    });

};

exports.uper = function (req, res) {
    res.render('uper', {
        title: '强化',
        user: req.session.user
    });
};

exports.user = function (req, res) {
};
exports.post = function (req, res) {
};

exports.reg = function (req, res) {

};

// 注册
exports.doreg = function (req, res) {
    var niname = req.body.niname,
        password = req.body.password,
        password_re = req.body['password_re'],
        code = req.body.code;
    console.log("param:" + niname + password + password_re + code);

    if (code.toLowerCase() != req.session.verifycode) {
        res.send({"error": "验证码错误"});
        return;
    }

    //检验用户两次输入的密码是否一致
    if (password_re != password) {
        // req.flash('error', '两次输入的密码不一致!');
        res.send({"error": "两次输入的密码不一致!"});
        return;
    }
    //生成密码的散列值
    var md5 = crypto.createHash('md5');
    var real_password = md5.update(req.body.password).digest('hex');

    var newUser = new User({
        niname: niname,
        password: real_password,
        email: req.body.email
    });

    console.log("检查用户");


    //检查用户名是否已经存在

    UserDao.findUserByNiName(newUser.niname, function (err, user) {
        if (user) {
            err = '用户已存在!';
        }
        if (err) {
            res.send({'error': err});
            //return res.redirect('/reg');
            return;
        }

        console.log("新增用户");
        //如果不存在则新增用户
    });

    UserDao.addUnder(newUser, function (err) {
        if (err) {
            res.send({"error": err});
            return;
        }
        req.session.user = newUser;//用户信息存入session
        res.send({"success": "注册成功！"});
    });
};

exports.login = function (req, res) {

};

exports.dologin = function (req, res) {
    //生成密码的散列值
    var md5 = crypto.createHash('md5'),
        password = md5.update(req.body.password).digest('hex');

    //检查用户是否存在
    UserDao.findUserByEmail(req.body.email, function (err, user) {
        if (!user) {
            res.send({"error": "用户不存在"});
            return;
        }
        //检查密码是否一致
        if (user.password != password) {
            res.send({"error": "密码错误"});
            return;
        }
        //用户名密码都匹配后，将用户信息存入 session
        req.session.user = user;
        res.send({"success": "登录成功"});
        //res.redirect('/');
    });
};


exports.logout = function (req, res) {
    req.session.user = null;
    //  req.flash('success', '登出成功!');
    res.redirect('/');
};
