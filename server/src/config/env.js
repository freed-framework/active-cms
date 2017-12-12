/**
 * client server ssr 三个平台环境变量
 */
var ENV = {
    /**
     * 外部地址
     */
    api: {
        development: "http://sitxcsc.yatang.com.cn/api/sc",
        production: "http://uat-xcscm.yatang.com.cn/api/sc",
        test: "http://xcscm.yatang.com.cn/api/sc"
    },
    /**
     * 项目域名
     */
    domain: "http://wuget.yatang.com.cn"
    // domain: "http://localhost:12345"
}

export default ENV;
