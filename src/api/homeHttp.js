import { get,post } from './api'
export const HomeHttp = {
    /* 查询用户信息 */
    queryUserInfo(params) {
        return post('lywebservice/user/getUserInfo', params);
    },
    /* 查询用户权限菜单树 */
    queryMenuTree(params) {
        return post('lywebservice/user/getIndexMenu', params);
    },
};
