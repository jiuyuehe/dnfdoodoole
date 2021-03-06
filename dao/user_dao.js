var User = require("../models/user")
    , _ = require("underscore");

exports.add = function (name, password, email, callback) {
    console.log("start  -----");
    var user = new User();
    // _.extend(user,userDTO);
    user.niname = name;
    user.password = password;
    user.email = email;
    console.log("user is " + user);

    user.save(function (err) {
        if (err) {
            callback(err);
        } else {
            callback(null);
        }
    });
}

exports.addUnder = function (userDTO, callback) {
    console.log("start  -----");
    var user = new User();
    _.extend(user, userDTO);
    user.save(function (err) {
        if (err) {
            callback(err);
        } else {
            callback(null);
        }
    });
}

exports.delete = function (id, callback) {
    exports.findTodoById(id, function (err, doc) {
        if (err)
            callback(err);
        else {
            util.log(util.inspect(doc));
            doc.remove();
            callback(null);
        }
    });
}


exports.forAll = function (callback) {
    console.log("start  find all");
    User.find({}, function (err, docs) {
        if (err) {
            callback(err, null);
        }
        callback(null, docs);
    });
}


exports.getByPage = function (name, pageIndex, pageSize, callback) {
    console.log("start get by page = 5");

    var index = pageIndex || 1;
    var size = pageSize || 5;

    var skip = (index-1)*size;

    var query ;

    if(name){
        query = User.find(name).sort('registerTime').skip(skip).limit(size);
    }else{
        query = User.find({}).sort('registerTime').skip(skip).limit(size);
    }

    query.exec(function(error,results){
         if(error){
             callback(err, null);
         } else {
             User.count(name,function(error,count){
                   if(error){
                       callback(error,null);
                   }else{
                       var pageCount = Math.ceil(count/size);
                       callback(null,pageCount,results);
                   }
             });
         }
    });
}


exports.findUserByNiName = function (name, callback) {
    User.findOne({niname: name}, function (err, doc) {
        if (err) {
            //  util.log('FATAL '+ err);
            callback(err, null);
        }
        callback(null, doc);
    });
}

exports.findUserByEmail = function (email, callback) {
    User.findOne({email: email}, function (err, doc) {
        if (err) {
            callback(err, null);
        }
        callback(null, doc);
    });
}