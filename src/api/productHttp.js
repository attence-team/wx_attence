import { get,post } from './api'
export const ProductHttp = {
  /* 个人考勤查询 */
  queryProdectCount(params) {
    return post('lywebservice/report/queryKeyData', params);
  }
};
