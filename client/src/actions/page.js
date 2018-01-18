/**
 * @file page.js
 * @author denglingbo
 *
 */
import ActionType from './ActionType';
import { getPage } from '../services';

/**
 * 处理页面数据
 * @param title
 * @param thumbnail
 * @param tile
 * @param content
 * @param activeId
 * @param pageType
 * @param pushId
 * @param _id
 */
const reslovePageData = ({
    title = '',
    thumbnail = '',
    content = [],
    pageType,
    pushId,
    _id
}) => ({
    title,
    thumbnail,
    content,
    pageType,
    pushId,
    _id
})

/**
 * 获取页面数据
 * @param id
 */
export const getPageData = (id) => dispatch => (
    new Promise((resolve, reject) => {
        getPage(id)
            .then((res) => {
                dispatch({
                    type: ActionType.GET_PAGE_DATA,
                    payload: reslovePageData(res.data)
                });

                resolve();
            })
            .catch(err => {
                reject(err);
            })
    })
)

/**
 * 修改title
 * @param {*} title
 */
export const setPageTitle = (title) => dispatch => dispatch({
    type: ActionType.SET_PAGE_TITLE,
    payload: title,
});

/**
 * 修改缩略图
 * @param {string} thumbnail
 */
export const setPageThumbnail = (thumbnail) => dispatch => dispatch({
    type: ActionType.SET_PAGE_THUMBNAIL,
    payload: thumbnail,
});

/**
 * 设置页面的平铺数据
 * @param {Array} arr
 */
export const setPageContent = (arr) => dispatch => (
    new Promise(resolve => {
        dispatch({
            type: ActionType.SET_PAGE_CONTENT,
            payload: arr,
        });

        resolve();
    })
);

/**
 * 设置页面的平铺数据
 * @param {Object} obj
 */
export const setPageTileData = (obj) => dispatch => dispatch({
    type: ActionType.SET_PAGE_TILE_DATA,
    payload: obj,
});

/**
 * 获取激活信息
 */
export const getActiveInfo = () => dispatch => dispatch({
    type: ActionType.GET_PAGE_ACTIVE,
});

/**
 * 设置激活信息
 * @param id
 */
export const setActiveInfo = (id) => dispatch => dispatch({
    type: ActionType.SET_PAGE_ACTIVE,
    payload: id,
});

/**
 * 清空激活信息
 */
export const clearActiveInfo = () => dispatch => dispatch({
    type: ActionType.CLEAR_PAGE_ACTIVE,
});

/**
 * 清空页面数据
 */
export const clearPage = () => dispatch => dispatch({
    type: ActionType.CLEAR_PAGE,
});
