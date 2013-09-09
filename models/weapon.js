var mongoose = require('./mongodb');
var util = require('util');
var Schema = mongoose.Schema;
var time = require('./dateTime');


/**
 * 武器模型
 * @type {Schema}
 */
var weaponSchema = new Schema({
    name: { type: String, index: true, trim: true},
    level: { type: Number },
    playRole:{type:Number},
    color: {type:Number},
    pic: { type: String },
    info: {type: String},
    uploadTime: {type: Object, default: time},
    uploader: {type: String}
});

var Weapon = mongoose.model('Weapon', weaponSchema);

module.exports = Weapon;