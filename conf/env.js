const nodeENV = process.env.NODE_ENV;

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
    domain:  nodeENV === 'production' ? 'http://wuget.yatang.com.cn' : 'http://www.iting.top',
    // domain: "http://localhost:3000"

}

export default ENV;
