import { get,post } from './api'
export const CarHttp = {
    /* 派车类型 */
    queryCarTypeList(params) {
      return post('lywebservice/vehicle/getVehicleType', params);
    },
    /* 派车列表查询 */
    queryCarList(params) {
      return post('lywebservice/vehicle/queryVehicle', params);
    },
    /* 上车地点 */
    queryUpCityList(params) {
      return post('lywebservice/vehicle/getWaitPlace', params);
    },
    /* 获取司机 */
    queryDriveList(params) {
      return post('lywebservice/vehicle/getDrive', params);
    },
    /* 获取市 */
    queryCityList(params) {
      return post('lywebservice/vehicle/getCity', params);
    },
};
