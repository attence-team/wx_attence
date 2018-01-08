import { get,post } from './api'
export const KqHttp = {
    /* 查询原始打开记录 */
    queryCardRecaordList(params) {
        return post('lywebservice/attendance/queryPunch', params);
    },
};
