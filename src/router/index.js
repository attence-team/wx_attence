import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
import Main from 'components/main/main';
import Home from 'pages/home/home';
//我的工作
import Pending from 'pages/mywork/pending';
import Done from 'pages/mywork/done';
//考勤管理
import Kq_home from 'pages/kq/kq';
// import Leave from 'pages/kq/leave';
import Leave from 'pages/kq/leave_temp';
import YearLeave from 'pages/kq/yearLeave';
import Exception from 'pages/kq/exception';
import Calendar from 'pages/kq/calendar';
import Approval from 'pages/kq/approval';
import ApprovalDetails from 'pages/kq/approvalDetails';
import LeaveQuery from 'pages/kq/leaveQuery';
import ApplyQuery from 'pages/kq/applyQuery';
import CardRecord from 'pages/kq/cardRecord';
import Bill from 'pages/kq/bill';
import PersonKqQuery from 'pages/kq/personKqQuery';
import DepartKqQuery from 'pages/kq/departKqQuery';


//办公管理
//import SendCarApply from 'pages/officeWork/sendCarApply';
import SendCarApply from 'pages/officeWork/sendCarApply_temp';
import WorkLunchApply from 'pages/officeWork/workLunchApply_temp';
import SendCarQuery from 'pages/officeWork/sendCarQuery';
import WorkLunchQuery from 'pages/officeWork/workLunchQuery';

import SendCarDetails from 'pages/officeWork/sendCarDetails';
import WorkLunchDetails from 'pages/officeWork/workLunchDetails';
import DriverRegister from 'pages/sendCar/driverRegisterQuery';

import DayCount from 'pages/prodSalesStock/dayCount';


Router.prototype.goBack = function () {
    this.isBack = true;
    window.history.go(-1);
};
Vue.prototype.goBack = function () {
    window.history.go(-1);
};
export default new Router({
  routes: [
      {
          path:'/',
          redirect:'/home'
      },
      {
          path: '/home',
          name: 'home',
          component: Main,
          children: [
              {
                path: '/',
                components: {
                   body: Home
                }
              },
              {
                  path: 'kq',
                  components: {
                      body: Kq_home
                  }
              },
              {
                  path: 'counts',
                  components: {
                      body: DayCount
                  }
              }
          ]
      },
      {
          path: '/work',
          component: Main,
          children: [
              {
                  path: 'pending',
                  components: {
                      body: Pending
                  }
              },
              {
                  path: 'done',
                  components: {
                      body: Done
                  }
              }
          ]
      },
      {
          path: '/kq',
          component: Main,
          children: [
              {
                  path: 'leave',
                  components: {
                      body: Leave
                  }
              },
              {
                  path: 'yearLeave',
                  components: {
                      body: YearLeave
                  }
              },
              {
                  path: 'exception',
                  components: {
                      body: Exception
                  }
              },
              {
                  path: 'calendar',
                  components: {
                      body: Calendar
                  }
              },
              {
                  path: 'approval',
                  components: {
                      body: Approval
                  }
              },
              {
                  path: 'approvalDetails',
                  components: {
                      body: ApprovalDetails
                  }
              },
              {
                  path: 'leaveQuery',
                  components: {
                      body: LeaveQuery
                  }
              },
              {
                  path: 'applyQuery',
                  components: {
                      body: ApplyQuery
                  }
              },
              {
                  path: 'cardRecord',
                  components: {
                      body: CardRecord
                  }
              },
              {
                  path: 'bill',
                  components: {
                      body: Bill
                  }
              },
              {
                  path: 'personKqQuery',
                  components: {
                     body: PersonKqQuery
                  }
              },
              {
                  path: 'departKqQuery',
                  components: {
                     body: DepartKqQuery
                  }
              }
          ]
      },
      {
          path: '/officework',
          component: Main,
          children: [
              {
                  path: 'sendCarApply',
                  components: {
                      body: SendCarApply
                  }
              },
              {
                  path: 'workLunchApply',
                  components: {
                      body: WorkLunchApply
                  }
              },
              {
                  path: 'sendCarQuery',
                  components: {
                      body: SendCarQuery
                  }
              },
              {
                  path: 'workLunchQuery',
                  components: {
                      body: WorkLunchQuery
                  }
              }
              ,
              {
                  path: 'SendCarDetails',
                  components: {
                      body: SendCarDetails
                  }
              },
              {
                  path: 'workLunchDetails',
                  components: {
                      body: WorkLunchDetails
                  }
              },
              {
                path: 'driverRegister',
                components: {
                  body: DriverRegister
                }
              }
          ]
      }
  ]
})
