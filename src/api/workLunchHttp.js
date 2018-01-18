import { get,post } from './api'
export const WlHttp = {
    /* 获取就餐类型 */
    getWorkLunchType() {
        return post('lywebservice/dinner/queryStand',{});
    },
    /* 获取临时卡号 */
    getTemporaryCard(params) {
        return post('lywebservice/dinner/queryTempCard',params);
    },
    /* 保存提交 */
    submit(params) {
        return post('lywebservice/dinner/saveDinner',params);
    },
    /* 获取工作餐列表 */
    getWorkLunchList(params) {
        return post('lywebservice/dinner/queryDinner',params);
    },
    /* 根据ID获取工作餐数据接口 */
    getWorkLunchDetails(params) {
      return post('lywebservice/dinner/getDinner',params);
    },
};
