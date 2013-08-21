/*
 * GET home page.
 */

var crypto = require('crypto')
    , User = require('../models/user.js')
    , flash = require('connect-flash') ;



exports.getCode = function (req, res) {
    var items = 'abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPRSTUVWXYZ23456789'.split(''),
        vcode = '',
        textColors = ['#FD0', '#6c0', '#09F', '#f30', '#aaa', '#3cc', '#cc0', '#A020F0', '#FFA500', '#A52A2A', '#8B6914', '#FFC0CB', '#90EE90'];

    for (var i = 0; i < 4; i++) {
        var rnd = Math.random();
        var item = Math.round(rnd * (items.length - 1));
        vcode += items[item];
    }
          console.log("vcode:"+vcode);
    req.session.verifycode = vcode.toLowerCase();

   // res.writeHead(200, { 'Content-Type': 'text/html', 'Content-Length': vcode.length });
    res.write("<h1>"+vcode+"</h1>");

//    canvas.toBuffer(function(err, buf){
//
//        res.end(buf);
//    });
};

exports.index = function (req, res) {
    res.render('index2', { title: 'doodoole' });
};

exports.uper = function (req, res) {
    res.render('uper', { title: '强化' });
};

exports.user = function (req, res) {
};
exports.post = function (req, res) {
};

exports.reg = function (req, res) {

};

// 注册
exports.doreg = function (req, res) {
    var name = req.body.name,
        password = req.body.password,
        password_re = req.body['password-repeat'];
    //检验用户两次输入的密码是否一致
    if(password_re != password){
        req.flash('error','两次输入的密码不一致!');
       // return res.redirect('/reg');
       // res.setHeader("status", "200");
        res.send(200);
        return ;
    }
    //生成密码的散列值
    var md5 = crypto.createHash('md5'),
        password = md5.update(req.body.password).digest('hex');
    var newUser = new User({
        name: req.body.name,
        password: password,
        email: req.body.email
    });
    //检查用户名是否已经存在
    User.get(newUser.name, function(err, user){
        if(user){
            err = '用户已存在!';
        }
        if(err){
            req.flash('error', err);
            return res.redirect('/reg');
        }
        //如果不存在则新增用户
        newUser.save(function(err){
            if(err){
                req.flash('error',err);
                return res.redirect('/reg');
            }
            req.session.user = newUser;//用户信息存入session
            req.flash('success','注册成功!');
            res.redirect('/');
        });
    });
};


exports.login = function (req, res) {
};
exports.dologin = function (req, res) {
};
exports.logout = function (req, res) {
};
