module.exports = {
  //存储信息的名称
  systemUser: 'system_user',
  systemMenu: 'system_menu',
  systemPage: 'system_page',

  //每页数据条数
  pageSize: 15,

  //薪资类型列表
  salaryTypesEnum: [{
    id: 1,
    name: '基本项'
  }, {
    id: 2,
    name: '加项'
  }, {
    id: 3,
    name: '减项'
  }, {
    id: 4,
    name: '其他'
  }],

  //薪资类别
  salaryType: {
    basic: 1, //基本工资
    plus: 2, //加项
    minus: 3, //减项
    others: 4 //减项
  },

  //巡店数据统计类别
  insAnalyseTypes: [
    {
      code: 'country',
      name: '全国'
    },
    {
      code: 'area',
      name: '按区域'
    },
    {
      code: 'shop',
      name: '按店铺'
    },
    {
      code: 'inspector',
      name: '按巡查者'
    },
    {
      code: 'responder',
      name: '按回答者'
    }
  ],

  //字典类型
  dictionary: {
    SALARY_SUBJECT_MODEL: 'SALARY_SUBJECT_MODEL',
    REPEAT_LIST: 'REPEAT_LIST',
    CALENDAR_TYPE: 'CALENDAR_TYPE',
    APPLY_TYPE: 'APPLY_TYPE',
    REMIND_LIST: 'REMIND_LIST'
  },

  //日程类别
  calendarType: {
    ORDI: 'ORDI',
    SPECIAL: 'SPECIAL',
    LOOP: 'LOOP'
  },

  //角色类别
  roleType: {
    ROLE_ADMIN: 'ROLE_ADMIN',
    ROLE_NORMAL: 'ROLE_NORMAL',
    ROLE_SUPER: 'ROLE_SUPER'
  },

  //权限字典
  systemAuthors: {
    read: 'AUTH_READ', //查看，导出，
    write: 'AUTH_WRITE', //编辑，导入，下载导入模版，新增，保存，提交
    remove: 'AUTH_REMOVE', //删除
    approval: 'AUTH_APPROVAL', //审核，取消审核，驳回
    bath: 'AUTH_BATH' ,//BATH处理，同步等
    launch: 'AUTH_LAUNCH', //发起
    feedback: 'AUTH_FEEDBACK', //反馈
    confirm: 'AUTH_CONFIRM', //确认
    accept: 'AUTH_ACCEPT' //受理
  },

  //AMapUI URL
  aMapUISrc: 'http://webapi.amap.com/ui/1.0/main.js?v=1.0.10',

  //personnel字典表枚举
  personnelDic: {
    TRAVEL_TYPE: 'TRAVEL_TYPE',     //出差类型
    ABNORMAL_TYPE: 'ABNORMAL_TYPE',  //异常类型
    REPORT_WORK_DAY: 'REPORT_WORK_DAY', //出勤日
  },

  //部门职能枚举
  departmentFunc: {
    FUNC_DEFAULT: 'FUNC_0',   //默认
    FUNC_PER: 'FUNC_PER',     //人事
    FUNC_FINA: 'FUNC_FINA',   //财务
    FUNC_PARI: 'FUNC_PARI',   //维修
    FUNC_BUS: 'FUNC_BUS',     //营业
  }
};
