/**
 * 文件夹接口
 */
export interface urlInterface {
    folder: String,
    image?: {
        url: String,
        width?: Number,
        height?: Number,
        size?: Number,
        time?: Date,
    }
}