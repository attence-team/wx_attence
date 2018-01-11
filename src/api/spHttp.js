import { get,post } from './api'
export const SpHttp = {
    /**
     * 审批流节点查询接口
     * @param params
     * @returns {*}
     */
    getSubmitInfo(params) {
        return post('lywebservice/workflow/getSubmitInfo', params);
    }

};
