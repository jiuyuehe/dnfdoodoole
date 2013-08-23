var mongodb = require('./mongodb');

function User(user){
    this.niname = user.niname;
    this.password = user.password;
    this.email = user.email;
};

module.exports = User;


var userSchema =mongodb.Schema({
    niname: String
    ,password : String
    ,email:String
});

var User = mongodb.model('user',userSchema);

User.prototype.save = function(callback) {//存储用户信息
    //要存入数据库的用户文档
    var user = {
        niname: this.niname,
        password: this.password,
        email: this.email
    };
    //打开数据库
    mongodb.open(function(err, db){
        if(err){
            return callback(err);
        }
        //读取 users 集合
        db.collection('users', function(err, collection){
            if(err){
                mongodb.close();
                return callback(err);
            }
            //将用户数据插入 users 集合
            collection.insert(user,{safe: true}, function(err, user){
                mongodb.close();
                callback(err, user);//成功！返回插入的用户信息
            });
        });
    });
};

User.getNiName = function(niname, callback){//读取用户信息
    //打开数据库
    mongodb.open(function(err, db){
        if(err){
            return callback(err);
        }
        //读取 users 集合
        db.collection('users', function(err, collection){
            if(err){
                mongodb.close();
                return callback(err);
            }
            //查找用户名 name 值为 name文档
            collection.findOne({
                niname: niname
            },function(err, doc){
                mongodb.close();
                if(doc){
                    var user = new User(doc);
                    callback(err, user);//成功！返回查询的用户信息
                } else {
                    callback(err, null);//失败！返回null
                }
            });
        });
    });
};

User.getEmail = function(email, callback){//读取用户信息
    //打开数据库
    mongodb.open(function(err, db){
        if(err){
            return callback(err);
        }
        //读取 users 集合
        db.collection('users', function(err, collection){
            if(err){
                mongodb.close();
                return callback(err);
            }
            //查找用户名 name 值为 name文档
            collection.findOne({
                email: email
            },function(err, doc){
                mongodb.close();
                if(doc){
                    var user = new User(doc);
                    callback(err, user);//成功！返回查询的用户信息
                } else {
                    callback(err, null);//失败！返回null
                }
            });
        });
    });
} ;
