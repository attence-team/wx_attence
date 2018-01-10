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
    /* 获取临时卡号 */
    submit(params) {
        return post('lywebservice/dinner/saveDinner',params);
    },

};
