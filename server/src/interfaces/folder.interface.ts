/**
 * 文件夹接口
 */
export interface folderInterface {
    // 对应页面
    page: String,

    // 对应用户
    user: String,

    // 文件夹名
    name?: String,

    // 父文件夹
    parent?: String | null
}