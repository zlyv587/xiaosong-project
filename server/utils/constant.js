module.exports = {
    //响应失败code码
    CODE_ERROR: -1,
    //响应成功code码
    CODE_SUCCESS: 0,
    //授权失败
    CODE_TOKEN_EXPIRED: 401,
    //自定义jwt加密的私钥
    PRIVATE_KEY: 'login-cms',
    //过期时间30秒
    JWT_EXPIRED: 60 * 0.5,
}