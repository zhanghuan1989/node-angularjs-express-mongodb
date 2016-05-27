'use strict';
/**
 * 模块依赖
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * 用户模型
 */
var RoleSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    password: String
});
mongoose.model('Role', RoleSchema);