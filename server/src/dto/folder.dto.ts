/**
 * 新建文件夹dto
 */
export class CreateFolderDto {
        // 对应页面
        readonly page: String;
    
        // 文件夹名
        readonly name?: String;

        // 层级
        readonly level?: Number;
    
        // 父文件夹
        readonly parent?: String | null;
}