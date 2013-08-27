

//exports.toadmin = function(req, res){
//    res.render('admin1', { title: 'this is admin Express' });
//};

exports.toadmin = function(req, res){
    res.render('manager/admin', { title: 'this is admin Express' });
};
exports.admin_login = function(req, res){
    res.render('admin', { title: 'this is admin_login Express' });
};
exports.admin_logout = function(req, res){
    res.render('admin', { title: 'this is admin Express' });
};
exports.checkRole = function(req, res){
    res.render('admin', { title: 'this is checkRole Express' });
};
exports.userList = function(req, res){
    res.render('admin', { title: 'this is userList Express' });
};
exports.weaponList = function(req, res){
    res.render('admin', { title: 'this is weaponList Express' });
};

