import { get,post } from './api'
export const appHttp = {
    /* 审批列表 */
    getApprovalList(url,params) {
        return post(url,params);
    },
    getApprovalDetails(params) {
        return post('lywebservice/workflow/getSPVouInfo',params);
    }
};
