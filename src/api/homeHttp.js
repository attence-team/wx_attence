import { get,post,postHeader } from './api'
export const HomeHttp = {
    /* 获取用户id */
    getUserId() {
        return postHeader('lywx/SSOLogn.jsp', {});
    },
    /* 查询用户信息 */
    queryUserInfo(params) {
        return post('lywebservice/user/getUserInfo', params);
    },
    /* 查询用户权限菜单树 */
    queryMenuTree(params) {
        return post('lywebservice/user/getIndexMenu', params);
    },
    /* 查询更多菜单树 */
    queryMenuTowTree(params) {
        return post('lywebservice/user/getSubMenu', params);
    }
};
