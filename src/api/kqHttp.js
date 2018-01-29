import { get,post } from './api'
export const KqHttp = {
    /* 查询原始打开记录 */
    queryCardRecaordList(params) {
        return post('lywebservice/attendance/queryPunch', params);
    },
    /**
     * 统计异常数据
     * @param params
     * @returns {*}
     */
    queryAbnormalLeaveCount(params) {
        return post('lywebservice/attendance/getAbnormalLeaveCount', params);
    },
    /**
     * 获取异常数据
     * @param params 参数集
     * @returns {*}
     */
    queryAbnormalLeave(params) {
        return post('lywebservice/attendance/queryAbnormalLeave', params);
    },
    /**
     * 获取请假类别接口
     * @param params
     * @returns {*}
     */
    queryLeaveType(params) {
        return post('lywebservice/attendance/getLeaveType', params);
    },
    /**
     * 请假保存
     * @param params
     * @returns {*}
     */
    saveLeave(params) {
        return post('lywebservice/attendance/saveLeave', params);
    },
    /**
     * 获取年休假
     * @param params
     * @returns {*}
     */
    queryAnnualLeave(params) {
        return post('lywebservice/attendance/queryAnnualLeave', params);
    },
    /**
     * 获取考勤申请记录列表
     * @param params
     * @returns {*}
     */
    queryLeave(params) {
        return post('lywebservice/attendance/queryLeave', params);
    },
    /* 个人考勤查询 */
    queryKqList(params) {
      return post('lywebservice/attendance/queryAnalysis', params);
    },
    /* 部门考勤查询 */
    queryDeptKqList(params) {
        return post('lywebservice/attendance/queryDeptAnalysis', params);
    },
    /* 考勤日历查询 */
    queryKqCalendarList(params) {
      return post('lywebservice/attendance/getLeaveCalendar', params);
    },
    /* 人员检索 */
    queryPersonByParams(params) {
      return post('lywebservice/user/queryStaff', params);
    },
    /* 部门检索 */
    queryDepartByParams(params) {
      return post('lywebservice/user/queryDept', params);
    },
    /* 获取请假信息 */
    getLeaveInfo(params) {
        return post('lywebservice/attendance/getLeave', params);
    }
};
