import { get,post } from './api'
export const SpHttp = {
    /* 派车类型 */
    queryCarTypeList(params) {
      return post('lywebservice/vehicle/getVehicleType', params);
    },
    /**
     * 审批流节点查询接口
     * @param params
     * @returns {*}
     */
    getSubmitInfo(params) {
        return post('lywebservice/workflow/getSubmitInfo', params);
    },
    /* 保存审批提交 */
    saveSubmitInfo(params) {
      return post('lywebservice/workflow/placeOrder', params);
    }
};
