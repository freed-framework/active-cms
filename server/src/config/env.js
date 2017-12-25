const nodeENV = process.env.NODE_ENV || 'development';

/**
 * client server ssr 三个平台环境变量
 */
const apiMap = {
    development: "http://sitxcsc.yatang.com.cn/api/sc",
    production: "http://xcscm.yatang.com.cn/api/sc",
    test: "http://xcscm.yatang.com.cn/api/sc"
}

var ENV = {
    /**
     * 外部地址
     */
    api: apiMap[nodeENV],
    /**
     * 项目域名
     */
    domain: nodeENV === 'production' ? 'http://wuget.yatang.com.cn' : 'http://www.iting.top'
    // domain: "http://localhost:12345"
}

export default ENV;
