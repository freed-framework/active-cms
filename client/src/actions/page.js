/**
 * @file page.js
 * @author denglingbo
 *
 */
import ActionType from './ActionType';
import { getPage } from '../services';

export const getPageData = (id) => dispatch => (
    new Promise((resolve, reject) => {
        getPage(id)
            .then((res) => {
                dispatch({
                    type: ActionType.GET_PAGE_DATA,
                    payload: res.data
                })
            })
            .catch(err => {
                reject(err);
            })
    })
)

export const getMockPageData = (id) => dispatch => (
    new Promise(() => {
        dispatch({
            type: ActionType.GET_PAGE_DATA,
            payload: {
                title: '123',
                thumbnail: '',
                content: [
                    {
                        "guid": "ec-module-addbed91-6089-4d04-8224-4fc09138f71d",
                        "name": "mobile/layer",
                        "displayName": "哈哈哈",
                        "children": [
                            {
                                "guid": "ec-module-1bcbcd12-aeb2-450d-83be-83a2bb4c2b02",
                                "name": "mobile/img",
                                "componentProps": {
                                    "src": "http://xcscapp.yatang.com.cn/images/beijing/beijing_03.jpg"
                                }
                            }
                        ],
                        "componentProps": {
                            "style": {
                                "layout": {
                                    "padding": "10"
                                }
                            }
                        }
                    },
                    {
                        "guid": "ec-module-a40cabe9-20f5-4354-a973-390679b86191",
                        "name": "mobile/list",
                        "children": [
                            {
                                "guid": "ec-module-ce995704-f115-4a9f-b124-92d2c6f8e000",
                                "name": "mobile/img",
                                "componentProps": {
                                    "src": "http://xcscapp.yatang.com.cn/images/beijing/beijing_05.jpg",
                                    "url": "baidu.com"
                                }
                            },
                            {
                                "guid": "ec-module-77d41d96-4112-421d-99e6-931549b9b1ca",
                                "name": "mobile/img",
                                "componentProps": {
                                    "src": "http://xcscapp.yatang.com.cn/images/beijing/beijing_05.jpg"
                                }
                            }
                        ],
                        "componentProps": {
                            "cols": 2,
                            "style": {
                                "layout": {
                                    "padding": "10",
                                    "backgroundColor": "rgba(106, 94, 170, 1)",
                                    "borderWidth": 1,
                                    "borderStyle": "solid",
                                    "borderColor": "#e7e4e4"
                                }
                            },
                            "extendsProps": {
                                "style": {
                                    "layout": {
                                        "padding": "10"
                                    }
                                }
                            }
                        }
                    }
                ]
            }
        })
    })
)

export const setPageTitle = (title) => dispatch => dispatch({
    type: ActionType.SET_PAGE_TITLE,
    payload: title,
});
