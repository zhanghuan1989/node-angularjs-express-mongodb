var appPath = process.cwd();
var config = {
    port: 3000,
    env: 'development',
    //mongodb配置信息
    mongodb: {
        uri: 'mongodb://localhost/blogdb', //mongodb://username:password@hostname:port/database
        options: {}
    },
    //找回密码hash过期时间
    findPasswordTill: 24 * 60 * 60 * 1000
};

module.exports = config;