/**
 * Created with JetBrains WebStorm.
 * User: jiuyuehe
 * Date: 13-9-4
 * Time: 下午2:39
 * To change this template use File | Settings | File Templates.
 */
var Weapon = require("../models/weapon")
    , _ = require("underscore");


/**
 * 添加武器
 * @param weaponDTO
 * @param callback
 */
exports.addUnder = function (weaponDTO, callback) {
    console.log("start  -----");
    var weapon = new Weapon();
    _.extend(weapon, weaponDTO);
    weapon.save(function (err) {
        if (err) {
            callback(err);
        } else {
            callback(null);
        }
    });
}

/**
 * 分页查询武器
 * @param name
 * @param pageIndex
 * @param pageSize
 * @param callback
 */
exports.getByPage = function (name, pageIndex, pageSize, callback) {

    var index = pageIndex || 1;
    var size = pageSize || 5;

    var skip = (index-1)*size;

    var query ;

    if(name){
        query = Weapon.find(name).sort('uploadTime').skip(skip).limit(size);
    }else{
        query = Weapon.find({}).sort('uploadTime').skip(skip).limit(size);
    }

    query.exec(function(error,results){
        if(error){
            callback(err, null);
        } else {
            Weapon.count(name,function(error,count){
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

