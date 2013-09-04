/**
 * Created with JetBrains WebStorm.
 * User: jiuyuehe
 * Date: 13-9-4
 * Time: 下午2:22
 * To change this template use File | Settings | File Templates.
 */

var date = new Date();
//存储各种时间格式，方便以后扩展
var time = {
    date: date,
    year: date.getFullYear(),
    month: date.getFullYear() + "-" + (date.getMonth() + 1),
    day: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
    minute: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes()
}


module.exports = time;