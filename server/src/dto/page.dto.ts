/**
 * 新建页面dto
 */
export class CreatePageDto {
    // 页面title
    readonly title: string;

    // 创建人id
    readonly createUser: string;

    // 所属人id
    readonly owerUser: string;

    // 内容
    readonly content: Array<any>
}

/**
 * 发布/取消发布 页面dto
 */
export class IspublishDto {
    // 页面id
    readonly id: string;

    // 是否发布页面
    readonly type: boolean
}

export class SharePageDto {
    // 分享页面给指定人员
    readonly users: Array<{pageId: string, userId: string}>
}
