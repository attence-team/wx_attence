import { get,post } from './api'
export const appHttp = {
    /* 审批列表 */
    getApprovalList(url,params) {
        return post(url,params);
    },
    /* 审批详情 */
    getApprovalDetails(params) {
        return post('lywebservice/workflow/getSPVouInfo',params);
    },
    /* 单据状态 */
    getBillStatus(params) {
        return post('lywebservice/workflow/getSPInfo',params);
    }
};
