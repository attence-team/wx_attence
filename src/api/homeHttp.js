import { get,post } from './api'
export const HomeHttp = {
    /* 查询用户信息 */
    queryUserInfo(params) {
        return post('lywebservice/user/getUserInfo', params);
    },
};
