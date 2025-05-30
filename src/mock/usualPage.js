import Mock from "mockjs";

function findObjectById(array, id, keyName = "id") {
  // 使用 Array.prototype.find() 方法查找匹配的对象
  return array.find((obj) => obj[keyName] === id);
}

// get请求从config.url获取参数，post从config.body中获取参数
function getParamObj(url) {
  const search = url.split("?")[1];
  if (!search) {
    return {};
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}'
  );
}

let List = [];
const count = 200;
const thisYear = new Date().getFullYear();
let INDEX = 0;

for (let i = 0; i < count; i++) {
  // Random.date()
  let birth = Mock.Random.date();
  INDEX = i + 1;
  List.push(
    Mock.mock({
      index: INDEX,
      id: Mock.Random.guid(),
      name: Mock.Random.cname(),
      // address: Mock.mock("@county(true)"),
      address: Mock.Random.county(true),
      // "age|18-60": 1,
      birth: birth,
      age: thisYear - birth.slice(0, 4),
      identityCard: Mock.Random.id(),
      sex: Mock.Random.integer(0, 1),
      status: Mock.Random.integer(0, 1),
      "phoneNum|1": /^1[3456789]\d{9}$/,
      // age: 2022-Number('@date("yyyy")'),
      // birth: '@date',
    })
  );
}

export default {
  // 获取表格总体数据
  getUserList(config) {
    console.log("getUserList");
    let queryParams = getParamObj(config.url);
    return {
      total: List.length,
      rows: List.slice(
        queryParams.pageSize * (queryParams.pageNum - 1),
        queryParams.pageSize * queryParams.pageNum
      ),
      code: 200,
      msg: "",
    };
  },
  // 根据ID获取单挑数据的详细信息
  getUserDetailsById(config) {
    console.log("getUserDetailsById");
    let id = config.url.split("/").pop();
    return {
      row: findObjectById(List, id),
      code: 200,
      msg: "",
    };
  },
  // 根据ID修改用户状态
  updateUserStatusById(config) {
    console.log("updateUserStatusById");
    let queryParams = JSON.parse(config.body);
    queryParams.id.forEach((id) => {
      findObjectById(List, id).status = queryParams.status;
    });
    return {
      code: 200,
      msg: "",
    };
  },
  // 新增用户信息
  userAdd(config) {
    console.log("userAdd");
    INDEX++;
    let newUser = JSON.parse(config.body);
    newUser.age = thisYear - newUser.birth.slice(0, 4);
    newUser.id = Mock.Random.guid();
    newUser.index = INDEX;
    List.unshift(newUser);
    return {
      code: 200,
      msg: "",
    };
  },
  // 修改用户信息
  userEdit(config) {
    console.log("userEdit");
    let user = JSON.parse(config.body);
    user.age = thisYear - user.birth.slice(0, 4);
    Object.assign(findObjectById(List, user.id), user);
    return {
      code: 200,
      msg: "",
    };
  },
  // 根据ID删除用户
  userDeleteById(config) {
    console.log("userDeleteById");
    // console.log(config);
    let ids = config.url.split("/").pop().split(",");
    List = List.filter((item) => !ids.includes(item.id));
    return {
      code: 200,
      msg: "",
    };
  },
  // getSelectOptions: async () => {
  // // getSelectOptions() {
  //   await new Promise((resolve) => setTimeout(resolve, 2000));
  //   return {
  //     code: 200,
  //     msg: "",
  //     data: [
  //       { value: 0, label: "aaa" },
  //       { value: 1, label: "bbb" },
  //       { value: 2, label: "ccc" },
  //       { value: 3, label: "ddd" },
  //       { value: 4, label: "eee" },
  //       { value: 5, label: "fff" },
  //       { value: 6, label: "ggg" },
  //       { value: 7, label: "hhh" },
  //       { value: 8, label: "iii" },
  //       { value: 9, label: "jjj" },
  //       { value: 10, label: "kkk" },
  //     ],
  //   };
  // },
  // getSelectOptions() {
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       resolve({
  //         code: 200,
  //         msg: "",
  //         data: [
  //           { value: 0, label: "aaa" },
  //           { value: 1, label: "bbb" },
  //           { value: 2, label: "ccc" },
  //           { value: 3, label: "ddd" },
  //           { value: 4, label: "eee" },
  //           { value: 5, label: "fff" },
  //           { value: 6, label: "ggg" },
  //           { value: 7, label: "hhh" },
  //           { value: 8, label: "iii" },
  //           { value: 9, label: "jjj" },
  //           { value: 10, label: "kkk" },
  //         ],
  //       });
  //     }, 2000);
  //   });
  // },
  getSelectOptions() {
    return {
      code: 200,
      msg: "",
      data: [
        { value: 0, label: "aaa" },
        { value: 1, label: "bbb" },
        { value: 2, label: "ccc" },
        { value: 3, label: "ddd" },
        { value: 4, label: "eee" },
        { value: 5, label: "fff" },
        { value: 6, label: "ggg" },
        { value: 7, label: "hhh" },
        { value: 8, label: "iii" },
        { value: 9, label: "jjj" },
        { value: 10, label: "kkk" },
      ],
    };
  },
  getAreaTree() {
    return {
      code: 200,
      msg: "",
      data: [
        {
          id: 110000,
          name: "北京市",
          children: [
            {
              id: 110100,
              name: "北京市",
              children: [
                {
                  id: 110101,
                  name: "东城区",
                  children: [],
                },
                {
                  id: 110102,
                  name: "西城区",
                  children: [],
                },
                {
                  id: 110105,
                  name: "朝阳区",
                  children: [],
                },
                {
                  id: 110106,
                  name: "丰台区",
                  children: [],
                },
                {
                  id: 110107,
                  name: "石景山区",
                  children: [],
                },
                {
                  id: 110108,
                  name: "海淀区",
                  children: [],
                },
                {
                  id: 110109,
                  name: "门头沟区",
                  children: [],
                },
                {
                  id: 110111,
                  name: "房山区",
                  children: [],
                },
                {
                  id: 110112,
                  name: "通州区",
                  children: [],
                },
                {
                  id: 110113,
                  name: "顺义区",
                  children: [],
                },
                {
                  id: 110114,
                  name: "昌平区",
                  children: [],
                },
                {
                  id: 110115,
                  name: "大兴区",
                  children: [],
                },
                {
                  id: 110116,
                  name: "怀柔区",
                  children: [],
                },
                {
                  id: 110117,
                  name: "平谷区",
                  children: [],
                },
                {
                  id: 110118,
                  name: "密云区",
                  children: [],
                },
                {
                  id: 110119,
                  name: "延庆区",
                  children: [],
                },
              ],
            },
          ],
        },
        {
          id: 120000,
          name: "天津市",
          children: [
            {
              id: 120100,
              name: "天津市",
              children: [
                {
                  id: 120101,
                  name: "和平区",
                  children: [],
                },
                {
                  id: 120102,
                  name: "河东区",
                  children: [],
                },
                {
                  id: 120103,
                  name: "河西区",
                  children: [],
                },
                {
                  id: 120104,
                  name: "南开区",
                  children: [],
                },
                {
                  id: 120105,
                  name: "河北区",
                  children: [],
                },
                {
                  id: 120106,
                  name: "红桥区",
                  children: [],
                },
                {
                  id: 120110,
                  name: "东丽区",
                  children: [],
                },
                {
                  id: 120111,
                  name: "西青区",
                  children: [],
                },
                {
                  id: 120112,
                  name: "津南区",
                  children: [],
                },
                {
                  id: 120113,
                  name: "北辰区",
                  children: [],
                },
                {
                  id: 120114,
                  name: "武清区",
                  children: [],
                },
                {
                  id: 120115,
                  name: "宝坻区",
                  children: [],
                },
                {
                  id: 120116,
                  name: "滨海新区",
                  children: [],
                },
                {
                  id: 120117,
                  name: "宁河区",
                  children: [],
                },
                {
                  id: 120118,
                  name: "静海区",
                  children: [],
                },
                {
                  id: 120119,
                  name: "蓟州区",
                  children: [],
                },
              ],
            },
          ],
        },
        {
          id: 130000,
          name: "河北省",
          children: [
            {
              id: 130100,
              name: "石家庄市",
              children: [
                {
                  id: 130102,
                  name: "长安区",
                  children: [],
                },
                {
                  id: 130104,
                  name: "桥西区",
                  children: [],
                },
                {
                  id: 130105,
                  name: "新华区",
                  children: [],
                },
                {
                  id: 130107,
                  name: "井陉矿区",
                  children: [],
                },
                {
                  id: 130108,
                  name: "裕华区",
                  children: [],
                },
                {
                  id: 130109,
                  name: "藁城区",
                  children: [],
                },
                {
                  id: 130110,
                  name: "鹿泉区",
                  children: [],
                },
                {
                  id: 130111,
                  name: "栾城区",
                  children: [],
                },
                {
                  id: 130121,
                  name: "井陉县",
                  children: [],
                },
                {
                  id: 130123,
                  name: "正定县",
                  children: [],
                },
                {
                  id: 130125,
                  name: "行唐县",
                  children: [],
                },
                {
                  id: 130126,
                  name: "灵寿县",
                  children: [],
                },
                {
                  id: 130127,
                  name: "高邑县",
                  children: [],
                },
                {
                  id: 130128,
                  name: "深泽县",
                  children: [],
                },
                {
                  id: 130129,
                  name: "赞皇县",
                  children: [],
                },
                {
                  id: 130130,
                  name: "无极县",
                  children: [],
                },
                {
                  id: 130131,
                  name: "平山县",
                  children: [],
                },
                {
                  id: 130132,
                  name: "元氏县",
                  children: [],
                },
                {
                  id: 130133,
                  name: "赵县",
                  children: [],
                },
                {
                  id: 130171,
                  name: "石家庄高新技术产业开发区",
                  children: [],
                },
                {
                  id: 130172,
                  name: "石家庄循环化工园区",
                  children: [],
                },
                {
                  id: 130181,
                  name: "辛集市",
                  children: [],
                },
                {
                  id: 130183,
                  name: "晋州市",
                  children: [],
                },
                {
                  id: 130184,
                  name: "新乐市",
                  children: [],
                },
              ],
            },
            {
              id: 130200,
              name: "唐山市",
              children: [
                {
                  id: 130202,
                  name: "路南区",
                  children: [],
                },
                {
                  id: 130203,
                  name: "路北区",
                  children: [],
                },
                {
                  id: 130204,
                  name: "古冶区",
                  children: [],
                },
                {
                  id: 130205,
                  name: "开平区",
                  children: [],
                },
                {
                  id: 130207,
                  name: "丰南区",
                  children: [],
                },
                {
                  id: 130208,
                  name: "丰润区",
                  children: [],
                },
                {
                  id: 130209,
                  name: "曹妃甸区",
                  children: [],
                },
                {
                  id: 130224,
                  name: "滦南县",
                  children: [],
                },
                {
                  id: 130225,
                  name: "乐亭县",
                  children: [],
                },
                {
                  id: 130227,
                  name: "迁西县",
                  children: [],
                },
                {
                  id: 130229,
                  name: "玉田县",
                  children: [],
                },
                {
                  id: 130271,
                  name: "河北唐山芦台经济开发区",
                  children: [],
                },
                {
                  id: 130272,
                  name: "唐山市汉沽管理区",
                  children: [],
                },
                {
                  id: 130273,
                  name: "唐山高新技术产业开发区",
                  children: [],
                },
                {
                  id: 130274,
                  name: "河北唐山海港经济开发区",
                  children: [],
                },
                {
                  id: 130281,
                  name: "遵化市",
                  children: [],
                },
                {
                  id: 130283,
                  name: "迁安市",
                  children: [],
                },
                {
                  id: 130284,
                  name: "滦州市",
                  children: [],
                },
              ],
            },
            {
              id: 130300,
              name: "秦皇岛市",
              children: [
                {
                  id: 130302,
                  name: "海港区",
                  children: [],
                },
                {
                  id: 130303,
                  name: "山海关区",
                  children: [],
                },
                {
                  id: 130304,
                  name: "北戴河区",
                  children: [],
                },
                {
                  id: 130306,
                  name: "抚宁区",
                  children: [],
                },
                {
                  id: 130321,
                  name: "青龙满族自治县",
                  children: [],
                },
                {
                  id: 130322,
                  name: "昌黎县",
                  children: [],
                },
                {
                  id: 130324,
                  name: "卢龙县",
                  children: [],
                },
                {
                  id: 130371,
                  name: "秦皇岛市经济技术开发区",
                  children: [],
                },
                {
                  id: 130372,
                  name: "北戴河新区",
                  children: [],
                },
              ],
            },
            {
              id: 130400,
              name: "邯郸市",
              children: [
                {
                  id: 130402,
                  name: "邯山区",
                  children: [],
                },
                {
                  id: 130403,
                  name: "丛台区",
                  children: [],
                },
                {
                  id: 130404,
                  name: "复兴区",
                  children: [],
                },
                {
                  id: 130406,
                  name: "峰峰矿区",
                  children: [],
                },
                {
                  id: 130407,
                  name: "肥乡区",
                  children: [],
                },
                {
                  id: 130408,
                  name: "永年区",
                  children: [],
                },
                {
                  id: 130423,
                  name: "临漳县",
                  children: [],
                },
                {
                  id: 130424,
                  name: "成安县",
                  children: [],
                },
                {
                  id: 130425,
                  name: "大名县",
                  children: [],
                },
                {
                  id: 130426,
                  name: "涉县",
                  children: [],
                },
                {
                  id: 130427,
                  name: "磁县",
                  children: [],
                },
                {
                  id: 130430,
                  name: "邱县",
                  children: [],
                },
                {
                  id: 130431,
                  name: "鸡泽县",
                  children: [],
                },
                {
                  id: 130432,
                  name: "广平县",
                  children: [],
                },
                {
                  id: 130433,
                  name: "馆陶县",
                  children: [],
                },
                {
                  id: 130434,
                  name: "魏县",
                  children: [],
                },
                {
                  id: 130435,
                  name: "曲周县",
                  children: [],
                },
                {
                  id: 130471,
                  name: "邯郸经济技术开发区",
                  children: [],
                },
                {
                  id: 130473,
                  name: "邯郸冀南新区",
                  children: [],
                },
                {
                  id: 130481,
                  name: "武安市",
                  children: [],
                },
              ],
            },
            {
              id: 130500,
              name: "邢台市",
              children: [
                {
                  id: 130502,
                  name: "襄都区",
                  children: [],
                },
                {
                  id: 130503,
                  name: "信都区",
                  children: [],
                },
                {
                  id: 130505,
                  name: "任泽区",
                  children: [],
                },
                {
                  id: 130506,
                  name: "南和区",
                  children: [],
                },
                {
                  id: 130522,
                  name: "临城县",
                  children: [],
                },
                {
                  id: 130523,
                  name: "内丘县",
                  children: [],
                },
                {
                  id: 130524,
                  name: "柏乡县",
                  children: [],
                },
                {
                  id: 130525,
                  name: "隆尧县",
                  children: [],
                },
                {
                  id: 130528,
                  name: "宁晋县",
                  children: [],
                },
                {
                  id: 130529,
                  name: "巨鹿县",
                  children: [],
                },
                {
                  id: 130530,
                  name: "新河县",
                  children: [],
                },
                {
                  id: 130531,
                  name: "广宗县",
                  children: [],
                },
                {
                  id: 130532,
                  name: "平乡县",
                  children: [],
                },
                {
                  id: 130533,
                  name: "威县",
                  children: [],
                },
                {
                  id: 130534,
                  name: "清河县",
                  children: [],
                },
                {
                  id: 130535,
                  name: "临西县",
                  children: [],
                },
                {
                  id: 130571,
                  name: "河北邢台经济开发区",
                  children: [],
                },
                {
                  id: 130581,
                  name: "南宫市",
                  children: [],
                },
                {
                  id: 130582,
                  name: "沙河市",
                  children: [],
                },
              ],
            },
            {
              id: 130600,
              name: "保定市",
              children: [
                {
                  id: 130602,
                  name: "竞秀区",
                  children: [],
                },
                {
                  id: 130606,
                  name: "莲池区",
                  children: [],
                },
                {
                  id: 130607,
                  name: "满城区",
                  children: [],
                },
                {
                  id: 130608,
                  name: "清苑区",
                  children: [],
                },
                {
                  id: 130609,
                  name: "徐水区",
                  children: [],
                },
                {
                  id: 130623,
                  name: "涞水县",
                  children: [],
                },
                {
                  id: 130624,
                  name: "阜平县",
                  children: [],
                },
                {
                  id: 130626,
                  name: "定兴县",
                  children: [],
                },
                {
                  id: 130627,
                  name: "唐县",
                  children: [],
                },
                {
                  id: 130628,
                  name: "高阳县",
                  children: [],
                },
                {
                  id: 130629,
                  name: "容城县",
                  children: [],
                },
                {
                  id: 130630,
                  name: "涞源县",
                  children: [],
                },
                {
                  id: 130631,
                  name: "望都县",
                  children: [],
                },
                {
                  id: 130632,
                  name: "安新县",
                  children: [],
                },
                {
                  id: 130633,
                  name: "易县",
                  children: [],
                },
                {
                  id: 130634,
                  name: "曲阳县",
                  children: [],
                },
                {
                  id: 130635,
                  name: "蠡县",
                  children: [],
                },
                {
                  id: 130636,
                  name: "顺平县",
                  children: [],
                },
                {
                  id: 130637,
                  name: "博野县",
                  children: [],
                },
                {
                  id: 130638,
                  name: "雄县",
                  children: [],
                },
                {
                  id: 130671,
                  name: "保定高新技术产业开发区",
                  children: [],
                },
                {
                  id: 130672,
                  name: "保定白沟新城",
                  children: [],
                },
                {
                  id: 130681,
                  name: "涿州市",
                  children: [],
                },
                {
                  id: 130682,
                  name: "定州市",
                  children: [],
                },
                {
                  id: 130683,
                  name: "安国市",
                  children: [],
                },
                {
                  id: 130684,
                  name: "高碑店市",
                  children: [],
                },
              ],
            },
            {
              id: 130700,
              name: "张家口市",
              children: [
                {
                  id: 130702,
                  name: "桥东区",
                  children: [],
                },
                {
                  id: 130703,
                  name: "桥西区",
                  children: [],
                },
                {
                  id: 130705,
                  name: "宣化区",
                  children: [],
                },
                {
                  id: 130706,
                  name: "下花园区",
                  children: [],
                },
                {
                  id: 130708,
                  name: "万全区",
                  children: [],
                },
                {
                  id: 130709,
                  name: "崇礼区",
                  children: [],
                },
                {
                  id: 130722,
                  name: "张北县",
                  children: [],
                },
                {
                  id: 130723,
                  name: "康保县",
                  children: [],
                },
                {
                  id: 130724,
                  name: "沽源县",
                  children: [],
                },
                {
                  id: 130725,
                  name: "尚义县",
                  children: [],
                },
                {
                  id: 130726,
                  name: "蔚县",
                  children: [],
                },
                {
                  id: 130727,
                  name: "阳原县",
                  children: [],
                },
                {
                  id: 130728,
                  name: "怀安县",
                  children: [],
                },
                {
                  id: 130730,
                  name: "怀来县",
                  children: [],
                },
                {
                  id: 130731,
                  name: "涿鹿县",
                  children: [],
                },
                {
                  id: 130732,
                  name: "赤城县",
                  children: [],
                },
                {
                  id: 130771,
                  name: "张家口经济开发区",
                  children: [],
                },
                {
                  id: 130772,
                  name: "张家口市察北管理区",
                  children: [],
                },
                {
                  id: 130773,
                  name: "张家口市塞北管理区",
                  children: [],
                },
              ],
            },
            {
              id: 130800,
              name: "承德市",
              children: [
                {
                  id: 130802,
                  name: "双桥区",
                  children: [],
                },
                {
                  id: 130803,
                  name: "双滦区",
                  children: [],
                },
                {
                  id: 130804,
                  name: "鹰手营子矿区",
                  children: [],
                },
                {
                  id: 130821,
                  name: "承德县",
                  children: [],
                },
                {
                  id: 130822,
                  name: "兴隆县",
                  children: [],
                },
                {
                  id: 130824,
                  name: "滦平县",
                  children: [],
                },
                {
                  id: 130825,
                  name: "隆化县",
                  children: [],
                },
                {
                  id: 130826,
                  name: "丰宁满族自治县",
                  children: [],
                },
                {
                  id: 130827,
                  name: "宽城满族自治县",
                  children: [],
                },
                {
                  id: 130828,
                  name: "围场满族蒙古族自治县",
                  children: [],
                },
                {
                  id: 130871,
                  name: "承德高新技术产业开发区",
                  children: [],
                },
                {
                  id: 130881,
                  name: "平泉市",
                  children: [],
                },
              ],
            },
            {
              id: 130900,
              name: "沧州市",
              children: [
                {
                  id: 130902,
                  name: "新华区",
                  children: [],
                },
                {
                  id: 130903,
                  name: "运河区",
                  children: [],
                },
                {
                  id: 130921,
                  name: "沧县",
                  children: [],
                },
                {
                  id: 130922,
                  name: "青县",
                  children: [],
                },
                {
                  id: 130923,
                  name: "东光县",
                  children: [],
                },
                {
                  id: 130924,
                  name: "海兴县",
                  children: [],
                },
                {
                  id: 130925,
                  name: "盐山县",
                  children: [],
                },
                {
                  id: 130926,
                  name: "肃宁县",
                  children: [],
                },
                {
                  id: 130927,
                  name: "南皮县",
                  children: [],
                },
                {
                  id: 130928,
                  name: "吴桥县",
                  children: [],
                },
                {
                  id: 130929,
                  name: "献县",
                  children: [],
                },
                {
                  id: 130930,
                  name: "孟村回族自治县",
                  children: [],
                },
                {
                  id: 130971,
                  name: "河北沧州经济开发区",
                  children: [],
                },
                {
                  id: 130972,
                  name: "沧州高新技术产业开发区",
                  children: [],
                },
                {
                  id: 130973,
                  name: "沧州渤海新区",
                  children: [],
                },
                {
                  id: 130981,
                  name: "泊头市",
                  children: [],
                },
                {
                  id: 130982,
                  name: "任丘市",
                  children: [],
                },
                {
                  id: 130983,
                  name: "黄骅市",
                  children: [],
                },
                {
                  id: 130984,
                  name: "河间市",
                  children: [],
                },
              ],
            },
            {
              id: 131000,
              name: "廊坊市",
              children: [
                {
                  id: 131002,
                  name: "安次区",
                  children: [],
                },
                {
                  id: 131003,
                  name: "广阳区",
                  children: [],
                },
                {
                  id: 131022,
                  name: "固安县",
                  children: [],
                },
                {
                  id: 131023,
                  name: "永清县",
                  children: [],
                },
                {
                  id: 131024,
                  name: "香河县",
                  children: [],
                },
                {
                  id: 131025,
                  name: "大城县",
                  children: [],
                },
                {
                  id: 131026,
                  name: "文安县",
                  children: [],
                },
                {
                  id: 131028,
                  name: "大厂回族自治县",
                  children: [],
                },
                {
                  id: 131071,
                  name: "廊坊经济技术开发区",
                  children: [],
                },
                {
                  id: 131081,
                  name: "霸州市",
                  children: [],
                },
                {
                  id: 131082,
                  name: "三河市",
                  children: [],
                },
              ],
            },
            {
              id: 131100,
              name: "衡水市",
              children: [
                {
                  id: 131102,
                  name: "桃城区",
                  children: [],
                },
                {
                  id: 131103,
                  name: "冀州区",
                  children: [],
                },
                {
                  id: 131121,
                  name: "枣强县",
                  children: [],
                },
                {
                  id: 131122,
                  name: "武邑县",
                  children: [],
                },
                {
                  id: 131123,
                  name: "武强县",
                  children: [],
                },
                {
                  id: 131124,
                  name: "饶阳县",
                  children: [],
                },
                {
                  id: 131125,
                  name: "安平县",
                  children: [],
                },
                {
                  id: 131126,
                  name: "故城县",
                  children: [],
                },
                {
                  id: 131127,
                  name: "景县",
                  children: [],
                },
                {
                  id: 131128,
                  name: "阜城县",
                  children: [],
                },
                {
                  id: 131171,
                  name: "河北衡水高新技术产业开发区",
                  children: [],
                },
                {
                  id: 131172,
                  name: "衡水滨湖新区",
                  children: [],
                },
                {
                  id: 131182,
                  name: "深州市",
                  children: [],
                },
              ],
            },
          ],
        },
        {
          id: 140000,
          name: "山西省",
          children: [
            {
              id: 140100,
              name: "太原市",
              children: [
                {
                  id: 140105,
                  name: "小店区",
                  children: [],
                },
                {
                  id: 140106,
                  name: "迎泽区",
                  children: [],
                },
                {
                  id: 140107,
                  name: "杏花岭区",
                  children: [],
                },
                {
                  id: 140108,
                  name: "尖草坪区",
                  children: [],
                },
                {
                  id: 140109,
                  name: "万柏林区",
                  children: [],
                },
                {
                  id: 140110,
                  name: "晋源区",
                  children: [],
                },
                {
                  id: 140121,
                  name: "清徐县",
                  children: [],
                },
                {
                  id: 140122,
                  name: "阳曲县",
                  children: [],
                },
                {
                  id: 140123,
                  name: "娄烦县",
                  children: [],
                },
                {
                  id: 140171,
                  name: "山西转型综合改革示范区",
                  children: [],
                },
                {
                  id: 140181,
                  name: "古交市",
                  children: [],
                },
              ],
            },
            {
              id: 140200,
              name: "大同市",
              children: [
                {
                  id: 140212,
                  name: "新荣区",
                  children: [],
                },
                {
                  id: 140213,
                  name: "平城区",
                  children: [],
                },
                {
                  id: 140214,
                  name: "云冈区",
                  children: [],
                },
                {
                  id: 140215,
                  name: "云州区",
                  children: [],
                },
                {
                  id: 140221,
                  name: "阳高县",
                  children: [],
                },
                {
                  id: 140222,
                  name: "天镇县",
                  children: [],
                },
                {
                  id: 140223,
                  name: "广灵县",
                  children: [],
                },
                {
                  id: 140224,
                  name: "灵丘县",
                  children: [],
                },
                {
                  id: 140225,
                  name: "浑源县",
                  children: [],
                },
                {
                  id: 140226,
                  name: "左云县",
                  children: [],
                },
                {
                  id: 140271,
                  name: "山西大同经济开发区",
                  children: [],
                },
              ],
            },
            {
              id: 140300,
              name: "阳泉市",
              children: [
                {
                  id: 140302,
                  name: "城区",
                  children: [],
                },
                {
                  id: 140303,
                  name: "矿区",
                  children: [],
                },
                {
                  id: 140311,
                  name: "郊区",
                  children: [],
                },
                {
                  id: 140321,
                  name: "平定县",
                  children: [],
                },
                {
                  id: 140322,
                  name: "盂县",
                  children: [],
                },
              ],
            },
            {
              id: 140400,
              name: "长治市",
              children: [
                {
                  id: 140403,
                  name: "潞州区",
                  children: [],
                },
                {
                  id: 140404,
                  name: "上党区",
                  children: [],
                },
                {
                  id: 140405,
                  name: "屯留区",
                  children: [],
                },
                {
                  id: 140406,
                  name: "潞城区",
                  children: [],
                },
                {
                  id: 140423,
                  name: "襄垣县",
                  children: [],
                },
                {
                  id: 140425,
                  name: "平顺县",
                  children: [],
                },
                {
                  id: 140426,
                  name: "黎城县",
                  children: [],
                },
                {
                  id: 140427,
                  name: "壶关县",
                  children: [],
                },
                {
                  id: 140428,
                  name: "长子县",
                  children: [],
                },
                {
                  id: 140429,
                  name: "武乡县",
                  children: [],
                },
                {
                  id: 140430,
                  name: "沁县",
                  children: [],
                },
                {
                  id: 140431,
                  name: "沁源县",
                  children: [],
                },
                {
                  id: 140471,
                  name: "山西长治高新技术产业园区",
                  children: [],
                },
              ],
            },
            {
              id: 140500,
              name: "晋城市",
              children: [
                {
                  id: 140502,
                  name: "城区",
                  children: [],
                },
                {
                  id: 140521,
                  name: "沁水县",
                  children: [],
                },
                {
                  id: 140522,
                  name: "阳城县",
                  children: [],
                },
                {
                  id: 140524,
                  name: "陵川县",
                  children: [],
                },
                {
                  id: 140525,
                  name: "泽州县",
                  children: [],
                },
                {
                  id: 140581,
                  name: "高平市",
                  children: [],
                },
              ],
            },
            {
              id: 140600,
              name: "朔州市",
              children: [
                {
                  id: 140602,
                  name: "朔城区",
                  children: [],
                },
                {
                  id: 140603,
                  name: "平鲁区",
                  children: [],
                },
                {
                  id: 140621,
                  name: "山阴县",
                  children: [],
                },
                {
                  id: 140622,
                  name: "应县",
                  children: [],
                },
                {
                  id: 140623,
                  name: "右玉县",
                  children: [],
                },
                {
                  id: 140671,
                  name: "山西朔州经济开发区",
                  children: [],
                },
                {
                  id: 140681,
                  name: "怀仁市",
                  children: [],
                },
              ],
            },
            {
              id: 140700,
              name: "晋中市",
              children: [
                {
                  id: 140702,
                  name: "榆次区",
                  children: [],
                },
                {
                  id: 140703,
                  name: "太谷区",
                  children: [],
                },
                {
                  id: 140721,
                  name: "榆社县",
                  children: [],
                },
                {
                  id: 140722,
                  name: "左权县",
                  children: [],
                },
                {
                  id: 140723,
                  name: "和顺县",
                  children: [],
                },
                {
                  id: 140724,
                  name: "昔阳县",
                  children: [],
                },
                {
                  id: 140725,
                  name: "寿阳县",
                  children: [],
                },
                {
                  id: 140727,
                  name: "祁县",
                  children: [],
                },
                {
                  id: 140728,
                  name: "平遥县",
                  children: [],
                },
                {
                  id: 140729,
                  name: "灵石县",
                  children: [],
                },
                {
                  id: 140781,
                  name: "介休市",
                  children: [],
                },
              ],
            },
            {
              id: 140800,
              name: "运城市",
              children: [
                {
                  id: 140802,
                  name: "盐湖区",
                  children: [],
                },
                {
                  id: 140821,
                  name: "临猗县",
                  children: [],
                },
                {
                  id: 140822,
                  name: "万荣县",
                  children: [],
                },
                {
                  id: 140823,
                  name: "闻喜县",
                  children: [],
                },
                {
                  id: 140824,
                  name: "稷山县",
                  children: [],
                },
                {
                  id: 140825,
                  name: "新绛县",
                  children: [],
                },
                {
                  id: 140826,
                  name: "绛县",
                  children: [],
                },
                {
                  id: 140827,
                  name: "垣曲县",
                  children: [],
                },
                {
                  id: 140828,
                  name: "夏县",
                  children: [],
                },
                {
                  id: 140829,
                  name: "平陆县",
                  children: [],
                },
                {
                  id: 140830,
                  name: "芮城县",
                  children: [],
                },
                {
                  id: 140881,
                  name: "永济市",
                  children: [],
                },
                {
                  id: 140882,
                  name: "河津市",
                  children: [],
                },
              ],
            },
            {
              id: 140900,
              name: "忻州市",
              children: [
                {
                  id: 140902,
                  name: "忻府区",
                  children: [],
                },
                {
                  id: 140921,
                  name: "定襄县",
                  children: [],
                },
                {
                  id: 140922,
                  name: "五台县",
                  children: [],
                },
                {
                  id: 140923,
                  name: "代县",
                  children: [],
                },
                {
                  id: 140924,
                  name: "繁峙县",
                  children: [],
                },
                {
                  id: 140925,
                  name: "宁武县",
                  children: [],
                },
                {
                  id: 140926,
                  name: "静乐县",
                  children: [],
                },
                {
                  id: 140927,
                  name: "神池县",
                  children: [],
                },
                {
                  id: 140928,
                  name: "五寨县",
                  children: [],
                },
                {
                  id: 140929,
                  name: "岢岚县",
                  children: [],
                },
                {
                  id: 140930,
                  name: "河曲县",
                  children: [],
                },
                {
                  id: 140931,
                  name: "保德县",
                  children: [],
                },
                {
                  id: 140932,
                  name: "偏关县",
                  children: [],
                },
                {
                  id: 140971,
                  name: "五台山风景名胜区",
                  children: [],
                },
                {
                  id: 140981,
                  name: "原平市",
                  children: [],
                },
              ],
            },
            {
              id: 141000,
              name: "临汾市",
              children: [
                {
                  id: 141002,
                  name: "尧都区",
                  children: [],
                },
                {
                  id: 141021,
                  name: "曲沃县",
                  children: [],
                },
                {
                  id: 141022,
                  name: "翼城县",
                  children: [],
                },
                {
                  id: 141023,
                  name: "襄汾县",
                  children: [],
                },
                {
                  id: 141024,
                  name: "洪洞县",
                  children: [],
                },
                {
                  id: 141025,
                  name: "古县",
                  children: [],
                },
                {
                  id: 141026,
                  name: "安泽县",
                  children: [],
                },
                {
                  id: 141027,
                  name: "浮山县",
                  children: [],
                },
                {
                  id: 141028,
                  name: "吉县",
                  children: [],
                },
                {
                  id: 141029,
                  name: "乡宁县",
                  children: [],
                },
                {
                  id: 141030,
                  name: "大宁县",
                  children: [],
                },
                {
                  id: 141031,
                  name: "隰县",
                  children: [],
                },
                {
                  id: 141032,
                  name: "永和县",
                  children: [],
                },
                {
                  id: 141033,
                  name: "蒲县",
                  children: [],
                },
                {
                  id: 141034,
                  name: "汾西县",
                  children: [],
                },
                {
                  id: 141081,
                  name: "侯马市",
                  children: [],
                },
                {
                  id: 141082,
                  name: "霍州市",
                  children: [],
                },
              ],
            },
            {
              id: 141100,
              name: "吕梁市",
              children: [
                {
                  id: 141102,
                  name: "离石区",
                  children: [],
                },
                {
                  id: 141121,
                  name: "文水县",
                  children: [],
                },
                {
                  id: 141122,
                  name: "交城县",
                  children: [],
                },
                {
                  id: 141123,
                  name: "兴县",
                  children: [],
                },
                {
                  id: 141124,
                  name: "临县",
                  children: [],
                },
                {
                  id: 141125,
                  name: "柳林县",
                  children: [],
                },
                {
                  id: 141126,
                  name: "石楼县",
                  children: [],
                },
                {
                  id: 141127,
                  name: "岚县",
                  children: [],
                },
                {
                  id: 141128,
                  name: "方山县",
                  children: [],
                },
                {
                  id: 141129,
                  name: "中阳县",
                  children: [],
                },
                {
                  id: 141130,
                  name: "交口县",
                  children: [],
                },
                {
                  id: 141181,
                  name: "孝义市",
                  children: [],
                },
                {
                  id: 141182,
                  name: "汾阳市",
                  children: [],
                },
              ],
            },
          ],
        },
        {
          id: 150000,
          name: "内蒙古自治区",
          children: [
            {
              id: 150100,
              name: "呼和浩特市",
              children: [
                {
                  id: 150102,
                  name: "新城区",
                  children: [],
                },
                {
                  id: 150103,
                  name: "回民区",
                  children: [],
                },
                {
                  id: 150104,
                  name: "玉泉区",
                  children: [],
                },
                {
                  id: 150105,
                  name: "赛罕区",
                  children: [],
                },
                {
                  id: 150121,
                  name: "土默特左旗",
                  children: [],
                },
                {
                  id: 150122,
                  name: "托克托县",
                  children: [],
                },
                {
                  id: 150123,
                  name: "和林格尔县",
                  children: [],
                },
                {
                  id: 150124,
                  name: "清水河县",
                  children: [],
                },
                {
                  id: 150125,
                  name: "武川县",
                  children: [],
                },
                {
                  id: 150172,
                  name: "呼和浩特经济技术开发区",
                  children: [],
                },
              ],
            },
            {
              id: 150200,
              name: "包头市",
              children: [
                {
                  id: 150202,
                  name: "东河区",
                  children: [],
                },
                {
                  id: 150203,
                  name: "昆都仑区",
                  children: [],
                },
                {
                  id: 150204,
                  name: "青山区",
                  children: [],
                },
                {
                  id: 150205,
                  name: "石拐区",
                  children: [],
                },
                {
                  id: 150206,
                  name: "白云鄂博矿区",
                  children: [],
                },
                {
                  id: 150207,
                  name: "九原区",
                  children: [],
                },
                {
                  id: 150221,
                  name: "土默特右旗",
                  children: [],
                },
                {
                  id: 150222,
                  name: "固阳县",
                  children: [],
                },
                {
                  id: 150223,
                  name: "达尔罕茂明安联合旗",
                  children: [],
                },
                {
                  id: 150271,
                  name: "包头稀土高新技术产业开发区",
                  children: [],
                },
              ],
            },
            {
              id: 150300,
              name: "乌海市",
              children: [
                {
                  id: 150302,
                  name: "海勃湾区",
                  children: [],
                },
                {
                  id: 150303,
                  name: "海南区",
                  children: [],
                },
                {
                  id: 150304,
                  name: "乌达区",
                  children: [],
                },
              ],
            },
            {
              id: 150400,
              name: "赤峰市",
              children: [
                {
                  id: 150402,
                  name: "红山区",
                  children: [],
                },
                {
                  id: 150403,
                  name: "元宝山区",
                  children: [],
                },
                {
                  id: 150404,
                  name: "松山区",
                  children: [],
                },
                {
                  id: 150421,
                  name: "阿鲁科尔沁旗",
                  children: [],
                },
                {
                  id: 150422,
                  name: "巴林左旗",
                  children: [],
                },
                {
                  id: 150423,
                  name: "巴林右旗",
                  children: [],
                },
                {
                  id: 150424,
                  name: "林西县",
                  children: [],
                },
                {
                  id: 150425,
                  name: "克什克腾旗",
                  children: [],
                },
                {
                  id: 150426,
                  name: "翁牛特旗",
                  children: [],
                },
                {
                  id: 150428,
                  name: "喀喇沁旗",
                  children: [],
                },
                {
                  id: 150429,
                  name: "宁城县",
                  children: [],
                },
                {
                  id: 150430,
                  name: "敖汉旗",
                  children: [],
                },
              ],
            },
            {
              id: 150500,
              name: "通辽市",
              children: [
                {
                  id: 150502,
                  name: "科尔沁区",
                  children: [],
                },
                {
                  id: 150521,
                  name: "科尔沁左翼中旗",
                  children: [],
                },
                {
                  id: 150522,
                  name: "科尔沁左翼后旗",
                  children: [],
                },
                {
                  id: 150523,
                  name: "开鲁县",
                  children: [],
                },
                {
                  id: 150524,
                  name: "库伦旗",
                  children: [],
                },
                {
                  id: 150525,
                  name: "奈曼旗",
                  children: [],
                },
                {
                  id: 150526,
                  name: "扎鲁特旗",
                  children: [],
                },
                {
                  id: 150571,
                  name: "通辽经济技术开发区",
                  children: [],
                },
                {
                  id: 150581,
                  name: "霍林郭勒市",
                  children: [],
                },
              ],
            },
            {
              id: 150600,
              name: "鄂尔多斯市",
              children: [
                {
                  id: 150602,
                  name: "东胜区",
                  children: [],
                },
                {
                  id: 150603,
                  name: "康巴什区",
                  children: [],
                },
                {
                  id: 150621,
                  name: "达拉特旗",
                  children: [],
                },
                {
                  id: 150622,
                  name: "准格尔旗",
                  children: [],
                },
                {
                  id: 150623,
                  name: "鄂托克前旗",
                  children: [],
                },
                {
                  id: 150624,
                  name: "鄂托克旗",
                  children: [],
                },
                {
                  id: 150625,
                  name: "杭锦旗",
                  children: [],
                },
                {
                  id: 150626,
                  name: "乌审旗",
                  children: [],
                },
                {
                  id: 150627,
                  name: "伊金霍洛旗",
                  children: [],
                },
              ],
            },
            {
              id: 150700,
              name: "呼伦贝尔市",
              children: [
                {
                  id: 150702,
                  name: "海拉尔区",
                  children: [],
                },
                {
                  id: 150703,
                  name: "扎赉诺尔区",
                  children: [],
                },
                {
                  id: 150721,
                  name: "阿荣旗",
                  children: [],
                },
                {
                  id: 150722,
                  name: "莫力达瓦达斡尔族自治旗",
                  children: [],
                },
                {
                  id: 150723,
                  name: "鄂伦春自治旗",
                  children: [],
                },
                {
                  id: 150724,
                  name: "鄂温克族自治旗",
                  children: [],
                },
                {
                  id: 150725,
                  name: "陈巴尔虎旗",
                  children: [],
                },
                {
                  id: 150726,
                  name: "新巴尔虎左旗",
                  children: [],
                },
                {
                  id: 150727,
                  name: "新巴尔虎右旗",
                  children: [],
                },
                {
                  id: 150781,
                  name: "满洲里市",
                  children: [],
                },
                {
                  id: 150782,
                  name: "牙克石市",
                  children: [],
                },
                {
                  id: 150783,
                  name: "扎兰屯市",
                  children: [],
                },
                {
                  id: 150784,
                  name: "额尔古纳市",
                  children: [],
                },
                {
                  id: 150785,
                  name: "根河市",
                  children: [],
                },
              ],
            },
            {
              id: 150800,
              name: "巴彦淖尔市",
              children: [
                {
                  id: 150802,
                  name: "临河区",
                  children: [],
                },
                {
                  id: 150821,
                  name: "五原县",
                  children: [],
                },
                {
                  id: 150822,
                  name: "磴口县",
                  children: [],
                },
                {
                  id: 150823,
                  name: "乌拉特前旗",
                  children: [],
                },
                {
                  id: 150824,
                  name: "乌拉特中旗",
                  children: [],
                },
                {
                  id: 150825,
                  name: "乌拉特后旗",
                  children: [],
                },
                {
                  id: 150826,
                  name: "杭锦后旗",
                  children: [],
                },
              ],
            },
            {
              id: 150900,
              name: "乌兰察布市",
              children: [
                {
                  id: 150902,
                  name: "集宁区",
                  children: [],
                },
                {
                  id: 150921,
                  name: "卓资县",
                  children: [],
                },
                {
                  id: 150922,
                  name: "化德县",
                  children: [],
                },
                {
                  id: 150923,
                  name: "商都县",
                  children: [],
                },
                {
                  id: 150924,
                  name: "兴和县",
                  children: [],
                },
                {
                  id: 150925,
                  name: "凉城县",
                  children: [],
                },
                {
                  id: 150926,
                  name: "察哈尔右翼前旗",
                  children: [],
                },
                {
                  id: 150927,
                  name: "察哈尔右翼中旗",
                  children: [],
                },
                {
                  id: 150928,
                  name: "察哈尔右翼后旗",
                  children: [],
                },
                {
                  id: 150929,
                  name: "四子王旗",
                  children: [],
                },
                {
                  id: 150981,
                  name: "丰镇市",
                  children: [],
                },
              ],
            },
            {
              id: 152200,
              name: "兴安盟",
              children: [
                {
                  id: 152201,
                  name: "乌兰浩特市",
                  children: [],
                },
                {
                  id: 152202,
                  name: "阿尔山市",
                  children: [],
                },
                {
                  id: 152221,
                  name: "科尔沁右翼前旗",
                  children: [],
                },
                {
                  id: 152222,
                  name: "科尔沁右翼中旗",
                  children: [],
                },
                {
                  id: 152223,
                  name: "扎赉特旗",
                  children: [],
                },
                {
                  id: 152224,
                  name: "突泉县",
                  children: [],
                },
              ],
            },
            {
              id: 152500,
              name: "锡林郭勒盟",
              children: [
                {
                  id: 152501,
                  name: "二连浩特市",
                  children: [],
                },
                {
                  id: 152502,
                  name: "锡林浩特市",
                  children: [],
                },
                {
                  id: 152522,
                  name: "阿巴嘎旗",
                  children: [],
                },
                {
                  id: 152523,
                  name: "苏尼特左旗",
                  children: [],
                },
                {
                  id: 152524,
                  name: "苏尼特右旗",
                  children: [],
                },
                {
                  id: 152525,
                  name: "东乌珠穆沁旗",
                  children: [],
                },
                {
                  id: 152526,
                  name: "西乌珠穆沁旗",
                  children: [],
                },
                {
                  id: 152527,
                  name: "太仆寺旗",
                  children: [],
                },
                {
                  id: 152528,
                  name: "镶黄旗",
                  children: [],
                },
                {
                  id: 152529,
                  name: "正镶白旗",
                  children: [],
                },
                {
                  id: 152530,
                  name: "正蓝旗",
                  children: [],
                },
                {
                  id: 152531,
                  name: "多伦县",
                  children: [],
                },
                {
                  id: 152571,
                  name: "乌拉盖管委会",
                  children: [],
                },
              ],
            },
            {
              id: 152900,
              name: "阿拉善盟",
              children: [
                {
                  id: 152921,
                  name: "阿拉善左旗",
                  children: [],
                },
                {
                  id: 152922,
                  name: "阿拉善右旗",
                  children: [],
                },
                {
                  id: 152923,
                  name: "额济纳旗",
                  children: [],
                },
                {
                  id: 152971,
                  name: "内蒙古阿拉善高新技术产业开发区",
                  children: [],
                },
              ],
            },
          ],
        },
        {
          id: 210000,
          name: "辽宁省",
          children: [
            {
              id: 210100,
              name: "沈阳市",
              children: [
                {
                  id: 210102,
                  name: "和平区",
                  children: [],
                },
                {
                  id: 210103,
                  name: "沈河区",
                  children: [],
                },
                {
                  id: 210104,
                  name: "大东区",
                  children: [],
                },
                {
                  id: 210105,
                  name: "皇姑区",
                  children: [],
                },
                {
                  id: 210106,
                  name: "铁西区",
                  children: [],
                },
                {
                  id: 210111,
                  name: "苏家屯区",
                  children: [],
                },
                {
                  id: 210112,
                  name: "浑南区",
                  children: [],
                },
                {
                  id: 210113,
                  name: "沈北新区",
                  children: [],
                },
                {
                  id: 210114,
                  name: "于洪区",
                  children: [],
                },
                {
                  id: 210115,
                  name: "辽中区",
                  children: [],
                },
                {
                  id: 210123,
                  name: "康平县",
                  children: [],
                },
                {
                  id: 210124,
                  name: "法库县",
                  children: [],
                },
                {
                  id: 210181,
                  name: "新民市",
                  children: [],
                },
              ],
            },
            {
              id: 210200,
              name: "大连市",
              children: [
                {
                  id: 210202,
                  name: "中山区",
                  children: [],
                },
                {
                  id: 210203,
                  name: "西岗区",
                  children: [],
                },
                {
                  id: 210204,
                  name: "沙河口区",
                  children: [],
                },
                {
                  id: 210211,
                  name: "甘井子区",
                  children: [],
                },
                {
                  id: 210212,
                  name: "旅顺口区",
                  children: [],
                },
                {
                  id: 210213,
                  name: "金州区",
                  children: [],
                },
                {
                  id: 210214,
                  name: "普兰店区",
                  children: [],
                },
                {
                  id: 210224,
                  name: "长海县",
                  children: [],
                },
                {
                  id: 210281,
                  name: "瓦房店市",
                  children: [],
                },
                {
                  id: 210283,
                  name: "庄河市",
                  children: [],
                },
              ],
            },
            {
              id: 210300,
              name: "鞍山市",
              children: [
                {
                  id: 210302,
                  name: "铁东区",
                  children: [],
                },
                {
                  id: 210303,
                  name: "铁西区",
                  children: [],
                },
                {
                  id: 210304,
                  name: "立山区",
                  children: [],
                },
                {
                  id: 210311,
                  name: "千山区",
                  children: [],
                },
                {
                  id: 210321,
                  name: "台安县",
                  children: [],
                },
                {
                  id: 210323,
                  name: "岫岩满族自治县",
                  children: [],
                },
                {
                  id: 210381,
                  name: "海城市",
                  children: [],
                },
              ],
            },
            {
              id: 210400,
              name: "抚顺市",
              children: [
                {
                  id: 210402,
                  name: "新抚区",
                  children: [],
                },
                {
                  id: 210403,
                  name: "东洲区",
                  children: [],
                },
                {
                  id: 210404,
                  name: "望花区",
                  children: [],
                },
                {
                  id: 210411,
                  name: "顺城区",
                  children: [],
                },
                {
                  id: 210421,
                  name: "抚顺县",
                  children: [],
                },
                {
                  id: 210422,
                  name: "新宾满族自治县",
                  children: [],
                },
                {
                  id: 210423,
                  name: "清原满族自治县",
                  children: [],
                },
              ],
            },
            {
              id: 210500,
              name: "本溪市",
              children: [
                {
                  id: 210502,
                  name: "平山区",
                  children: [],
                },
                {
                  id: 210503,
                  name: "溪湖区",
                  children: [],
                },
                {
                  id: 210504,
                  name: "明山区",
                  children: [],
                },
                {
                  id: 210505,
                  name: "南芬区",
                  children: [],
                },
                {
                  id: 210521,
                  name: "本溪满族自治县",
                  children: [],
                },
                {
                  id: 210522,
                  name: "桓仁满族自治县",
                  children: [],
                },
              ],
            },
            {
              id: 210600,
              name: "丹东市",
              children: [
                {
                  id: 210602,
                  name: "元宝区",
                  children: [],
                },
                {
                  id: 210603,
                  name: "振兴区",
                  children: [],
                },
                {
                  id: 210604,
                  name: "振安区",
                  children: [],
                },
                {
                  id: 210624,
                  name: "宽甸满族自治县",
                  children: [],
                },
                {
                  id: 210681,
                  name: "东港市",
                  children: [],
                },
                {
                  id: 210682,
                  name: "凤城市",
                  children: [],
                },
              ],
            },
            {
              id: 210700,
              name: "锦州市",
              children: [
                {
                  id: 210702,
                  name: "古塔区",
                  children: [],
                },
                {
                  id: 210703,
                  name: "凌河区",
                  children: [],
                },
                {
                  id: 210711,
                  name: "太和区",
                  children: [],
                },
                {
                  id: 210726,
                  name: "黑山县",
                  children: [],
                },
                {
                  id: 210727,
                  name: "义县",
                  children: [],
                },
                {
                  id: 210781,
                  name: "凌海市",
                  children: [],
                },
                {
                  id: 210782,
                  name: "北镇市",
                  children: [],
                },
              ],
            },
            {
              id: 210800,
              name: "营口市",
              children: [
                {
                  id: 210802,
                  name: "站前区",
                  children: [],
                },
                {
                  id: 210803,
                  name: "西市区",
                  children: [],
                },
                {
                  id: 210804,
                  name: "鲅鱼圈区",
                  children: [],
                },
                {
                  id: 210811,
                  name: "老边区",
                  children: [],
                },
                {
                  id: 210881,
                  name: "盖州市",
                  children: [],
                },
                {
                  id: 210882,
                  name: "大石桥市",
                  children: [],
                },
              ],
            },
            {
              id: 210900,
              name: "阜新市",
              children: [
                {
                  id: 210902,
                  name: "海州区",
                  children: [],
                },
                {
                  id: 210903,
                  name: "新邱区",
                  children: [],
                },
                {
                  id: 210904,
                  name: "太平区",
                  children: [],
                },
                {
                  id: 210905,
                  name: "清河门区",
                  children: [],
                },
                {
                  id: 210911,
                  name: "细河区",
                  children: [],
                },
                {
                  id: 210921,
                  name: "阜新蒙古族自治县",
                  children: [],
                },
                {
                  id: 210922,
                  name: "彰武县",
                  children: [],
                },
              ],
            },
            {
              id: 211000,
              name: "辽阳市",
              children: [
                {
                  id: 211002,
                  name: "白塔区",
                  children: [],
                },
                {
                  id: 211003,
                  name: "文圣区",
                  children: [],
                },
                {
                  id: 211004,
                  name: "宏伟区",
                  children: [],
                },
                {
                  id: 211005,
                  name: "弓长岭区",
                  children: [],
                },
                {
                  id: 211011,
                  name: "太子河区",
                  children: [],
                },
                {
                  id: 211021,
                  name: "辽阳县",
                  children: [],
                },
                {
                  id: 211081,
                  name: "灯塔市",
                  children: [],
                },
              ],
            },
            {
              id: 211100,
              name: "盘锦市",
              children: [
                {
                  id: 211102,
                  name: "双台子区",
                  children: [],
                },
                {
                  id: 211103,
                  name: "兴隆台区",
                  children: [],
                },
                {
                  id: 211104,
                  name: "大洼区",
                  children: [],
                },
                {
                  id: 211122,
                  name: "盘山县",
                  children: [],
                },
              ],
            },
            {
              id: 211200,
              name: "铁岭市",
              children: [
                {
                  id: 211202,
                  name: "银州区",
                  children: [],
                },
                {
                  id: 211204,
                  name: "清河区",
                  children: [],
                },
                {
                  id: 211221,
                  name: "铁岭县",
                  children: [],
                },
                {
                  id: 211223,
                  name: "西丰县",
                  children: [],
                },
                {
                  id: 211224,
                  name: "昌图县",
                  children: [],
                },
                {
                  id: 211281,
                  name: "调兵山市",
                  children: [],
                },
                {
                  id: 211282,
                  name: "开原市",
                  children: [],
                },
              ],
            },
            {
              id: 211300,
              name: "朝阳市",
              children: [
                {
                  id: 211302,
                  name: "双塔区",
                  children: [],
                },
                {
                  id: 211303,
                  name: "龙城区",
                  children: [],
                },
                {
                  id: 211321,
                  name: "朝阳县",
                  children: [],
                },
                {
                  id: 211322,
                  name: "建平县",
                  children: [],
                },
                {
                  id: 211324,
                  name: "喀喇沁左翼蒙古族自治县",
                  children: [],
                },
                {
                  id: 211381,
                  name: "北票市",
                  children: [],
                },
                {
                  id: 211382,
                  name: "凌源市",
                  children: [],
                },
              ],
            },
            {
              id: 211400,
              name: "葫芦岛市",
              children: [
                {
                  id: 211402,
                  name: "连山区",
                  children: [],
                },
                {
                  id: 211403,
                  name: "龙港区",
                  children: [],
                },
                {
                  id: 211404,
                  name: "南票区",
                  children: [],
                },
                {
                  id: 211421,
                  name: "绥中县",
                  children: [],
                },
                {
                  id: 211422,
                  name: "建昌县",
                  children: [],
                },
                {
                  id: 211481,
                  name: "兴城市",
                  children: [],
                },
              ],
            },
          ],
        },
        {
          id: 220000,
          name: "吉林省",
          children: [
            {
              id: 220100,
              name: "长春市",
              children: [
                {
                  id: 220102,
                  name: "南关区",
                  children: [],
                },
                {
                  id: 220103,
                  name: "宽城区",
                  children: [],
                },
                {
                  id: 220104,
                  name: "朝阳区",
                  children: [],
                },
                {
                  id: 220105,
                  name: "二道区",
                  children: [],
                },
                {
                  id: 220106,
                  name: "绿园区",
                  children: [],
                },
                {
                  id: 220112,
                  name: "双阳区",
                  children: [],
                },
                {
                  id: 220113,
                  name: "九台区",
                  children: [],
                },
                {
                  id: 220122,
                  name: "农安县",
                  children: [],
                },
                {
                  id: 220171,
                  name: "长春经济技术开发区",
                  children: [],
                },
                {
                  id: 220172,
                  name: "长春净月高新技术产业开发区",
                  children: [],
                },
                {
                  id: 220173,
                  name: "长春高新技术产业开发区",
                  children: [],
                },
                {
                  id: 220174,
                  name: "长春汽车经济技术开发区",
                  children: [],
                },
                {
                  id: 220182,
                  name: "榆树市",
                  children: [],
                },
                {
                  id: 220183,
                  name: "德惠市",
                  children: [],
                },
                {
                  id: 220184,
                  name: "公主岭市",
                  children: [],
                },
              ],
            },
            {
              id: 220200,
              name: "吉林市",
              children: [
                {
                  id: 220202,
                  name: "昌邑区",
                  children: [],
                },
                {
                  id: 220203,
                  name: "龙潭区",
                  children: [],
                },
                {
                  id: 220204,
                  name: "船营区",
                  children: [],
                },
                {
                  id: 220211,
                  name: "丰满区",
                  children: [],
                },
                {
                  id: 220221,
                  name: "永吉县",
                  children: [],
                },
                {
                  id: 220271,
                  name: "吉林经济开发区",
                  children: [],
                },
                {
                  id: 220272,
                  name: "吉林高新技术产业开发区",
                  children: [],
                },
                {
                  id: 220273,
                  name: "吉林中国新加坡食品区",
                  children: [],
                },
                {
                  id: 220281,
                  name: "蛟河市",
                  children: [],
                },
                {
                  id: 220282,
                  name: "桦甸市",
                  children: [],
                },
                {
                  id: 220283,
                  name: "舒兰市",
                  children: [],
                },
                {
                  id: 220284,
                  name: "磐石市",
                  children: [],
                },
              ],
            },
            {
              id: 220300,
              name: "四平市",
              children: [
                {
                  id: 220302,
                  name: "铁西区",
                  children: [],
                },
                {
                  id: 220303,
                  name: "铁东区",
                  children: [],
                },
                {
                  id: 220322,
                  name: "梨树县",
                  children: [],
                },
                {
                  id: 220323,
                  name: "伊通满族自治县",
                  children: [],
                },
                {
                  id: 220382,
                  name: "双辽市",
                  children: [],
                },
              ],
            },
            {
              id: 220400,
              name: "辽源市",
              children: [
                {
                  id: 220402,
                  name: "龙山区",
                  children: [],
                },
                {
                  id: 220403,
                  name: "西安区",
                  children: [],
                },
                {
                  id: 220421,
                  name: "东丰县",
                  children: [],
                },
                {
                  id: 220422,
                  name: "东辽县",
                  children: [],
                },
              ],
            },
            {
              id: 220500,
              name: "通化市",
              children: [
                {
                  id: 220502,
                  name: "东昌区",
                  children: [],
                },
                {
                  id: 220503,
                  name: "二道江区",
                  children: [],
                },
                {
                  id: 220521,
                  name: "通化县",
                  children: [],
                },
                {
                  id: 220523,
                  name: "辉南县",
                  children: [],
                },
                {
                  id: 220524,
                  name: "柳河县",
                  children: [],
                },
                {
                  id: 220581,
                  name: "梅河口市",
                  children: [],
                },
                {
                  id: 220582,
                  name: "集安市",
                  children: [],
                },
              ],
            },
            {
              id: 220600,
              name: "白山市",
              children: [
                {
                  id: 220602,
                  name: "浑江区",
                  children: [],
                },
                {
                  id: 220605,
                  name: "江源区",
                  children: [],
                },
                {
                  id: 220621,
                  name: "抚松县",
                  children: [],
                },
                {
                  id: 220622,
                  name: "靖宇县",
                  children: [],
                },
                {
                  id: 220623,
                  name: "长白朝鲜族自治县",
                  children: [],
                },
                {
                  id: 220681,
                  name: "临江市",
                  children: [],
                },
              ],
            },
            {
              id: 220700,
              name: "松原市",
              children: [
                {
                  id: 220702,
                  name: "宁江区",
                  children: [],
                },
                {
                  id: 220721,
                  name: "前郭尔罗斯蒙古族自治县",
                  children: [],
                },
                {
                  id: 220722,
                  name: "长岭县",
                  children: [],
                },
                {
                  id: 220723,
                  name: "乾安县",
                  children: [],
                },
                {
                  id: 220771,
                  name: "吉林松原经济开发区",
                  children: [],
                },
                {
                  id: 220781,
                  name: "扶余市",
                  children: [],
                },
              ],
            },
            {
              id: 220800,
              name: "白城市",
              children: [
                {
                  id: 220802,
                  name: "洮北区",
                  children: [],
                },
                {
                  id: 220821,
                  name: "镇赉县",
                  children: [],
                },
                {
                  id: 220822,
                  name: "通榆县",
                  children: [],
                },
                {
                  id: 220871,
                  name: "吉林白城经济开发区",
                  children: [],
                },
                {
                  id: 220881,
                  name: "洮南市",
                  children: [],
                },
                {
                  id: 220882,
                  name: "大安市",
                  children: [],
                },
              ],
            },
            {
              id: 222400,
              name: "延边朝鲜族自治州",
              children: [
                {
                  id: 222401,
                  name: "延吉市",
                  children: [],
                },
                {
                  id: 222402,
                  name: "图们市",
                  children: [],
                },
                {
                  id: 222403,
                  name: "敦化市",
                  children: [],
                },
                {
                  id: 222404,
                  name: "珲春市",
                  children: [],
                },
                {
                  id: 222405,
                  name: "龙井市",
                  children: [],
                },
                {
                  id: 222406,
                  name: "和龙市",
                  children: [],
                },
                {
                  id: 222424,
                  name: "汪清县",
                  children: [],
                },
                {
                  id: 222426,
                  name: "安图县",
                  children: [],
                },
              ],
            },
          ],
        },
        {
          id: 230000,
          name: "黑龙江省",
          children: [
            {
              id: 230100,
              name: "哈尔滨市",
              children: [
                {
                  id: 230102,
                  name: "道里区",
                  children: [],
                },
                {
                  id: 230103,
                  name: "南岗区",
                  children: [],
                },
                {
                  id: 230104,
                  name: "道外区",
                  children: [],
                },
                {
                  id: 230108,
                  name: "平房区",
                  children: [],
                },
                {
                  id: 230109,
                  name: "松北区",
                  children: [],
                },
                {
                  id: 230110,
                  name: "香坊区",
                  children: [],
                },
                {
                  id: 230111,
                  name: "呼兰区",
                  children: [],
                },
                {
                  id: 230112,
                  name: "阿城区",
                  children: [],
                },
                {
                  id: 230113,
                  name: "双城区",
                  children: [],
                },
                {
                  id: 230123,
                  name: "依兰县",
                  children: [],
                },
                {
                  id: 230124,
                  name: "方正县",
                  children: [],
                },
                {
                  id: 230125,
                  name: "宾县",
                  children: [],
                },
                {
                  id: 230126,
                  name: "巴彦县",
                  children: [],
                },
                {
                  id: 230127,
                  name: "木兰县",
                  children: [],
                },
                {
                  id: 230128,
                  name: "通河县",
                  children: [],
                },
                {
                  id: 230129,
                  name: "延寿县",
                  children: [],
                },
                {
                  id: 230183,
                  name: "尚志市",
                  children: [],
                },
                {
                  id: 230184,
                  name: "五常市",
                  children: [],
                },
              ],
            },
            {
              id: 230200,
              name: "齐齐哈尔市",
              children: [
                {
                  id: 230202,
                  name: "龙沙区",
                  children: [],
                },
                {
                  id: 230203,
                  name: "建华区",
                  children: [],
                },
                {
                  id: 230204,
                  name: "铁锋区",
                  children: [],
                },
                {
                  id: 230205,
                  name: "昂昂溪区",
                  children: [],
                },
                {
                  id: 230206,
                  name: "富拉尔基区",
                  children: [],
                },
                {
                  id: 230207,
                  name: "碾子山区",
                  children: [],
                },
                {
                  id: 230208,
                  name: "梅里斯达斡尔族区",
                  children: [],
                },
                {
                  id: 230221,
                  name: "龙江县",
                  children: [],
                },
                {
                  id: 230223,
                  name: "依安县",
                  children: [],
                },
                {
                  id: 230224,
                  name: "泰来县",
                  children: [],
                },
                {
                  id: 230225,
                  name: "甘南县",
                  children: [],
                },
                {
                  id: 230227,
                  name: "富裕县",
                  children: [],
                },
                {
                  id: 230229,
                  name: "克山县",
                  children: [],
                },
                {
                  id: 230230,
                  name: "克东县",
                  children: [],
                },
                {
                  id: 230231,
                  name: "拜泉县",
                  children: [],
                },
                {
                  id: 230281,
                  name: "讷河市",
                  children: [],
                },
              ],
            },
            {
              id: 230300,
              name: "鸡西市",
              children: [
                {
                  id: 230302,
                  name: "鸡冠区",
                  children: [],
                },
                {
                  id: 230303,
                  name: "恒山区",
                  children: [],
                },
                {
                  id: 230304,
                  name: "滴道区",
                  children: [],
                },
                {
                  id: 230305,
                  name: "梨树区",
                  children: [],
                },
                {
                  id: 230306,
                  name: "城子河区",
                  children: [],
                },
                {
                  id: 230307,
                  name: "麻山区",
                  children: [],
                },
                {
                  id: 230321,
                  name: "鸡东县",
                  children: [],
                },
                {
                  id: 230381,
                  name: "虎林市",
                  children: [],
                },
                {
                  id: 230382,
                  name: "密山市",
                  children: [],
                },
              ],
            },
            {
              id: 230400,
              name: "鹤岗市",
              children: [
                {
                  id: 230402,
                  name: "向阳区",
                  children: [],
                },
                {
                  id: 230403,
                  name: "工农区",
                  children: [],
                },
                {
                  id: 230404,
                  name: "南山区",
                  children: [],
                },
                {
                  id: 230405,
                  name: "兴安区",
                  children: [],
                },
                {
                  id: 230406,
                  name: "东山区",
                  children: [],
                },
                {
                  id: 230407,
                  name: "兴山区",
                  children: [],
                },
                {
                  id: 230421,
                  name: "萝北县",
                  children: [],
                },
                {
                  id: 230422,
                  name: "绥滨县",
                  children: [],
                },
              ],
            },
            {
              id: 230500,
              name: "双鸭山市",
              children: [
                {
                  id: 230502,
                  name: "尖山区",
                  children: [],
                },
                {
                  id: 230503,
                  name: "岭东区",
                  children: [],
                },
                {
                  id: 230505,
                  name: "四方台区",
                  children: [],
                },
                {
                  id: 230506,
                  name: "宝山区",
                  children: [],
                },
                {
                  id: 230521,
                  name: "集贤县",
                  children: [],
                },
                {
                  id: 230522,
                  name: "友谊县",
                  children: [],
                },
                {
                  id: 230523,
                  name: "宝清县",
                  children: [],
                },
                {
                  id: 230524,
                  name: "饶河县",
                  children: [],
                },
              ],
            },
            {
              id: 230600,
              name: "大庆市",
              children: [
                {
                  id: 230602,
                  name: "萨尔图区",
                  children: [],
                },
                {
                  id: 230603,
                  name: "龙凤区",
                  children: [],
                },
                {
                  id: 230604,
                  name: "让胡路区",
                  children: [],
                },
                {
                  id: 230605,
                  name: "红岗区",
                  children: [],
                },
                {
                  id: 230606,
                  name: "大同区",
                  children: [],
                },
                {
                  id: 230621,
                  name: "肇州县",
                  children: [],
                },
                {
                  id: 230622,
                  name: "肇源县",
                  children: [],
                },
                {
                  id: 230623,
                  name: "林甸县",
                  children: [],
                },
                {
                  id: 230624,
                  name: "杜尔伯特蒙古族自治县",
                  children: [],
                },
                {
                  id: 230671,
                  name: "大庆高新技术产业开发区",
                  children: [],
                },
              ],
            },
            {
              id: 230700,
              name: "伊春市",
              children: [
                {
                  id: 230717,
                  name: "伊美区",
                  children: [],
                },
                {
                  id: 230718,
                  name: "乌翠区",
                  children: [],
                },
                {
                  id: 230719,
                  name: "友好区",
                  children: [],
                },
                {
                  id: 230722,
                  name: "嘉荫县",
                  children: [],
                },
                {
                  id: 230723,
                  name: "汤旺县",
                  children: [],
                },
                {
                  id: 230724,
                  name: "丰林县",
                  children: [],
                },
                {
                  id: 230725,
                  name: "大箐山县",
                  children: [],
                },
                {
                  id: 230726,
                  name: "南岔县",
                  children: [],
                },
                {
                  id: 230751,
                  name: "金林区",
                  children: [],
                },
                {
                  id: 230781,
                  name: "铁力市",
                  children: [],
                },
              ],
            },
            {
              id: 230800,
              name: "佳木斯市",
              children: [
                {
                  id: 230803,
                  name: "向阳区",
                  children: [],
                },
                {
                  id: 230804,
                  name: "前进区",
                  children: [],
                },
                {
                  id: 230805,
                  name: "东风区",
                  children: [],
                },
                {
                  id: 230811,
                  name: "郊区",
                  children: [],
                },
                {
                  id: 230822,
                  name: "桦南县",
                  children: [],
                },
                {
                  id: 230826,
                  name: "桦川县",
                  children: [],
                },
                {
                  id: 230828,
                  name: "汤原县",
                  children: [],
                },
                {
                  id: 230881,
                  name: "同江市",
                  children: [],
                },
                {
                  id: 230882,
                  name: "富锦市",
                  children: [],
                },
                {
                  id: 230883,
                  name: "抚远市",
                  children: [],
                },
              ],
            },
            {
              id: 230900,
              name: "七台河市",
              children: [
                {
                  id: 230902,
                  name: "新兴区",
                  children: [],
                },
                {
                  id: 230903,
                  name: "桃山区",
                  children: [],
                },
                {
                  id: 230904,
                  name: "茄子河区",
                  children: [],
                },
                {
                  id: 230921,
                  name: "勃利县",
                  children: [],
                },
              ],
            },
            {
              id: 231000,
              name: "牡丹江市",
              children: [
                {
                  id: 231002,
                  name: "东安区",
                  children: [],
                },
                {
                  id: 231003,
                  name: "阳明区",
                  children: [],
                },
                {
                  id: 231004,
                  name: "爱民区",
                  children: [],
                },
                {
                  id: 231005,
                  name: "西安区",
                  children: [],
                },
                {
                  id: 231025,
                  name: "林口县",
                  children: [],
                },
                {
                  id: 231071,
                  name: "牡丹江经济技术开发区",
                  children: [],
                },
                {
                  id: 231081,
                  name: "绥芬河市",
                  children: [],
                },
                {
                  id: 231083,
                  name: "海林市",
                  children: [],
                },
                {
                  id: 231084,
                  name: "宁安市",
                  children: [],
                },
                {
                  id: 231085,
                  name: "穆棱市",
                  children: [],
                },
                {
                  id: 231086,
                  name: "东宁市",
                  children: [],
                },
              ],
            },
            {
              id: 231100,
              name: "黑河市",
              children: [
                {
                  id: 231102,
                  name: "爱辉区",
                  children: [],
                },
                {
                  id: 231123,
                  name: "逊克县",
                  children: [],
                },
                {
                  id: 231124,
                  name: "孙吴县",
                  children: [],
                },
                {
                  id: 231181,
                  name: "北安市",
                  children: [],
                },
                {
                  id: 231182,
                  name: "五大连池市",
                  children: [],
                },
                {
                  id: 231183,
                  name: "嫩江市",
                  children: [],
                },
              ],
            },
            {
              id: 231200,
              name: "绥化市",
              children: [
                {
                  id: 231202,
                  name: "北林区",
                  children: [],
                },
                {
                  id: 231221,
                  name: "望奎县",
                  children: [],
                },
                {
                  id: 231222,
                  name: "兰西县",
                  children: [],
                },
                {
                  id: 231223,
                  name: "青冈县",
                  children: [],
                },
                {
                  id: 231224,
                  name: "庆安县",
                  children: [],
                },
                {
                  id: 231225,
                  name: "明水县",
                  children: [],
                },
                {
                  id: 231226,
                  name: "绥棱县",
                  children: [],
                },
                {
                  id: 231281,
                  name: "安达市",
                  children: [],
                },
                {
                  id: 231282,
                  name: "肇东市",
                  children: [],
                },
                {
                  id: 231283,
                  name: "海伦市",
                  children: [],
                },
              ],
            },
            {
              id: 232700,
              name: "大兴安岭地区",
              children: [
                {
                  id: 232701,
                  name: "漠河市",
                  children: [],
                },
                {
                  id: 232721,
                  name: "呼玛县",
                  children: [],
                },
                {
                  id: 232722,
                  name: "塔河县",
                  children: [],
                },
                {
                  id: 232761,
                  name: "加格达奇区",
                  children: [],
                },
                {
                  id: 232762,
                  name: "松岭区",
                  children: [],
                },
                {
                  id: 232763,
                  name: "新林区",
                  children: [],
                },
                {
                  id: 232764,
                  name: "呼中区",
                  children: [],
                },
              ],
            },
          ],
        },
        {
          id: 310000,
          name: "上海市",
          children: [
            {
              id: 310100,
              name: "上海市",
              children: [
                {
                  id: 310101,
                  name: "黄浦区",
                  children: [],
                },
                {
                  id: 310104,
                  name: "徐汇区",
                  children: [],
                },
                {
                  id: 310105,
                  name: "长宁区",
                  children: [],
                },
                {
                  id: 310106,
                  name: "静安区",
                  children: [],
                },
                {
                  id: 310107,
                  name: "普陀区",
                  children: [],
                },
                {
                  id: 310109,
                  name: "虹口区",
                  children: [],
                },
                {
                  id: 310110,
                  name: "杨浦区",
                  children: [],
                },
                {
                  id: 310112,
                  name: "闵行区",
                  children: [],
                },
                {
                  id: 310113,
                  name: "宝山区",
                  children: [],
                },
                {
                  id: 310114,
                  name: "嘉定区",
                  children: [],
                },
                {
                  id: 310115,
                  name: "浦东新区",
                  children: [],
                },
                {
                  id: 310116,
                  name: "金山区",
                  children: [],
                },
                {
                  id: 310117,
                  name: "松江区",
                  children: [],
                },
                {
                  id: 310118,
                  name: "青浦区",
                  children: [],
                },
                {
                  id: 310120,
                  name: "奉贤区",
                  children: [],
                },
                {
                  id: 310151,
                  name: "崇明区",
                  children: [],
                },
              ],
            },
          ],
        },
        {
          id: 320000,
          name: "江苏省",
          children: [
            {
              id: 320100,
              name: "南京市",
              children: [
                {
                  id: 320102,
                  name: "玄武区",
                  children: [],
                },
                {
                  id: 320104,
                  name: "秦淮区",
                  children: [],
                },
                {
                  id: 320105,
                  name: "建邺区",
                  children: [],
                },
                {
                  id: 320106,
                  name: "鼓楼区",
                  children: [],
                },
                {
                  id: 320111,
                  name: "浦口区",
                  children: [],
                },
                {
                  id: 320113,
                  name: "栖霞区",
                  children: [],
                },
                {
                  id: 320114,
                  name: "雨花台区",
                  children: [],
                },
                {
                  id: 320115,
                  name: "江宁区",
                  children: [],
                },
                {
                  id: 320116,
                  name: "六合区",
                  children: [],
                },
                {
                  id: 320117,
                  name: "溧水区",
                  children: [],
                },
                {
                  id: 320118,
                  name: "高淳区",
                  children: [],
                },
              ],
            },
            {
              id: 320200,
              name: "无锡市",
              children: [
                {
                  id: 320205,
                  name: "锡山区",
                  children: [],
                },
                {
                  id: 320206,
                  name: "惠山区",
                  children: [],
                },
                {
                  id: 320211,
                  name: "滨湖区",
                  children: [],
                },
                {
                  id: 320213,
                  name: "梁溪区",
                  children: [],
                },
                {
                  id: 320214,
                  name: "新吴区",
                  children: [],
                },
                {
                  id: 320281,
                  name: "江阴市",
                  children: [],
                },
                {
                  id: 320282,
                  name: "宜兴市",
                  children: [],
                },
              ],
            },
            {
              id: 320300,
              name: "徐州市",
              children: [
                {
                  id: 320302,
                  name: "鼓楼区",
                  children: [],
                },
                {
                  id: 320303,
                  name: "云龙区",
                  children: [],
                },
                {
                  id: 320305,
                  name: "贾汪区",
                  children: [],
                },
                {
                  id: 320311,
                  name: "泉山区",
                  children: [],
                },
                {
                  id: 320312,
                  name: "铜山区",
                  children: [],
                },
                {
                  id: 320321,
                  name: "丰县",
                  children: [],
                },
                {
                  id: 320322,
                  name: "沛县",
                  children: [],
                },
                {
                  id: 320324,
                  name: "睢宁县",
                  children: [],
                },
                {
                  id: 320371,
                  name: "徐州经济技术开发区",
                  children: [],
                },
                {
                  id: 320381,
                  name: "新沂市",
                  children: [],
                },
                {
                  id: 320382,
                  name: "邳州市",
                  children: [],
                },
              ],
            },
            {
              id: 320400,
              name: "常州市",
              children: [
                {
                  id: 320402,
                  name: "天宁区",
                  children: [],
                },
                {
                  id: 320404,
                  name: "钟楼区",
                  children: [],
                },
                {
                  id: 320411,
                  name: "新北区",
                  children: [],
                },
                {
                  id: 320412,
                  name: "武进区",
                  children: [],
                },
                {
                  id: 320413,
                  name: "金坛区",
                  children: [],
                },
                {
                  id: 320481,
                  name: "溧阳市",
                  children: [],
                },
              ],
            },
            {
              id: 320500,
              name: "苏州市",
              children: [
                {
                  id: 320505,
                  name: "虎丘区",
                  children: [],
                },
                {
                  id: 320506,
                  name: "吴中区",
                  children: [],
                },
                {
                  id: 320507,
                  name: "相城区",
                  children: [],
                },
                {
                  id: 320508,
                  name: "姑苏区",
                  children: [],
                },
                {
                  id: 320509,
                  name: "吴江区",
                  children: [],
                },
                {
                  id: 320571,
                  name: "苏州工业园区",
                  children: [],
                },
                {
                  id: 320581,
                  name: "常熟市",
                  children: [],
                },
                {
                  id: 320582,
                  name: "张家港市",
                  children: [],
                },
                {
                  id: 320583,
                  name: "昆山市",
                  children: [],
                },
                {
                  id: 320585,
                  name: "太仓市",
                  children: [],
                },
              ],
            },
            {
              id: 320600,
              name: "南通市",
              children: [
                {
                  id: 320612,
                  name: "通州区",
                  children: [],
                },
                {
                  id: 320613,
                  name: "崇川区",
                  children: [],
                },
                {
                  id: 320614,
                  name: "海门区",
                  children: [],
                },
                {
                  id: 320623,
                  name: "如东县",
                  children: [],
                },
                {
                  id: 320671,
                  name: "南通经济技术开发区",
                  children: [],
                },
                {
                  id: 320681,
                  name: "启东市",
                  children: [],
                },
                {
                  id: 320682,
                  name: "如皋市",
                  children: [],
                },
                {
                  id: 320685,
                  name: "海安市",
                  children: [],
                },
              ],
            },
            {
              id: 320700,
              name: "连云港市",
              children: [
                {
                  id: 320703,
                  name: "连云区",
                  children: [],
                },
                {
                  id: 320706,
                  name: "海州区",
                  children: [],
                },
                {
                  id: 320707,
                  name: "赣榆区",
                  children: [],
                },
                {
                  id: 320722,
                  name: "东海县",
                  children: [],
                },
                {
                  id: 320723,
                  name: "灌云县",
                  children: [],
                },
                {
                  id: 320724,
                  name: "灌南县",
                  children: [],
                },
                {
                  id: 320771,
                  name: "连云港经济技术开发区",
                  children: [],
                },
                {
                  id: 320772,
                  name: "连云港高新技术产业开发区",
                  children: [],
                },
              ],
            },
            {
              id: 320800,
              name: "淮安市",
              children: [
                {
                  id: 320803,
                  name: "淮安区",
                  children: [],
                },
                {
                  id: 320804,
                  name: "淮阴区",
                  children: [],
                },
                {
                  id: 320812,
                  name: "清江浦区",
                  children: [],
                },
                {
                  id: 320813,
                  name: "洪泽区",
                  children: [],
                },
                {
                  id: 320826,
                  name: "涟水县",
                  children: [],
                },
                {
                  id: 320830,
                  name: "盱眙县",
                  children: [],
                },
                {
                  id: 320831,
                  name: "金湖县",
                  children: [],
                },
                {
                  id: 320871,
                  name: "淮安经济技术开发区",
                  children: [],
                },
              ],
            },
            {
              id: 320900,
              name: "盐城市",
              children: [
                {
                  id: 320902,
                  name: "亭湖区",
                  children: [],
                },
                {
                  id: 320903,
                  name: "盐都区",
                  children: [],
                },
                {
                  id: 320904,
                  name: "大丰区",
                  children: [],
                },
                {
                  id: 320921,
                  name: "响水县",
                  children: [],
                },
                {
                  id: 320922,
                  name: "滨海县",
                  children: [],
                },
                {
                  id: 320923,
                  name: "阜宁县",
                  children: [],
                },
                {
                  id: 320924,
                  name: "射阳县",
                  children: [],
                },
                {
                  id: 320925,
                  name: "建湖县",
                  children: [],
                },
                {
                  id: 320971,
                  name: "盐城经济技术开发区",
                  children: [],
                },
                {
                  id: 320981,
                  name: "东台市",
                  children: [],
                },
              ],
            },
            {
              id: 321000,
              name: "扬州市",
              children: [
                {
                  id: 321002,
                  name: "广陵区",
                  children: [],
                },
                {
                  id: 321003,
                  name: "邗江区",
                  children: [],
                },
                {
                  id: 321012,
                  name: "江都区",
                  children: [],
                },
                {
                  id: 321023,
                  name: "宝应县",
                  children: [],
                },
                {
                  id: 321071,
                  name: "扬州经济技术开发区",
                  children: [],
                },
                {
                  id: 321081,
                  name: "仪征市",
                  children: [],
                },
                {
                  id: 321084,
                  name: "高邮市",
                  children: [],
                },
              ],
            },
            {
              id: 321100,
              name: "镇江市",
              children: [
                {
                  id: 321102,
                  name: "京口区",
                  children: [],
                },
                {
                  id: 321111,
                  name: "润州区",
                  children: [],
                },
                {
                  id: 321112,
                  name: "丹徒区",
                  children: [],
                },
                {
                  id: 321171,
                  name: "镇江新区",
                  children: [],
                },
                {
                  id: 321181,
                  name: "丹阳市",
                  children: [],
                },
                {
                  id: 321182,
                  name: "扬中市",
                  children: [],
                },
                {
                  id: 321183,
                  name: "句容市",
                  children: [],
                },
              ],
            },
            {
              id: 321200,
              name: "泰州市",
              children: [
                {
                  id: 321202,
                  name: "海陵区",
                  children: [],
                },
                {
                  id: 321203,
                  name: "高港区",
                  children: [],
                },
                {
                  id: 321204,
                  name: "姜堰区",
                  children: [],
                },
                {
                  id: 321271,
                  name: "泰州医药高新技术产业开发区",
                  children: [],
                },
                {
                  id: 321281,
                  name: "兴化市",
                  children: [],
                },
                {
                  id: 321282,
                  name: "靖江市",
                  children: [],
                },
                {
                  id: 321283,
                  name: "泰兴市",
                  children: [],
                },
              ],
            },
            {
              id: 321300,
              name: "宿迁市",
              children: [
                {
                  id: 321302,
                  name: "宿城区",
                  children: [],
                },
                {
                  id: 321311,
                  name: "宿豫区",
                  children: [],
                },
                {
                  id: 321322,
                  name: "沭阳县",
                  children: [],
                },
                {
                  id: 321323,
                  name: "泗阳县",
                  children: [],
                },
                {
                  id: 321324,
                  name: "泗洪县",
                  children: [],
                },
                {
                  id: 321371,
                  name: "宿迁经济技术开发区",
                  children: [],
                },
              ],
            },
          ],
        },
        {
          id: 330000,
          name: "浙江省",
          children: [
            {
              id: 330100,
              name: "杭州市",
              children: [
                {
                  id: 330102,
                  name: "上城区",
                  children: [],
                },
                {
                  id: 330105,
                  name: "拱墅区",
                  children: [],
                },
                {
                  id: 330106,
                  name: "西湖区",
                  children: [],
                },
                {
                  id: 330108,
                  name: "滨江区",
                  children: [],
                },
                {
                  id: 330109,
                  name: "萧山区",
                  children: [],
                },
                {
                  id: 330110,
                  name: "余杭区",
                  children: [],
                },
                {
                  id: 330111,
                  name: "富阳区",
                  children: [],
                },
                {
                  id: 330112,
                  name: "临安区",
                  children: [],
                },
                {
                  id: 330113,
                  name: "临平区",
                  children: [],
                },
                {
                  id: 330114,
                  name: "钱塘区",
                  children: [],
                },
                {
                  id: 330122,
                  name: "桐庐县",
                  children: [],
                },
                {
                  id: 330127,
                  name: "淳安县",
                  children: [],
                },
                {
                  id: 330182,
                  name: "建德市",
                  children: [],
                },
              ],
            },
            {
              id: 330200,
              name: "宁波市",
              children: [
                {
                  id: 330203,
                  name: "海曙区",
                  children: [],
                },
                {
                  id: 330205,
                  name: "江北区",
                  children: [],
                },
                {
                  id: 330206,
                  name: "北仑区",
                  children: [],
                },
                {
                  id: 330211,
                  name: "镇海区",
                  children: [],
                },
                {
                  id: 330212,
                  name: "鄞州区",
                  children: [],
                },
                {
                  id: 330213,
                  name: "奉化区",
                  children: [],
                },
                {
                  id: 330225,
                  name: "象山县",
                  children: [],
                },
                {
                  id: 330226,
                  name: "宁海县",
                  children: [],
                },
                {
                  id: 330281,
                  name: "余姚市",
                  children: [],
                },
                {
                  id: 330282,
                  name: "慈溪市",
                  children: [],
                },
              ],
            },
            {
              id: 330300,
              name: "温州市",
              children: [
                {
                  id: 330302,
                  name: "鹿城区",
                  children: [],
                },
                {
                  id: 330303,
                  name: "龙湾区",
                  children: [],
                },
                {
                  id: 330304,
                  name: "瓯海区",
                  children: [],
                },
                {
                  id: 330305,
                  name: "洞头区",
                  children: [],
                },
                {
                  id: 330324,
                  name: "永嘉县",
                  children: [],
                },
                {
                  id: 330326,
                  name: "平阳县",
                  children: [],
                },
                {
                  id: 330327,
                  name: "苍南县",
                  children: [],
                },
                {
                  id: 330328,
                  name: "文成县",
                  children: [],
                },
                {
                  id: 330329,
                  name: "泰顺县",
                  children: [],
                },
                {
                  id: 330371,
                  name: "温州经济技术开发区",
                  children: [],
                },
                {
                  id: 330381,
                  name: "瑞安市",
                  children: [],
                },
                {
                  id: 330382,
                  name: "乐清市",
                  children: [],
                },
                {
                  id: 330383,
                  name: "龙港市",
                  children: [],
                },
              ],
            },
            {
              id: 330400,
              name: "嘉兴市",
              children: [
                {
                  id: 330402,
                  name: "南湖区",
                  children: [],
                },
                {
                  id: 330411,
                  name: "秀洲区",
                  children: [],
                },
                {
                  id: 330421,
                  name: "嘉善县",
                  children: [],
                },
                {
                  id: 330424,
                  name: "海盐县",
                  children: [],
                },
                {
                  id: 330481,
                  name: "海宁市",
                  children: [],
                },
                {
                  id: 330482,
                  name: "平湖市",
                  children: [],
                },
                {
                  id: 330483,
                  name: "桐乡市",
                  children: [],
                },
              ],
            },
            {
              id: 330500,
              name: "湖州市",
              children: [
                {
                  id: 330502,
                  name: "吴兴区",
                  children: [],
                },
                {
                  id: 330503,
                  name: "南浔区",
                  children: [],
                },
                {
                  id: 330521,
                  name: "德清县",
                  children: [],
                },
                {
                  id: 330522,
                  name: "长兴县",
                  children: [],
                },
                {
                  id: 330523,
                  name: "安吉县",
                  children: [],
                },
              ],
            },
            {
              id: 330600,
              name: "绍兴市",
              children: [
                {
                  id: 330602,
                  name: "越城区",
                  children: [],
                },
                {
                  id: 330603,
                  name: "柯桥区",
                  children: [],
                },
                {
                  id: 330604,
                  name: "上虞区",
                  children: [],
                },
                {
                  id: 330624,
                  name: "新昌县",
                  children: [],
                },
                {
                  id: 330681,
                  name: "诸暨市",
                  children: [],
                },
                {
                  id: 330683,
                  name: "嵊州市",
                  children: [],
                },
              ],
            },
            {
              id: 330700,
              name: "金华市",
              children: [
                {
                  id: 330702,
                  name: "婺城区",
                  children: [],
                },
                {
                  id: 330703,
                  name: "金东区",
                  children: [],
                },
                {
                  id: 330723,
                  name: "武义县",
                  children: [],
                },
                {
                  id: 330726,
                  name: "浦江县",
                  children: [],
                },
                {
                  id: 330727,
                  name: "磐安县",
                  children: [],
                },
                {
                  id: 330781,
                  name: "兰溪市",
                  children: [],
                },
                {
                  id: 330782,
                  name: "义乌市",
                  children: [],
                },
                {
                  id: 330783,
                  name: "东阳市",
                  children: [],
                },
                {
                  id: 330784,
                  name: "永康市",
                  children: [],
                },
              ],
            },
            {
              id: 330800,
              name: "衢州市",
              children: [
                {
                  id: 330802,
                  name: "柯城区",
                  children: [],
                },
                {
                  id: 330803,
                  name: "衢江区",
                  children: [],
                },
                {
                  id: 330822,
                  name: "常山县",
                  children: [],
                },
                {
                  id: 330824,
                  name: "开化县",
                  children: [],
                },
                {
                  id: 330825,
                  name: "龙游县",
                  children: [],
                },
                {
                  id: 330881,
                  name: "江山市",
                  children: [],
                },
              ],
            },
            {
              id: 330900,
              name: "舟山市",
              children: [
                {
                  id: 330902,
                  name: "定海区",
                  children: [],
                },
                {
                  id: 330903,
                  name: "普陀区",
                  children: [],
                },
                {
                  id: 330921,
                  name: "岱山县",
                  children: [],
                },
                {
                  id: 330922,
                  name: "嵊泗县",
                  children: [],
                },
              ],
            },
            {
              id: 331000,
              name: "台州市",
              children: [
                {
                  id: 331002,
                  name: "椒江区",
                  children: [],
                },
                {
                  id: 331003,
                  name: "黄岩区",
                  children: [],
                },
                {
                  id: 331004,
                  name: "路桥区",
                  children: [],
                },
                {
                  id: 331022,
                  name: "三门县",
                  children: [],
                },
                {
                  id: 331023,
                  name: "天台县",
                  children: [],
                },
                {
                  id: 331024,
                  name: "仙居县",
                  children: [],
                },
                {
                  id: 331081,
                  name: "温岭市",
                  children: [],
                },
                {
                  id: 331082,
                  name: "临海市",
                  children: [],
                },
                {
                  id: 331083,
                  name: "玉环市",
                  children: [],
                },
              ],
            },
            {
              id: 331100,
              name: "丽水市",
              children: [
                {
                  id: 331102,
                  name: "莲都区",
                  children: [],
                },
                {
                  id: 331121,
                  name: "青田县",
                  children: [],
                },
                {
                  id: 331122,
                  name: "缙云县",
                  children: [],
                },
                {
                  id: 331123,
                  name: "遂昌县",
                  children: [],
                },
                {
                  id: 331124,
                  name: "松阳县",
                  children: [],
                },
                {
                  id: 331125,
                  name: "云和县",
                  children: [],
                },
                {
                  id: 331126,
                  name: "庆元县",
                  children: [],
                },
                {
                  id: 331127,
                  name: "景宁畲族自治县",
                  children: [],
                },
                {
                  id: 331181,
                  name: "龙泉市",
                  children: [],
                },
              ],
            },
          ],
        },
        {
          id: 340000,
          name: "安徽省",
          children: [
            {
              id: 340100,
              name: "合肥市",
              children: [
                {
                  id: 340102,
                  name: "瑶海区",
                  children: [],
                },
                {
                  id: 340103,
                  name: "庐阳区",
                  children: [],
                },
                {
                  id: 340104,
                  name: "蜀山区",
                  children: [],
                },
                {
                  id: 340111,
                  name: "包河区",
                  children: [],
                },
                {
                  id: 340121,
                  name: "长丰县",
                  children: [],
                },
                {
                  id: 340122,
                  name: "肥东县",
                  children: [],
                },
                {
                  id: 340123,
                  name: "肥西县",
                  children: [],
                },
                {
                  id: 340124,
                  name: "庐江县",
                  children: [],
                },
                {
                  id: 340171,
                  name: "合肥高新技术产业开发区",
                  children: [],
                },
                {
                  id: 340172,
                  name: "合肥经济技术开发区",
                  children: [],
                },
                {
                  id: 340173,
                  name: "合肥新站高新技术产业开发区",
                  children: [],
                },
                {
                  id: 340181,
                  name: "巢湖市",
                  children: [],
                },
              ],
            },
            {
              id: 340200,
              name: "芜湖市",
              children: [
                {
                  id: 340202,
                  name: "镜湖区",
                  children: [],
                },
                {
                  id: 340207,
                  name: "鸠江区",
                  children: [],
                },
                {
                  id: 340209,
                  name: "弋江区",
                  children: [],
                },
                {
                  id: 340210,
                  name: "湾沚区",
                  children: [],
                },
                {
                  id: 340212,
                  name: "繁昌区",
                  children: [],
                },
                {
                  id: 340223,
                  name: "南陵县",
                  children: [],
                },
                {
                  id: 340271,
                  name: "芜湖经济技术开发区",
                  children: [],
                },
                {
                  id: 340272,
                  name: "安徽芜湖三山经济开发区",
                  children: [],
                },
                {
                  id: 340281,
                  name: "无为市",
                  children: [],
                },
              ],
            },
            {
              id: 340300,
              name: "蚌埠市",
              children: [
                {
                  id: 340302,
                  name: "龙子湖区",
                  children: [],
                },
                {
                  id: 340303,
                  name: "蚌山区",
                  children: [],
                },
                {
                  id: 340304,
                  name: "禹会区",
                  children: [],
                },
                {
                  id: 340311,
                  name: "淮上区",
                  children: [],
                },
                {
                  id: 340321,
                  name: "怀远县",
                  children: [],
                },
                {
                  id: 340322,
                  name: "五河县",
                  children: [],
                },
                {
                  id: 340323,
                  name: "固镇县",
                  children: [],
                },
                {
                  id: 340371,
                  name: "蚌埠市高新技术开发区",
                  children: [],
                },
                {
                  id: 340372,
                  name: "蚌埠市经济开发区",
                  children: [],
                },
              ],
            },
            {
              id: 340400,
              name: "淮南市",
              children: [
                {
                  id: 340402,
                  name: "大通区",
                  children: [],
                },
                {
                  id: 340403,
                  name: "田家庵区",
                  children: [],
                },
                {
                  id: 340404,
                  name: "谢家集区",
                  children: [],
                },
                {
                  id: 340405,
                  name: "八公山区",
                  children: [],
                },
                {
                  id: 340406,
                  name: "潘集区",
                  children: [],
                },
                {
                  id: 340421,
                  name: "凤台县",
                  children: [],
                },
                {
                  id: 340422,
                  name: "寿县",
                  children: [],
                },
              ],
            },
            {
              id: 340500,
              name: "马鞍山市",
              children: [
                {
                  id: 340503,
                  name: "花山区",
                  children: [],
                },
                {
                  id: 340504,
                  name: "雨山区",
                  children: [],
                },
                {
                  id: 340506,
                  name: "博望区",
                  children: [],
                },
                {
                  id: 340521,
                  name: "当涂县",
                  children: [],
                },
                {
                  id: 340522,
                  name: "含山县",
                  children: [],
                },
                {
                  id: 340523,
                  name: "和县",
                  children: [],
                },
              ],
            },
            {
              id: 340600,
              name: "淮北市",
              children: [
                {
                  id: 340602,
                  name: "杜集区",
                  children: [],
                },
                {
                  id: 340603,
                  name: "相山区",
                  children: [],
                },
                {
                  id: 340604,
                  name: "烈山区",
                  children: [],
                },
                {
                  id: 340621,
                  name: "濉溪县",
                  children: [],
                },
              ],
            },
            {
              id: 340700,
              name: "铜陵市",
              children: [
                {
                  id: 340705,
                  name: "铜官区",
                  children: [],
                },
                {
                  id: 340706,
                  name: "义安区",
                  children: [],
                },
                {
                  id: 340711,
                  name: "郊区",
                  children: [],
                },
                {
                  id: 340722,
                  name: "枞阳县",
                  children: [],
                },
              ],
            },
            {
              id: 340800,
              name: "安庆市",
              children: [
                {
                  id: 340802,
                  name: "迎江区",
                  children: [],
                },
                {
                  id: 340803,
                  name: "大观区",
                  children: [],
                },
                {
                  id: 340811,
                  name: "宜秀区",
                  children: [],
                },
                {
                  id: 340822,
                  name: "怀宁县",
                  children: [],
                },
                {
                  id: 340825,
                  name: "太湖县",
                  children: [],
                },
                {
                  id: 340826,
                  name: "宿松县",
                  children: [],
                },
                {
                  id: 340827,
                  name: "望江县",
                  children: [],
                },
                {
                  id: 340828,
                  name: "岳西县",
                  children: [],
                },
                {
                  id: 340871,
                  name: "安徽安庆经济开发区",
                  children: [],
                },
                {
                  id: 340881,
                  name: "桐城市",
                  children: [],
                },
                {
                  id: 340882,
                  name: "潜山市",
                  children: [],
                },
              ],
            },
            {
              id: 341000,
              name: "黄山市",
              children: [
                {
                  id: 341002,
                  name: "屯溪区",
                  children: [],
                },
                {
                  id: 341003,
                  name: "黄山区",
                  children: [],
                },
                {
                  id: 341004,
                  name: "徽州区",
                  children: [],
                },
                {
                  id: 341021,
                  name: "歙县",
                  children: [],
                },
                {
                  id: 341022,
                  name: "休宁县",
                  children: [],
                },
                {
                  id: 341023,
                  name: "黟县",
                  children: [],
                },
                {
                  id: 341024,
                  name: "祁门县",
                  children: [],
                },
              ],
            },
            {
              id: 341100,
              name: "滁州市",
              children: [
                {
                  id: 341102,
                  name: "琅琊区",
                  children: [],
                },
                {
                  id: 341103,
                  name: "南谯区",
                  children: [],
                },
                {
                  id: 341122,
                  name: "来安县",
                  children: [],
                },
                {
                  id: 341124,
                  name: "全椒县",
                  children: [],
                },
                {
                  id: 341125,
                  name: "定远县",
                  children: [],
                },
                {
                  id: 341126,
                  name: "凤阳县",
                  children: [],
                },
                {
                  id: 341171,
                  name: "中新苏滁高新技术产业开发区",
                  children: [],
                },
                {
                  id: 341172,
                  name: "滁州经济技术开发区",
                  children: [],
                },
                {
                  id: 341181,
                  name: "天长市",
                  children: [],
                },
                {
                  id: 341182,
                  name: "明光市",
                  children: [],
                },
              ],
            },
            {
              id: 341200,
              name: "阜阳市",
              children: [
                {
                  id: 341202,
                  name: "颍州区",
                  children: [],
                },
                {
                  id: 341203,
                  name: "颍东区",
                  children: [],
                },
                {
                  id: 341204,
                  name: "颍泉区",
                  children: [],
                },
                {
                  id: 341221,
                  name: "临泉县",
                  children: [],
                },
                {
                  id: 341222,
                  name: "太和县",
                  children: [],
                },
                {
                  id: 341225,
                  name: "阜南县",
                  children: [],
                },
                {
                  id: 341226,
                  name: "颍上县",
                  children: [],
                },
                {
                  id: 341271,
                  name: "阜阳合肥现代产业园区",
                  children: [],
                },
                {
                  id: 341272,
                  name: "阜阳经济技术开发区",
                  children: [],
                },
                {
                  id: 341282,
                  name: "界首市",
                  children: [],
                },
              ],
            },
            {
              id: 341300,
              name: "宿州市",
              children: [
                {
                  id: 341302,
                  name: "埇桥区",
                  children: [],
                },
                {
                  id: 341321,
                  name: "砀山县",
                  children: [],
                },
                {
                  id: 341322,
                  name: "萧县",
                  children: [],
                },
                {
                  id: 341323,
                  name: "灵璧县",
                  children: [],
                },
                {
                  id: 341324,
                  name: "泗县",
                  children: [],
                },
                {
                  id: 341371,
                  name: "宿州马鞍山现代产业园区",
                  children: [],
                },
                {
                  id: 341372,
                  name: "宿州经济技术开发区",
                  children: [],
                },
              ],
            },
            {
              id: 341500,
              name: "六安市",
              children: [
                {
                  id: 341502,
                  name: "金安区",
                  children: [],
                },
                {
                  id: 341503,
                  name: "裕安区",
                  children: [],
                },
                {
                  id: 341504,
                  name: "叶集区",
                  children: [],
                },
                {
                  id: 341522,
                  name: "霍邱县",
                  children: [],
                },
                {
                  id: 341523,
                  name: "舒城县",
                  children: [],
                },
                {
                  id: 341524,
                  name: "金寨县",
                  children: [],
                },
                {
                  id: 341525,
                  name: "霍山县",
                  children: [],
                },
              ],
            },
            {
              id: 341600,
              name: "亳州市",
              children: [
                {
                  id: 341602,
                  name: "谯城区",
                  children: [],
                },
                {
                  id: 341621,
                  name: "涡阳县",
                  children: [],
                },
                {
                  id: 341622,
                  name: "蒙城县",
                  children: [],
                },
                {
                  id: 341623,
                  name: "利辛县",
                  children: [],
                },
              ],
            },
            {
              id: 341700,
              name: "池州市",
              children: [
                {
                  id: 341702,
                  name: "贵池区",
                  children: [],
                },
                {
                  id: 341721,
                  name: "东至县",
                  children: [],
                },
                {
                  id: 341722,
                  name: "石台县",
                  children: [],
                },
                {
                  id: 341723,
                  name: "青阳县",
                  children: [],
                },
              ],
            },
            {
              id: 341800,
              name: "宣城市",
              children: [
                {
                  id: 341802,
                  name: "宣州区",
                  children: [],
                },
                {
                  id: 341821,
                  name: "郎溪县",
                  children: [],
                },
                {
                  id: 341823,
                  name: "泾县",
                  children: [],
                },
                {
                  id: 341824,
                  name: "绩溪县",
                  children: [],
                },
                {
                  id: 341825,
                  name: "旌德县",
                  children: [],
                },
                {
                  id: 341871,
                  name: "宣城市经济开发区",
                  children: [],
                },
                {
                  id: 341881,
                  name: "宁国市",
                  children: [],
                },
                {
                  id: 341882,
                  name: "广德市",
                  children: [],
                },
              ],
            },
          ],
        },
        {
          id: 350000,
          name: "福建省",
          children: [
            {
              id: 350100,
              name: "福州市",
              children: [
                {
                  id: 350102,
                  name: "鼓楼区",
                  children: [],
                },
                {
                  id: 350103,
                  name: "台江区",
                  children: [],
                },
                {
                  id: 350104,
                  name: "仓山区",
                  children: [],
                },
                {
                  id: 350105,
                  name: "马尾区",
                  children: [],
                },
                {
                  id: 350111,
                  name: "晋安区",
                  children: [],
                },
                {
                  id: 350112,
                  name: "长乐区",
                  children: [],
                },
                {
                  id: 350121,
                  name: "闽侯县",
                  children: [],
                },
                {
                  id: 350122,
                  name: "连江县",
                  children: [],
                },
                {
                  id: 350123,
                  name: "罗源县",
                  children: [],
                },
                {
                  id: 350124,
                  name: "闽清县",
                  children: [],
                },
                {
                  id: 350125,
                  name: "永泰县",
                  children: [],
                },
                {
                  id: 350128,
                  name: "平潭县",
                  children: [],
                },
                {
                  id: 350181,
                  name: "福清市",
                  children: [],
                },
              ],
            },
            {
              id: 350200,
              name: "厦门市",
              children: [
                {
                  id: 350203,
                  name: "思明区",
                  children: [],
                },
                {
                  id: 350205,
                  name: "海沧区",
                  children: [],
                },
                {
                  id: 350206,
                  name: "湖里区",
                  children: [],
                },
                {
                  id: 350211,
                  name: "集美区",
                  children: [],
                },
                {
                  id: 350212,
                  name: "同安区",
                  children: [],
                },
                {
                  id: 350213,
                  name: "翔安区",
                  children: [],
                },
              ],
            },
            {
              id: 350300,
              name: "莆田市",
              children: [
                {
                  id: 350302,
                  name: "城厢区",
                  children: [],
                },
                {
                  id: 350303,
                  name: "涵江区",
                  children: [],
                },
                {
                  id: 350304,
                  name: "荔城区",
                  children: [],
                },
                {
                  id: 350305,
                  name: "秀屿区",
                  children: [],
                },
                {
                  id: 350322,
                  name: "仙游县",
                  children: [],
                },
              ],
            },
            {
              id: 350400,
              name: "三明市",
              children: [
                {
                  id: 350404,
                  name: "三元区",
                  children: [],
                },
                {
                  id: 350405,
                  name: "沙县区",
                  children: [],
                },
                {
                  id: 350421,
                  name: "明溪县",
                  children: [],
                },
                {
                  id: 350423,
                  name: "清流县",
                  children: [],
                },
                {
                  id: 350424,
                  name: "宁化县",
                  children: [],
                },
                {
                  id: 350425,
                  name: "大田县",
                  children: [],
                },
                {
                  id: 350426,
                  name: "尤溪县",
                  children: [],
                },
                {
                  id: 350428,
                  name: "将乐县",
                  children: [],
                },
                {
                  id: 350429,
                  name: "泰宁县",
                  children: [],
                },
                {
                  id: 350430,
                  name: "建宁县",
                  children: [],
                },
                {
                  id: 350481,
                  name: "永安市",
                  children: [],
                },
              ],
            },
            {
              id: 350500,
              name: "泉州市",
              children: [
                {
                  id: 350502,
                  name: "鲤城区",
                  children: [],
                },
                {
                  id: 350503,
                  name: "丰泽区",
                  children: [],
                },
                {
                  id: 350504,
                  name: "洛江区",
                  children: [],
                },
                {
                  id: 350505,
                  name: "泉港区",
                  children: [],
                },
                {
                  id: 350521,
                  name: "惠安县",
                  children: [],
                },
                {
                  id: 350524,
                  name: "安溪县",
                  children: [],
                },
                {
                  id: 350525,
                  name: "永春县",
                  children: [],
                },
                {
                  id: 350526,
                  name: "德化县",
                  children: [],
                },
                {
                  id: 350527,
                  name: "金门县",
                  children: [],
                },
                {
                  id: 350581,
                  name: "石狮市",
                  children: [],
                },
                {
                  id: 350582,
                  name: "晋江市",
                  children: [],
                },
                {
                  id: 350583,
                  name: "南安市",
                  children: [],
                },
              ],
            },
            {
              id: 350600,
              name: "漳州市",
              children: [
                {
                  id: 350602,
                  name: "芗城区",
                  children: [],
                },
                {
                  id: 350603,
                  name: "龙文区",
                  children: [],
                },
                {
                  id: 350604,
                  name: "龙海区",
                  children: [],
                },
                {
                  id: 350605,
                  name: "长泰区",
                  children: [],
                },
                {
                  id: 350622,
                  name: "云霄县",
                  children: [],
                },
                {
                  id: 350623,
                  name: "漳浦县",
                  children: [],
                },
                {
                  id: 350624,
                  name: "诏安县",
                  children: [],
                },
                {
                  id: 350626,
                  name: "东山县",
                  children: [],
                },
                {
                  id: 350627,
                  name: "南靖县",
                  children: [],
                },
                {
                  id: 350628,
                  name: "平和县",
                  children: [],
                },
                {
                  id: 350629,
                  name: "华安县",
                  children: [],
                },
              ],
            },
            {
              id: 350700,
              name: "南平市",
              children: [
                {
                  id: 350702,
                  name: "延平区",
                  children: [],
                },
                {
                  id: 350703,
                  name: "建阳区",
                  children: [],
                },
                {
                  id: 350721,
                  name: "顺昌县",
                  children: [],
                },
                {
                  id: 350722,
                  name: "浦城县",
                  children: [],
                },
                {
                  id: 350723,
                  name: "光泽县",
                  children: [],
                },
                {
                  id: 350724,
                  name: "松溪县",
                  children: [],
                },
                {
                  id: 350725,
                  name: "政和县",
                  children: [],
                },
                {
                  id: 350781,
                  name: "邵武市",
                  children: [],
                },
                {
                  id: 350782,
                  name: "武夷山市",
                  children: [],
                },
                {
                  id: 350783,
                  name: "建瓯市",
                  children: [],
                },
              ],
            },
            {
              id: 350800,
              name: "龙岩市",
              children: [
                {
                  id: 350802,
                  name: "新罗区",
                  children: [],
                },
                {
                  id: 350803,
                  name: "永定区",
                  children: [],
                },
                {
                  id: 350821,
                  name: "长汀县",
                  children: [],
                },
                {
                  id: 350823,
                  name: "上杭县",
                  children: [],
                },
                {
                  id: 350824,
                  name: "武平县",
                  children: [],
                },
                {
                  id: 350825,
                  name: "连城县",
                  children: [],
                },
                {
                  id: 350881,
                  name: "漳平市",
                  children: [],
                },
              ],
            },
            {
              id: 350900,
              name: "宁德市",
              children: [
                {
                  id: 350902,
                  name: "蕉城区",
                  children: [],
                },
                {
                  id: 350921,
                  name: "霞浦县",
                  children: [],
                },
                {
                  id: 350922,
                  name: "古田县",
                  children: [],
                },
                {
                  id: 350923,
                  name: "屏南县",
                  children: [],
                },
                {
                  id: 350924,
                  name: "寿宁县",
                  children: [],
                },
                {
                  id: 350925,
                  name: "周宁县",
                  children: [],
                },
                {
                  id: 350926,
                  name: "柘荣县",
                  children: [],
                },
                {
                  id: 350981,
                  name: "福安市",
                  children: [],
                },
                {
                  id: 350982,
                  name: "福鼎市",
                  children: [],
                },
              ],
            },
          ],
        },
        {
          id: 360000,
          name: "江西省",
          children: [
            {
              id: 360100,
              name: "南昌市",
              children: [
                {
                  id: 360102,
                  name: "东湖区",
                  children: [],
                },
                {
                  id: 360103,
                  name: "西湖区",
                  children: [],
                },
                {
                  id: 360104,
                  name: "青云谱区",
                  children: [],
                },
                {
                  id: 360111,
                  name: "青山湖区",
                  children: [],
                },
                {
                  id: 360112,
                  name: "新建区",
                  children: [],
                },
                {
                  id: 360113,
                  name: "红谷滩区",
                  children: [],
                },
                {
                  id: 360121,
                  name: "南昌县",
                  children: [],
                },
                {
                  id: 360123,
                  name: "安义县",
                  children: [],
                },
                {
                  id: 360124,
                  name: "进贤县",
                  children: [],
                },
              ],
            },
            {
              id: 360200,
              name: "景德镇市",
              children: [
                {
                  id: 360202,
                  name: "昌江区",
                  children: [],
                },
                {
                  id: 360203,
                  name: "珠山区",
                  children: [],
                },
                {
                  id: 360222,
                  name: "浮梁县",
                  children: [],
                },
                {
                  id: 360281,
                  name: "乐平市",
                  children: [],
                },
              ],
            },
            {
              id: 360300,
              name: "萍乡市",
              children: [
                {
                  id: 360302,
                  name: "安源区",
                  children: [],
                },
                {
                  id: 360313,
                  name: "湘东区",
                  children: [],
                },
                {
                  id: 360321,
                  name: "莲花县",
                  children: [],
                },
                {
                  id: 360322,
                  name: "上栗县",
                  children: [],
                },
                {
                  id: 360323,
                  name: "芦溪县",
                  children: [],
                },
              ],
            },
            {
              id: 360400,
              name: "九江市",
              children: [
                {
                  id: 360402,
                  name: "濂溪区",
                  children: [],
                },
                {
                  id: 360403,
                  name: "浔阳区",
                  children: [],
                },
                {
                  id: 360404,
                  name: "柴桑区",
                  children: [],
                },
                {
                  id: 360423,
                  name: "武宁县",
                  children: [],
                },
                {
                  id: 360424,
                  name: "修水县",
                  children: [],
                },
                {
                  id: 360425,
                  name: "永修县",
                  children: [],
                },
                {
                  id: 360426,
                  name: "德安县",
                  children: [],
                },
                {
                  id: 360428,
                  name: "都昌县",
                  children: [],
                },
                {
                  id: 360429,
                  name: "湖口县",
                  children: [],
                },
                {
                  id: 360430,
                  name: "彭泽县",
                  children: [],
                },
                {
                  id: 360481,
                  name: "瑞昌市",
                  children: [],
                },
                {
                  id: 360482,
                  name: "共青城市",
                  children: [],
                },
                {
                  id: 360483,
                  name: "庐山市",
                  children: [],
                },
              ],
            },
            {
              id: 360500,
              name: "新余市",
              children: [
                {
                  id: 360502,
                  name: "渝水区",
                  children: [],
                },
                {
                  id: 360521,
                  name: "分宜县",
                  children: [],
                },
              ],
            },
            {
              id: 360600,
              name: "鹰潭市",
              children: [
                {
                  id: 360602,
                  name: "月湖区",
                  children: [],
                },
                {
                  id: 360603,
                  name: "余江区",
                  children: [],
                },
                {
                  id: 360681,
                  name: "贵溪市",
                  children: [],
                },
              ],
            },
            {
              id: 360700,
              name: "赣州市",
              children: [
                {
                  id: 360702,
                  name: "章贡区",
                  children: [],
                },
                {
                  id: 360703,
                  name: "南康区",
                  children: [],
                },
                {
                  id: 360704,
                  name: "赣县区",
                  children: [],
                },
                {
                  id: 360722,
                  name: "信丰县",
                  children: [],
                },
                {
                  id: 360723,
                  name: "大余县",
                  children: [],
                },
                {
                  id: 360724,
                  name: "上犹县",
                  children: [],
                },
                {
                  id: 360725,
                  name: "崇义县",
                  children: [],
                },
                {
                  id: 360726,
                  name: "安远县",
                  children: [],
                },
                {
                  id: 360728,
                  name: "定南县",
                  children: [],
                },
                {
                  id: 360729,
                  name: "全南县",
                  children: [],
                },
                {
                  id: 360730,
                  name: "宁都县",
                  children: [],
                },
                {
                  id: 360731,
                  name: "于都县",
                  children: [],
                },
                {
                  id: 360732,
                  name: "兴国县",
                  children: [],
                },
                {
                  id: 360733,
                  name: "会昌县",
                  children: [],
                },
                {
                  id: 360734,
                  name: "寻乌县",
                  children: [],
                },
                {
                  id: 360735,
                  name: "石城县",
                  children: [],
                },
                {
                  id: 360781,
                  name: "瑞金市",
                  children: [],
                },
                {
                  id: 360783,
                  name: "龙南市",
                  children: [],
                },
              ],
            },
            {
              id: 360800,
              name: "吉安市",
              children: [
                {
                  id: 360802,
                  name: "吉州区",
                  children: [],
                },
                {
                  id: 360803,
                  name: "青原区",
                  children: [],
                },
                {
                  id: 360821,
                  name: "吉安县",
                  children: [],
                },
                {
                  id: 360822,
                  name: "吉水县",
                  children: [],
                },
                {
                  id: 360823,
                  name: "峡江县",
                  children: [],
                },
                {
                  id: 360824,
                  name: "新干县",
                  children: [],
                },
                {
                  id: 360825,
                  name: "永丰县",
                  children: [],
                },
                {
                  id: 360826,
                  name: "泰和县",
                  children: [],
                },
                {
                  id: 360827,
                  name: "遂川县",
                  children: [],
                },
                {
                  id: 360828,
                  name: "万安县",
                  children: [],
                },
                {
                  id: 360829,
                  name: "安福县",
                  children: [],
                },
                {
                  id: 360830,
                  name: "永新县",
                  children: [],
                },
                {
                  id: 360881,
                  name: "井冈山市",
                  children: [],
                },
              ],
            },
            {
              id: 360900,
              name: "宜春市",
              children: [
                {
                  id: 360902,
                  name: "袁州区",
                  children: [],
                },
                {
                  id: 360921,
                  name: "奉新县",
                  children: [],
                },
                {
                  id: 360922,
                  name: "万载县",
                  children: [],
                },
                {
                  id: 360923,
                  name: "上高县",
                  children: [],
                },
                {
                  id: 360924,
                  name: "宜丰县",
                  children: [],
                },
                {
                  id: 360925,
                  name: "靖安县",
                  children: [],
                },
                {
                  id: 360926,
                  name: "铜鼓县",
                  children: [],
                },
                {
                  id: 360981,
                  name: "丰城市",
                  children: [],
                },
                {
                  id: 360982,
                  name: "樟树市",
                  children: [],
                },
                {
                  id: 360983,
                  name: "高安市",
                  children: [],
                },
              ],
            },
            {
              id: 361000,
              name: "抚州市",
              children: [
                {
                  id: 361002,
                  name: "临川区",
                  children: [],
                },
                {
                  id: 361003,
                  name: "东乡区",
                  children: [],
                },
                {
                  id: 361021,
                  name: "南城县",
                  children: [],
                },
                {
                  id: 361022,
                  name: "黎川县",
                  children: [],
                },
                {
                  id: 361023,
                  name: "南丰县",
                  children: [],
                },
                {
                  id: 361024,
                  name: "崇仁县",
                  children: [],
                },
                {
                  id: 361025,
                  name: "乐安县",
                  children: [],
                },
                {
                  id: 361026,
                  name: "宜黄县",
                  children: [],
                },
                {
                  id: 361027,
                  name: "金溪县",
                  children: [],
                },
                {
                  id: 361028,
                  name: "资溪县",
                  children: [],
                },
                {
                  id: 361030,
                  name: "广昌县",
                  children: [],
                },
              ],
            },
            {
              id: 361100,
              name: "上饶市",
              children: [
                {
                  id: 361102,
                  name: "信州区",
                  children: [],
                },
                {
                  id: 361103,
                  name: "广丰区",
                  children: [],
                },
                {
                  id: 361104,
                  name: "广信区",
                  children: [],
                },
                {
                  id: 361123,
                  name: "玉山县",
                  children: [],
                },
                {
                  id: 361124,
                  name: "铅山县",
                  children: [],
                },
                {
                  id: 361125,
                  name: "横峰县",
                  children: [],
                },
                {
                  id: 361126,
                  name: "弋阳县",
                  children: [],
                },
                {
                  id: 361127,
                  name: "余干县",
                  children: [],
                },
                {
                  id: 361128,
                  name: "鄱阳县",
                  children: [],
                },
                {
                  id: 361129,
                  name: "万年县",
                  children: [],
                },
                {
                  id: 361130,
                  name: "婺源县",
                  children: [],
                },
                {
                  id: 361181,
                  name: "德兴市",
                  children: [],
                },
              ],
            },
          ],
        },
        {
          id: 370000,
          name: "山东省",
          children: [
            {
              id: 370100,
              name: "济南市",
              children: [
                {
                  id: 370102,
                  name: "历下区",
                  children: [],
                },
                {
                  id: 370103,
                  name: "市中区",
                  children: [],
                },
                {
                  id: 370104,
                  name: "槐荫区",
                  children: [],
                },
                {
                  id: 370105,
                  name: "天桥区",
                  children: [],
                },
                {
                  id: 370112,
                  name: "历城区",
                  children: [],
                },
                {
                  id: 370113,
                  name: "长清区",
                  children: [],
                },
                {
                  id: 370114,
                  name: "章丘区",
                  children: [],
                },
                {
                  id: 370115,
                  name: "济阳区",
                  children: [],
                },
                {
                  id: 370116,
                  name: "莱芜区",
                  children: [],
                },
                {
                  id: 370117,
                  name: "钢城区",
                  children: [],
                },
                {
                  id: 370124,
                  name: "平阴县",
                  children: [],
                },
                {
                  id: 370126,
                  name: "商河县",
                  children: [],
                },
                {
                  id: 370171,
                  name: "济南高新技术产业开发区",
                  children: [],
                },
              ],
            },
            {
              id: 370200,
              name: "青岛市",
              children: [
                {
                  id: 370202,
                  name: "市南区",
                  children: [],
                },
                {
                  id: 370203,
                  name: "市北区",
                  children: [],
                },
                {
                  id: 370211,
                  name: "黄岛区",
                  children: [],
                },
                {
                  id: 370212,
                  name: "崂山区",
                  children: [],
                },
                {
                  id: 370213,
                  name: "李沧区",
                  children: [],
                },
                {
                  id: 370214,
                  name: "城阳区",
                  children: [],
                },
                {
                  id: 370215,
                  name: "即墨区",
                  children: [],
                },
                {
                  id: 370271,
                  name: "青岛高新技术产业开发区",
                  children: [],
                },
                {
                  id: 370281,
                  name: "胶州市",
                  children: [],
                },
                {
                  id: 370283,
                  name: "平度市",
                  children: [],
                },
                {
                  id: 370285,
                  name: "莱西市",
                  children: [],
                },
              ],
            },
            {
              id: 370300,
              name: "淄博市",
              children: [
                {
                  id: 370302,
                  name: "淄川区",
                  children: [],
                },
                {
                  id: 370303,
                  name: "张店区",
                  children: [],
                },
                {
                  id: 370304,
                  name: "博山区",
                  children: [],
                },
                {
                  id: 370305,
                  name: "临淄区",
                  children: [],
                },
                {
                  id: 370306,
                  name: "周村区",
                  children: [],
                },
                {
                  id: 370321,
                  name: "桓台县",
                  children: [],
                },
                {
                  id: 370322,
                  name: "高青县",
                  children: [],
                },
                {
                  id: 370323,
                  name: "沂源县",
                  children: [],
                },
              ],
            },
            {
              id: 370400,
              name: "枣庄市",
              children: [
                {
                  id: 370402,
                  name: "市中区",
                  children: [],
                },
                {
                  id: 370403,
                  name: "薛城区",
                  children: [],
                },
                {
                  id: 370404,
                  name: "峄城区",
                  children: [],
                },
                {
                  id: 370405,
                  name: "台儿庄区",
                  children: [],
                },
                {
                  id: 370406,
                  name: "山亭区",
                  children: [],
                },
                {
                  id: 370481,
                  name: "滕州市",
                  children: [],
                },
              ],
            },
            {
              id: 370500,
              name: "东营市",
              children: [
                {
                  id: 370502,
                  name: "东营区",
                  children: [],
                },
                {
                  id: 370503,
                  name: "河口区",
                  children: [],
                },
                {
                  id: 370505,
                  name: "垦利区",
                  children: [],
                },
                {
                  id: 370522,
                  name: "利津县",
                  children: [],
                },
                {
                  id: 370523,
                  name: "广饶县",
                  children: [],
                },
                {
                  id: 370571,
                  name: "东营经济技术开发区",
                  children: [],
                },
                {
                  id: 370572,
                  name: "东营港经济开发区",
                  children: [],
                },
              ],
            },
            {
              id: 370600,
              name: "烟台市",
              children: [
                {
                  id: 370602,
                  name: "芝罘区",
                  children: [],
                },
                {
                  id: 370611,
                  name: "福山区",
                  children: [],
                },
                {
                  id: 370612,
                  name: "牟平区",
                  children: [],
                },
                {
                  id: 370613,
                  name: "莱山区",
                  children: [],
                },
                {
                  id: 370614,
                  name: "蓬莱区",
                  children: [],
                },
                {
                  id: 370671,
                  name: "烟台高新技术产业开发区",
                  children: [],
                },
                {
                  id: 370672,
                  name: "烟台经济技术开发区",
                  children: [],
                },
                {
                  id: 370681,
                  name: "龙口市",
                  children: [],
                },
                {
                  id: 370682,
                  name: "莱阳市",
                  children: [],
                },
                {
                  id: 370683,
                  name: "莱州市",
                  children: [],
                },
                {
                  id: 370685,
                  name: "招远市",
                  children: [],
                },
                {
                  id: 370686,
                  name: "栖霞市",
                  children: [],
                },
                {
                  id: 370687,
                  name: "海阳市",
                  children: [],
                },
              ],
            },
            {
              id: 370700,
              name: "潍坊市",
              children: [
                {
                  id: 370702,
                  name: "潍城区",
                  children: [],
                },
                {
                  id: 370703,
                  name: "寒亭区",
                  children: [],
                },
                {
                  id: 370704,
                  name: "坊子区",
                  children: [],
                },
                {
                  id: 370705,
                  name: "奎文区",
                  children: [],
                },
                {
                  id: 370724,
                  name: "临朐县",
                  children: [],
                },
                {
                  id: 370725,
                  name: "昌乐县",
                  children: [],
                },
                {
                  id: 370772,
                  name: "潍坊滨海经济技术开发区",
                  children: [],
                },
                {
                  id: 370781,
                  name: "青州市",
                  children: [],
                },
                {
                  id: 370782,
                  name: "诸城市",
                  children: [],
                },
                {
                  id: 370783,
                  name: "寿光市",
                  children: [],
                },
                {
                  id: 370784,
                  name: "安丘市",
                  children: [],
                },
                {
                  id: 370785,
                  name: "高密市",
                  children: [],
                },
                {
                  id: 370786,
                  name: "昌邑市",
                  children: [],
                },
              ],
            },
            {
              id: 370800,
              name: "济宁市",
              children: [
                {
                  id: 370811,
                  name: "任城区",
                  children: [],
                },
                {
                  id: 370812,
                  name: "兖州区",
                  children: [],
                },
                {
                  id: 370826,
                  name: "微山县",
                  children: [],
                },
                {
                  id: 370827,
                  name: "鱼台县",
                  children: [],
                },
                {
                  id: 370828,
                  name: "金乡县",
                  children: [],
                },
                {
                  id: 370829,
                  name: "嘉祥县",
                  children: [],
                },
                {
                  id: 370830,
                  name: "汶上县",
                  children: [],
                },
                {
                  id: 370831,
                  name: "泗水县",
                  children: [],
                },
                {
                  id: 370832,
                  name: "梁山县",
                  children: [],
                },
                {
                  id: 370871,
                  name: "济宁高新技术产业开发区",
                  children: [],
                },
                {
                  id: 370881,
                  name: "曲阜市",
                  children: [],
                },
                {
                  id: 370883,
                  name: "邹城市",
                  children: [],
                },
              ],
            },
            {
              id: 370900,
              name: "泰安市",
              children: [
                {
                  id: 370902,
                  name: "泰山区",
                  children: [],
                },
                {
                  id: 370911,
                  name: "岱岳区",
                  children: [],
                },
                {
                  id: 370921,
                  name: "宁阳县",
                  children: [],
                },
                {
                  id: 370923,
                  name: "东平县",
                  children: [],
                },
                {
                  id: 370982,
                  name: "新泰市",
                  children: [],
                },
                {
                  id: 370983,
                  name: "肥城市",
                  children: [],
                },
              ],
            },
            {
              id: 371000,
              name: "威海市",
              children: [
                {
                  id: 371002,
                  name: "环翠区",
                  children: [],
                },
                {
                  id: 371003,
                  name: "文登区",
                  children: [],
                },
                {
                  id: 371071,
                  name: "威海火炬高技术产业开发区",
                  children: [],
                },
                {
                  id: 371072,
                  name: "威海经济技术开发区",
                  children: [],
                },
                {
                  id: 371073,
                  name: "威海临港经济技术开发区",
                  children: [],
                },
                {
                  id: 371082,
                  name: "荣成市",
                  children: [],
                },
                {
                  id: 371083,
                  name: "乳山市",
                  children: [],
                },
              ],
            },
            {
              id: 371100,
              name: "日照市",
              children: [
                {
                  id: 371102,
                  name: "东港区",
                  children: [],
                },
                {
                  id: 371103,
                  name: "岚山区",
                  children: [],
                },
                {
                  id: 371121,
                  name: "五莲县",
                  children: [],
                },
                {
                  id: 371122,
                  name: "莒县",
                  children: [],
                },
                {
                  id: 371171,
                  name: "日照经济技术开发区",
                  children: [],
                },
              ],
            },
            {
              id: 371300,
              name: "临沂市",
              children: [
                {
                  id: 371302,
                  name: "兰山区",
                  children: [],
                },
                {
                  id: 371311,
                  name: "罗庄区",
                  children: [],
                },
                {
                  id: 371312,
                  name: "河东区",
                  children: [],
                },
                {
                  id: 371321,
                  name: "沂南县",
                  children: [],
                },
                {
                  id: 371322,
                  name: "郯城县",
                  children: [],
                },
                {
                  id: 371323,
                  name: "沂水县",
                  children: [],
                },
                {
                  id: 371324,
                  name: "兰陵县",
                  children: [],
                },
                {
                  id: 371325,
                  name: "费县",
                  children: [],
                },
                {
                  id: 371326,
                  name: "平邑县",
                  children: [],
                },
                {
                  id: 371327,
                  name: "莒南县",
                  children: [],
                },
                {
                  id: 371328,
                  name: "蒙阴县",
                  children: [],
                },
                {
                  id: 371329,
                  name: "临沭县",
                  children: [],
                },
                {
                  id: 371371,
                  name: "临沂高新技术产业开发区",
                  children: [],
                },
              ],
            },
            {
              id: 371400,
              name: "德州市",
              children: [
                {
                  id: 371402,
                  name: "德城区",
                  children: [],
                },
                {
                  id: 371403,
                  name: "陵城区",
                  children: [],
                },
                {
                  id: 371422,
                  name: "宁津县",
                  children: [],
                },
                {
                  id: 371423,
                  name: "庆云县",
                  children: [],
                },
                {
                  id: 371424,
                  name: "临邑县",
                  children: [],
                },
                {
                  id: 371425,
                  name: "齐河县",
                  children: [],
                },
                {
                  id: 371426,
                  name: "平原县",
                  children: [],
                },
                {
                  id: 371427,
                  name: "夏津县",
                  children: [],
                },
                {
                  id: 371428,
                  name: "武城县",
                  children: [],
                },
                {
                  id: 371471,
                  name: "德州经济技术开发区",
                  children: [],
                },
                {
                  id: 371472,
                  name: "德州运河经济开发区",
                  children: [],
                },
                {
                  id: 371481,
                  name: "乐陵市",
                  children: [],
                },
                {
                  id: 371482,
                  name: "禹城市",
                  children: [],
                },
              ],
            },
            {
              id: 371500,
              name: "聊城市",
              children: [
                {
                  id: 371502,
                  name: "东昌府区",
                  children: [],
                },
                {
                  id: 371503,
                  name: "茌平区",
                  children: [],
                },
                {
                  id: 371521,
                  name: "阳谷县",
                  children: [],
                },
                {
                  id: 371522,
                  name: "莘县",
                  children: [],
                },
                {
                  id: 371524,
                  name: "东阿县",
                  children: [],
                },
                {
                  id: 371525,
                  name: "冠县",
                  children: [],
                },
                {
                  id: 371526,
                  name: "高唐县",
                  children: [],
                },
                {
                  id: 371581,
                  name: "临清市",
                  children: [],
                },
              ],
            },
            {
              id: 371600,
              name: "滨州市",
              children: [
                {
                  id: 371602,
                  name: "滨城区",
                  children: [],
                },
                {
                  id: 371603,
                  name: "沾化区",
                  children: [],
                },
                {
                  id: 371621,
                  name: "惠民县",
                  children: [],
                },
                {
                  id: 371622,
                  name: "阳信县",
                  children: [],
                },
                {
                  id: 371623,
                  name: "无棣县",
                  children: [],
                },
                {
                  id: 371625,
                  name: "博兴县",
                  children: [],
                },
                {
                  id: 371681,
                  name: "邹平市",
                  children: [],
                },
              ],
            },
            {
              id: 371700,
              name: "菏泽市",
              children: [
                {
                  id: 371702,
                  name: "牡丹区",
                  children: [],
                },
                {
                  id: 371703,
                  name: "定陶区",
                  children: [],
                },
                {
                  id: 371721,
                  name: "曹县",
                  children: [],
                },
                {
                  id: 371722,
                  name: "单县",
                  children: [],
                },
                {
                  id: 371723,
                  name: "成武县",
                  children: [],
                },
                {
                  id: 371724,
                  name: "巨野县",
                  children: [],
                },
                {
                  id: 371725,
                  name: "郓城县",
                  children: [],
                },
                {
                  id: 371726,
                  name: "鄄城县",
                  children: [],
                },
                {
                  id: 371728,
                  name: "东明县",
                  children: [],
                },
                {
                  id: 371771,
                  name: "菏泽经济技术开发区",
                  children: [],
                },
                {
                  id: 371772,
                  name: "菏泽高新技术开发区",
                  children: [],
                },
              ],
            },
          ],
        },
        {
          id: 410000,
          name: "河南省",
          children: [
            {
              id: 410100,
              name: "郑州市",
              children: [
                {
                  id: 410102,
                  name: "中原区",
                  children: [],
                },
                {
                  id: 410103,
                  name: "二七区",
                  children: [],
                },
                {
                  id: 410104,
                  name: "管城回族区",
                  children: [],
                },
                {
                  id: 410105,
                  name: "金水区",
                  children: [],
                },
                {
                  id: 410106,
                  name: "上街区",
                  children: [],
                },
                {
                  id: 410108,
                  name: "惠济区",
                  children: [],
                },
                {
                  id: 410122,
                  name: "中牟县",
                  children: [],
                },
                {
                  id: 410171,
                  name: "郑州经济技术开发区",
                  children: [],
                },
                {
                  id: 410172,
                  name: "郑州高新技术产业开发区",
                  children: [],
                },
                {
                  id: 410173,
                  name: "郑州航空港经济综合实验区",
                  children: [],
                },
                {
                  id: 410181,
                  name: "巩义市",
                  children: [],
                },
                {
                  id: 410182,
                  name: "荥阳市",
                  children: [],
                },
                {
                  id: 410183,
                  name: "新密市",
                  children: [],
                },
                {
                  id: 410184,
                  name: "新郑市",
                  children: [],
                },
                {
                  id: 410185,
                  name: "登封市",
                  children: [],
                },
              ],
            },
            {
              id: 410200,
              name: "开封市",
              children: [
                {
                  id: 410202,
                  name: "龙亭区",
                  children: [],
                },
                {
                  id: 410203,
                  name: "顺河回族区",
                  children: [],
                },
                {
                  id: 410204,
                  name: "鼓楼区",
                  children: [],
                },
                {
                  id: 410205,
                  name: "禹王台区",
                  children: [],
                },
                {
                  id: 410212,
                  name: "祥符区",
                  children: [],
                },
                {
                  id: 410221,
                  name: "杞县",
                  children: [],
                },
                {
                  id: 410222,
                  name: "通许县",
                  children: [],
                },
                {
                  id: 410223,
                  name: "尉氏县",
                  children: [],
                },
                {
                  id: 410225,
                  name: "兰考县",
                  children: [],
                },
              ],
            },
            {
              id: 410300,
              name: "洛阳市",
              children: [
                {
                  id: 410302,
                  name: "老城区",
                  children: [],
                },
                {
                  id: 410303,
                  name: "西工区",
                  children: [],
                },
                {
                  id: 410304,
                  name: "瀍河回族区",
                  children: [],
                },
                {
                  id: 410305,
                  name: "涧西区",
                  children: [],
                },
                {
                  id: 410307,
                  name: "偃师区",
                  children: [],
                },
                {
                  id: 410308,
                  name: "孟津区",
                  children: [],
                },
                {
                  id: 410311,
                  name: "洛龙区",
                  children: [],
                },
                {
                  id: 410323,
                  name: "新安县",
                  children: [],
                },
                {
                  id: 410324,
                  name: "栾川县",
                  children: [],
                },
                {
                  id: 410325,
                  name: "嵩县",
                  children: [],
                },
                {
                  id: 410326,
                  name: "汝阳县",
                  children: [],
                },
                {
                  id: 410327,
                  name: "宜阳县",
                  children: [],
                },
                {
                  id: 410328,
                  name: "洛宁县",
                  children: [],
                },
                {
                  id: 410329,
                  name: "伊川县",
                  children: [],
                },
                {
                  id: 410371,
                  name: "洛阳高新技术产业开发区",
                  children: [],
                },
              ],
            },
            {
              id: 410400,
              name: "平顶山市",
              children: [
                {
                  id: 410402,
                  name: "新华区",
                  children: [],
                },
                {
                  id: 410403,
                  name: "卫东区",
                  children: [],
                },
                {
                  id: 410404,
                  name: "石龙区",
                  children: [],
                },
                {
                  id: 410411,
                  name: "湛河区",
                  children: [],
                },
                {
                  id: 410421,
                  name: "宝丰县",
                  children: [],
                },
                {
                  id: 410422,
                  name: "叶县",
                  children: [],
                },
                {
                  id: 410423,
                  name: "鲁山县",
                  children: [],
                },
                {
                  id: 410425,
                  name: "郏县",
                  children: [],
                },
                {
                  id: 410471,
                  name: "平顶山高新技术产业开发区",
                  children: [],
                },
                {
                  id: 410472,
                  name: "平顶山市城乡一体化示范区",
                  children: [],
                },
                {
                  id: 410481,
                  name: "舞钢市",
                  children: [],
                },
                {
                  id: 410482,
                  name: "汝州市",
                  children: [],
                },
              ],
            },
            {
              id: 410500,
              name: "安阳市",
              children: [
                {
                  id: 410502,
                  name: "文峰区",
                  children: [],
                },
                {
                  id: 410503,
                  name: "北关区",
                  children: [],
                },
                {
                  id: 410505,
                  name: "殷都区",
                  children: [],
                },
                {
                  id: 410506,
                  name: "龙安区",
                  children: [],
                },
                {
                  id: 410522,
                  name: "安阳县",
                  children: [],
                },
                {
                  id: 410523,
                  name: "汤阴县",
                  children: [],
                },
                {
                  id: 410526,
                  name: "滑县",
                  children: [],
                },
                {
                  id: 410527,
                  name: "内黄县",
                  children: [],
                },
                {
                  id: 410571,
                  name: "安阳高新技术产业开发区",
                  children: [],
                },
                {
                  id: 410581,
                  name: "林州市",
                  children: [],
                },
              ],
            },
            {
              id: 410600,
              name: "鹤壁市",
              children: [
                {
                  id: 410602,
                  name: "鹤山区",
                  children: [],
                },
                {
                  id: 410603,
                  name: "山城区",
                  children: [],
                },
                {
                  id: 410611,
                  name: "淇滨区",
                  children: [],
                },
                {
                  id: 410621,
                  name: "浚县",
                  children: [],
                },
                {
                  id: 410622,
                  name: "淇县",
                  children: [],
                },
                {
                  id: 410671,
                  name: "鹤壁经济技术开发区",
                  children: [],
                },
              ],
            },
            {
              id: 410700,
              name: "新乡市",
              children: [
                {
                  id: 410702,
                  name: "红旗区",
                  children: [],
                },
                {
                  id: 410703,
                  name: "卫滨区",
                  children: [],
                },
                {
                  id: 410704,
                  name: "凤泉区",
                  children: [],
                },
                {
                  id: 410711,
                  name: "牧野区",
                  children: [],
                },
                {
                  id: 410721,
                  name: "新乡县",
                  children: [],
                },
                {
                  id: 410724,
                  name: "获嘉县",
                  children: [],
                },
                {
                  id: 410725,
                  name: "原阳县",
                  children: [],
                },
                {
                  id: 410726,
                  name: "延津县",
                  children: [],
                },
                {
                  id: 410727,
                  name: "封丘县",
                  children: [],
                },
                {
                  id: 410771,
                  name: "新乡高新技术产业开发区",
                  children: [],
                },
                {
                  id: 410772,
                  name: "新乡经济技术开发区",
                  children: [],
                },
                {
                  id: 410773,
                  name: "新乡市平原城乡一体化示范区",
                  children: [],
                },
                {
                  id: 410781,
                  name: "卫辉市",
                  children: [],
                },
                {
                  id: 410782,
                  name: "辉县市",
                  children: [],
                },
                {
                  id: 410783,
                  name: "长垣市",
                  children: [],
                },
              ],
            },
            {
              id: 410800,
              name: "焦作市",
              children: [
                {
                  id: 410802,
                  name: "解放区",
                  children: [],
                },
                {
                  id: 410803,
                  name: "中站区",
                  children: [],
                },
                {
                  id: 410804,
                  name: "马村区",
                  children: [],
                },
                {
                  id: 410811,
                  name: "山阳区",
                  children: [],
                },
                {
                  id: 410821,
                  name: "修武县",
                  children: [],
                },
                {
                  id: 410822,
                  name: "博爱县",
                  children: [],
                },
                {
                  id: 410823,
                  name: "武陟县",
                  children: [],
                },
                {
                  id: 410825,
                  name: "温县",
                  children: [],
                },
                {
                  id: 410871,
                  name: "焦作城乡一体化示范区",
                  children: [],
                },
                {
                  id: 410882,
                  name: "沁阳市",
                  children: [],
                },
                {
                  id: 410883,
                  name: "孟州市",
                  children: [],
                },
              ],
            },
            {
              id: 410900,
              name: "濮阳市",
              children: [
                {
                  id: 410902,
                  name: "华龙区",
                  children: [],
                },
                {
                  id: 410922,
                  name: "清丰县",
                  children: [],
                },
                {
                  id: 410923,
                  name: "南乐县",
                  children: [],
                },
                {
                  id: 410926,
                  name: "范县",
                  children: [],
                },
                {
                  id: 410927,
                  name: "台前县",
                  children: [],
                },
                {
                  id: 410928,
                  name: "濮阳县",
                  children: [],
                },
                {
                  id: 410971,
                  name: "河南濮阳工业园区",
                  children: [],
                },
                {
                  id: 410972,
                  name: "濮阳经济技术开发区",
                  children: [],
                },
              ],
            },
            {
              id: 411000,
              name: "许昌市",
              children: [
                {
                  id: 411002,
                  name: "魏都区",
                  children: [],
                },
                {
                  id: 411003,
                  name: "建安区",
                  children: [],
                },
                {
                  id: 411024,
                  name: "鄢陵县",
                  children: [],
                },
                {
                  id: 411025,
                  name: "襄城县",
                  children: [],
                },
                {
                  id: 411071,
                  name: "许昌经济技术开发区",
                  children: [],
                },
                {
                  id: 411081,
                  name: "禹州市",
                  children: [],
                },
                {
                  id: 411082,
                  name: "长葛市",
                  children: [],
                },
              ],
            },
            {
              id: 411100,
              name: "漯河市",
              children: [
                {
                  id: 411102,
                  name: "源汇区",
                  children: [],
                },
                {
                  id: 411103,
                  name: "郾城区",
                  children: [],
                },
                {
                  id: 411104,
                  name: "召陵区",
                  children: [],
                },
                {
                  id: 411121,
                  name: "舞阳县",
                  children: [],
                },
                {
                  id: 411122,
                  name: "临颍县",
                  children: [],
                },
                {
                  id: 411171,
                  name: "漯河经济技术开发区",
                  children: [],
                },
              ],
            },
            {
              id: 411200,
              name: "三门峡市",
              children: [
                {
                  id: 411202,
                  name: "湖滨区",
                  children: [],
                },
                {
                  id: 411203,
                  name: "陕州区",
                  children: [],
                },
                {
                  id: 411221,
                  name: "渑池县",
                  children: [],
                },
                {
                  id: 411224,
                  name: "卢氏县",
                  children: [],
                },
                {
                  id: 411271,
                  name: "河南三门峡经济开发区",
                  children: [],
                },
                {
                  id: 411281,
                  name: "义马市",
                  children: [],
                },
                {
                  id: 411282,
                  name: "灵宝市",
                  children: [],
                },
              ],
            },
            {
              id: 411300,
              name: "南阳市",
              children: [
                {
                  id: 411302,
                  name: "宛城区",
                  children: [],
                },
                {
                  id: 411303,
                  name: "卧龙区",
                  children: [],
                },
                {
                  id: 411321,
                  name: "南召县",
                  children: [],
                },
                {
                  id: 411322,
                  name: "方城县",
                  children: [],
                },
                {
                  id: 411323,
                  name: "西峡县",
                  children: [],
                },
                {
                  id: 411324,
                  name: "镇平县",
                  children: [],
                },
                {
                  id: 411325,
                  name: "内乡县",
                  children: [],
                },
                {
                  id: 411326,
                  name: "淅川县",
                  children: [],
                },
                {
                  id: 411327,
                  name: "社旗县",
                  children: [],
                },
                {
                  id: 411328,
                  name: "唐河县",
                  children: [],
                },
                {
                  id: 411329,
                  name: "新野县",
                  children: [],
                },
                {
                  id: 411330,
                  name: "桐柏县",
                  children: [],
                },
                {
                  id: 411371,
                  name: "南阳高新技术产业开发区",
                  children: [],
                },
                {
                  id: 411372,
                  name: "南阳市城乡一体化示范区",
                  children: [],
                },
                {
                  id: 411381,
                  name: "邓州市",
                  children: [],
                },
              ],
            },
            {
              id: 411400,
              name: "商丘市",
              children: [
                {
                  id: 411402,
                  name: "梁园区",
                  children: [],
                },
                {
                  id: 411403,
                  name: "睢阳区",
                  children: [],
                },
                {
                  id: 411421,
                  name: "民权县",
                  children: [],
                },
                {
                  id: 411422,
                  name: "睢县",
                  children: [],
                },
                {
                  id: 411423,
                  name: "宁陵县",
                  children: [],
                },
                {
                  id: 411424,
                  name: "柘城县",
                  children: [],
                },
                {
                  id: 411425,
                  name: "虞城县",
                  children: [],
                },
                {
                  id: 411426,
                  name: "夏邑县",
                  children: [],
                },
                {
                  id: 411471,
                  name: "豫东综合物流产业聚集区",
                  children: [],
                },
                {
                  id: 411472,
                  name: "河南商丘经济开发区",
                  children: [],
                },
                {
                  id: 411481,
                  name: "永城市",
                  children: [],
                },
              ],
            },
            {
              id: 411500,
              name: "信阳市",
              children: [
                {
                  id: 411502,
                  name: "浉河区",
                  children: [],
                },
                {
                  id: 411503,
                  name: "平桥区",
                  children: [],
                },
                {
                  id: 411521,
                  name: "罗山县",
                  children: [],
                },
                {
                  id: 411522,
                  name: "光山县",
                  children: [],
                },
                {
                  id: 411523,
                  name: "新县",
                  children: [],
                },
                {
                  id: 411524,
                  name: "商城县",
                  children: [],
                },
                {
                  id: 411525,
                  name: "固始县",
                  children: [],
                },
                {
                  id: 411526,
                  name: "潢川县",
                  children: [],
                },
                {
                  id: 411527,
                  name: "淮滨县",
                  children: [],
                },
                {
                  id: 411528,
                  name: "息县",
                  children: [],
                },
                {
                  id: 411571,
                  name: "信阳高新技术产业开发区",
                  children: [],
                },
              ],
            },
            {
              id: 411600,
              name: "周口市",
              children: [
                {
                  id: 411602,
                  name: "川汇区",
                  children: [],
                },
                {
                  id: 411603,
                  name: "淮阳区",
                  children: [],
                },
                {
                  id: 411621,
                  name: "扶沟县",
                  children: [],
                },
                {
                  id: 411622,
                  name: "西华县",
                  children: [],
                },
                {
                  id: 411623,
                  name: "商水县",
                  children: [],
                },
                {
                  id: 411624,
                  name: "沈丘县",
                  children: [],
                },
                {
                  id: 411625,
                  name: "郸城县",
                  children: [],
                },
                {
                  id: 411627,
                  name: "太康县",
                  children: [],
                },
                {
                  id: 411628,
                  name: "鹿邑县",
                  children: [],
                },
                {
                  id: 411671,
                  name: "河南周口经济开发区",
                  children: [],
                },
                {
                  id: 411681,
                  name: "项城市",
                  children: [],
                },
              ],
            },
            {
              id: 411700,
              name: "驻马店市",
              children: [
                {
                  id: 411702,
                  name: "驿城区",
                  children: [],
                },
                {
                  id: 411721,
                  name: "西平县",
                  children: [],
                },
                {
                  id: 411722,
                  name: "上蔡县",
                  children: [],
                },
                {
                  id: 411723,
                  name: "平舆县",
                  children: [],
                },
                {
                  id: 411724,
                  name: "正阳县",
                  children: [],
                },
                {
                  id: 411725,
                  name: "确山县",
                  children: [],
                },
                {
                  id: 411726,
                  name: "泌阳县",
                  children: [],
                },
                {
                  id: 411727,
                  name: "汝南县",
                  children: [],
                },
                {
                  id: 411728,
                  name: "遂平县",
                  children: [],
                },
                {
                  id: 411729,
                  name: "新蔡县",
                  children: [],
                },
                {
                  id: 411771,
                  name: "河南驻马店经济开发区",
                  children: [],
                },
              ],
            },
            {
              id: 419000,
              name: "省直辖县级行政区划",
              children: [
                {
                  id: 419001,
                  name: "济源市",
                  children: [],
                },
              ],
            },
          ],
        },
        {
          id: 420000,
          name: "湖北省",
          children: [
            {
              id: 420100,
              name: "武汉市",
              children: [
                {
                  id: 420102,
                  name: "江岸区",
                  children: [],
                },
                {
                  id: 420103,
                  name: "江汉区",
                  children: [],
                },
                {
                  id: 420104,
                  name: "硚口区",
                  children: [],
                },
                {
                  id: 420105,
                  name: "汉阳区",
                  children: [],
                },
                {
                  id: 420106,
                  name: "武昌区",
                  children: [],
                },
                {
                  id: 420107,
                  name: "青山区",
                  children: [],
                },
                {
                  id: 420111,
                  name: "洪山区",
                  children: [],
                },
                {
                  id: 420112,
                  name: "东西湖区",
                  children: [],
                },
                {
                  id: 420113,
                  name: "汉南区",
                  children: [],
                },
                {
                  id: 420114,
                  name: "蔡甸区",
                  children: [],
                },
                {
                  id: 420115,
                  name: "江夏区",
                  children: [],
                },
                {
                  id: 420116,
                  name: "黄陂区",
                  children: [],
                },
                {
                  id: 420117,
                  name: "新洲区",
                  children: [],
                },
              ],
            },
            {
              id: 420200,
              name: "黄石市",
              children: [
                {
                  id: 420202,
                  name: "黄石港区",
                  children: [],
                },
                {
                  id: 420203,
                  name: "西塞山区",
                  children: [],
                },
                {
                  id: 420204,
                  name: "下陆区",
                  children: [],
                },
                {
                  id: 420205,
                  name: "铁山区",
                  children: [],
                },
                {
                  id: 420222,
                  name: "阳新县",
                  children: [],
                },
                {
                  id: 420281,
                  name: "大冶市",
                  children: [],
                },
              ],
            },
            {
              id: 420300,
              name: "十堰市",
              children: [
                {
                  id: 420302,
                  name: "茅箭区",
                  children: [],
                },
                {
                  id: 420303,
                  name: "张湾区",
                  children: [],
                },
                {
                  id: 420304,
                  name: "郧阳区",
                  children: [],
                },
                {
                  id: 420322,
                  name: "郧西县",
                  children: [],
                },
                {
                  id: 420323,
                  name: "竹山县",
                  children: [],
                },
                {
                  id: 420324,
                  name: "竹溪县",
                  children: [],
                },
                {
                  id: 420325,
                  name: "房县",
                  children: [],
                },
                {
                  id: 420381,
                  name: "丹江口市",
                  children: [],
                },
              ],
            },
            {
              id: 420500,
              name: "宜昌市",
              children: [
                {
                  id: 420502,
                  name: "西陵区",
                  children: [],
                },
                {
                  id: 420503,
                  name: "伍家岗区",
                  children: [],
                },
                {
                  id: 420504,
                  name: "点军区",
                  children: [],
                },
                {
                  id: 420505,
                  name: "猇亭区",
                  children: [],
                },
                {
                  id: 420506,
                  name: "夷陵区",
                  children: [],
                },
                {
                  id: 420525,
                  name: "远安县",
                  children: [],
                },
                {
                  id: 420526,
                  name: "兴山县",
                  children: [],
                },
                {
                  id: 420527,
                  name: "秭归县",
                  children: [],
                },
                {
                  id: 420528,
                  name: "长阳土家族自治县",
                  children: [],
                },
                {
                  id: 420529,
                  name: "五峰土家族自治县",
                  children: [],
                },
                {
                  id: 420581,
                  name: "宜都市",
                  children: [],
                },
                {
                  id: 420582,
                  name: "当阳市",
                  children: [],
                },
                {
                  id: 420583,
                  name: "枝江市",
                  children: [],
                },
              ],
            },
            {
              id: 420600,
              name: "襄阳市",
              children: [
                {
                  id: 420602,
                  name: "襄城区",
                  children: [],
                },
                {
                  id: 420606,
                  name: "樊城区",
                  children: [],
                },
                {
                  id: 420607,
                  name: "襄州区",
                  children: [],
                },
                {
                  id: 420624,
                  name: "南漳县",
                  children: [],
                },
                {
                  id: 420625,
                  name: "谷城县",
                  children: [],
                },
                {
                  id: 420626,
                  name: "保康县",
                  children: [],
                },
                {
                  id: 420682,
                  name: "老河口市",
                  children: [],
                },
                {
                  id: 420683,
                  name: "枣阳市",
                  children: [],
                },
                {
                  id: 420684,
                  name: "宜城市",
                  children: [],
                },
              ],
            },
            {
              id: 420700,
              name: "鄂州市",
              children: [
                {
                  id: 420702,
                  name: "梁子湖区",
                  children: [],
                },
                {
                  id: 420703,
                  name: "华容区",
                  children: [],
                },
                {
                  id: 420704,
                  name: "鄂城区",
                  children: [],
                },
              ],
            },
            {
              id: 420800,
              name: "荆门市",
              children: [
                {
                  id: 420802,
                  name: "东宝区",
                  children: [],
                },
                {
                  id: 420804,
                  name: "掇刀区",
                  children: [],
                },
                {
                  id: 420822,
                  name: "沙洋县",
                  children: [],
                },
                {
                  id: 420881,
                  name: "钟祥市",
                  children: [],
                },
                {
                  id: 420882,
                  name: "京山市",
                  children: [],
                },
              ],
            },
            {
              id: 420900,
              name: "孝感市",
              children: [
                {
                  id: 420902,
                  name: "孝南区",
                  children: [],
                },
                {
                  id: 420921,
                  name: "孝昌县",
                  children: [],
                },
                {
                  id: 420922,
                  name: "大悟县",
                  children: [],
                },
                {
                  id: 420923,
                  name: "云梦县",
                  children: [],
                },
                {
                  id: 420981,
                  name: "应城市",
                  children: [],
                },
                {
                  id: 420982,
                  name: "安陆市",
                  children: [],
                },
                {
                  id: 420984,
                  name: "汉川市",
                  children: [],
                },
              ],
            },
            {
              id: 421000,
              name: "荆州市",
              children: [
                {
                  id: 421002,
                  name: "沙市区",
                  children: [],
                },
                {
                  id: 421003,
                  name: "荆州区",
                  children: [],
                },
                {
                  id: 421022,
                  name: "公安县",
                  children: [],
                },
                {
                  id: 421024,
                  name: "江陵县",
                  children: [],
                },
                {
                  id: 421071,
                  name: "荆州经济技术开发区",
                  children: [],
                },
                {
                  id: 421081,
                  name: "石首市",
                  children: [],
                },
                {
                  id: 421083,
                  name: "洪湖市",
                  children: [],
                },
                {
                  id: 421087,
                  name: "松滋市",
                  children: [],
                },
                {
                  id: 421088,
                  name: "监利市",
                  children: [],
                },
              ],
            },
            {
              id: 421100,
              name: "黄冈市",
              children: [
                {
                  id: 421102,
                  name: "黄州区",
                  children: [],
                },
                {
                  id: 421121,
                  name: "团风县",
                  children: [],
                },
                {
                  id: 421122,
                  name: "红安县",
                  children: [],
                },
                {
                  id: 421123,
                  name: "罗田县",
                  children: [],
                },
                {
                  id: 421124,
                  name: "英山县",
                  children: [],
                },
                {
                  id: 421125,
                  name: "浠水县",
                  children: [],
                },
                {
                  id: 421126,
                  name: "蕲春县",
                  children: [],
                },
                {
                  id: 421127,
                  name: "黄梅县",
                  children: [],
                },
                {
                  id: 421171,
                  name: "龙感湖管理区",
                  children: [],
                },
                {
                  id: 421181,
                  name: "麻城市",
                  children: [],
                },
                {
                  id: 421182,
                  name: "武穴市",
                  children: [],
                },
              ],
            },
            {
              id: 421200,
              name: "咸宁市",
              children: [
                {
                  id: 421202,
                  name: "咸安区",
                  children: [],
                },
                {
                  id: 421221,
                  name: "嘉鱼县",
                  children: [],
                },
                {
                  id: 421222,
                  name: "通城县",
                  children: [],
                },
                {
                  id: 421223,
                  name: "崇阳县",
                  children: [],
                },
                {
                  id: 421224,
                  name: "通山县",
                  children: [],
                },
                {
                  id: 421281,
                  name: "赤壁市",
                  children: [],
                },
              ],
            },
            {
              id: 421300,
              name: "随州市",
              children: [
                {
                  id: 421303,
                  name: "曾都区",
                  children: [],
                },
                {
                  id: 421321,
                  name: "随县",
                  children: [],
                },
                {
                  id: 421381,
                  name: "广水市",
                  children: [],
                },
              ],
            },
            {
              id: 422800,
              name: "恩施土家族苗族自治州",
              children: [
                {
                  id: 422801,
                  name: "恩施市",
                  children: [],
                },
                {
                  id: 422802,
                  name: "利川市",
                  children: [],
                },
                {
                  id: 422822,
                  name: "建始县",
                  children: [],
                },
                {
                  id: 422823,
                  name: "巴东县",
                  children: [],
                },
                {
                  id: 422825,
                  name: "宣恩县",
                  children: [],
                },
                {
                  id: 422826,
                  name: "咸丰县",
                  children: [],
                },
                {
                  id: 422827,
                  name: "来凤县",
                  children: [],
                },
                {
                  id: 422828,
                  name: "鹤峰县",
                  children: [],
                },
              ],
            },
            {
              id: 429000,
              name: "省直辖县级行政区划",
              children: [
                {
                  id: 429004,
                  name: "仙桃市",
                  children: [],
                },
                {
                  id: 429005,
                  name: "潜江市",
                  children: [],
                },
                {
                  id: 429006,
                  name: "天门市",
                  children: [],
                },
                {
                  id: 429021,
                  name: "神农架林区",
                  children: [],
                },
              ],
            },
          ],
        },
        {
          id: 430000,
          name: "湖南省",
          children: [
            {
              id: 430100,
              name: "长沙市",
              children: [
                {
                  id: 430102,
                  name: "芙蓉区",
                  children: [],
                },
                {
                  id: 430103,
                  name: "天心区",
                  children: [],
                },
                {
                  id: 430104,
                  name: "岳麓区",
                  children: [],
                },
                {
                  id: 430105,
                  name: "开福区",
                  children: [],
                },
                {
                  id: 430111,
                  name: "雨花区",
                  children: [],
                },
                {
                  id: 430112,
                  name: "望城区",
                  children: [],
                },
                {
                  id: 430121,
                  name: "长沙县",
                  children: [],
                },
                {
                  id: 430181,
                  name: "浏阳市",
                  children: [],
                },
                {
                  id: 430182,
                  name: "宁乡市",
                  children: [],
                },
              ],
            },
            {
              id: 430200,
              name: "株洲市",
              children: [
                {
                  id: 430202,
                  name: "荷塘区",
                  children: [],
                },
                {
                  id: 430203,
                  name: "芦淞区",
                  children: [],
                },
                {
                  id: 430204,
                  name: "石峰区",
                  children: [],
                },
                {
                  id: 430211,
                  name: "天元区",
                  children: [],
                },
                {
                  id: 430212,
                  name: "渌口区",
                  children: [],
                },
                {
                  id: 430223,
                  name: "攸县",
                  children: [],
                },
                {
                  id: 430224,
                  name: "茶陵县",
                  children: [],
                },
                {
                  id: 430225,
                  name: "炎陵县",
                  children: [],
                },
                {
                  id: 430271,
                  name: "云龙示范区",
                  children: [],
                },
                {
                  id: 430281,
                  name: "醴陵市",
                  children: [],
                },
              ],
            },
            {
              id: 430300,
              name: "湘潭市",
              children: [
                {
                  id: 430302,
                  name: "雨湖区",
                  children: [],
                },
                {
                  id: 430304,
                  name: "岳塘区",
                  children: [],
                },
                {
                  id: 430321,
                  name: "湘潭县",
                  children: [],
                },
                {
                  id: 430371,
                  name: "湖南湘潭高新技术产业园区",
                  children: [],
                },
                {
                  id: 430372,
                  name: "湘潭昭山示范区",
                  children: [],
                },
                {
                  id: 430373,
                  name: "湘潭九华示范区",
                  children: [],
                },
                {
                  id: 430381,
                  name: "湘乡市",
                  children: [],
                },
                {
                  id: 430382,
                  name: "韶山市",
                  children: [],
                },
              ],
            },
            {
              id: 430400,
              name: "衡阳市",
              children: [
                {
                  id: 430405,
                  name: "珠晖区",
                  children: [],
                },
                {
                  id: 430406,
                  name: "雁峰区",
                  children: [],
                },
                {
                  id: 430407,
                  name: "石鼓区",
                  children: [],
                },
                {
                  id: 430408,
                  name: "蒸湘区",
                  children: [],
                },
                {
                  id: 430412,
                  name: "南岳区",
                  children: [],
                },
                {
                  id: 430421,
                  name: "衡阳县",
                  children: [],
                },
                {
                  id: 430422,
                  name: "衡南县",
                  children: [],
                },
                {
                  id: 430423,
                  name: "衡山县",
                  children: [],
                },
                {
                  id: 430424,
                  name: "衡东县",
                  children: [],
                },
                {
                  id: 430426,
                  name: "祁东县",
                  children: [],
                },
                {
                  id: 430471,
                  name: "衡阳综合保税区",
                  children: [],
                },
                {
                  id: 430472,
                  name: "湖南衡阳高新技术产业园区",
                  children: [],
                },
                {
                  id: 430473,
                  name: "湖南衡阳松木经济开发区",
                  children: [],
                },
                {
                  id: 430481,
                  name: "耒阳市",
                  children: [],
                },
                {
                  id: 430482,
                  name: "常宁市",
                  children: [],
                },
              ],
            },
            {
              id: 430500,
              name: "邵阳市",
              children: [
                {
                  id: 430502,
                  name: "双清区",
                  children: [],
                },
                {
                  id: 430503,
                  name: "大祥区",
                  children: [],
                },
                {
                  id: 430511,
                  name: "北塔区",
                  children: [],
                },
                {
                  id: 430522,
                  name: "新邵县",
                  children: [],
                },
                {
                  id: 430523,
                  name: "邵阳县",
                  children: [],
                },
                {
                  id: 430524,
                  name: "隆回县",
                  children: [],
                },
                {
                  id: 430525,
                  name: "洞口县",
                  children: [],
                },
                {
                  id: 430527,
                  name: "绥宁县",
                  children: [],
                },
                {
                  id: 430528,
                  name: "新宁县",
                  children: [],
                },
                {
                  id: 430529,
                  name: "城步苗族自治县",
                  children: [],
                },
                {
                  id: 430581,
                  name: "武冈市",
                  children: [],
                },
                {
                  id: 430582,
                  name: "邵东市",
                  children: [],
                },
              ],
            },
            {
              id: 430600,
              name: "岳阳市",
              children: [
                {
                  id: 430602,
                  name: "岳阳楼区",
                  children: [],
                },
                {
                  id: 430603,
                  name: "云溪区",
                  children: [],
                },
                {
                  id: 430611,
                  name: "君山区",
                  children: [],
                },
                {
                  id: 430621,
                  name: "岳阳县",
                  children: [],
                },
                {
                  id: 430623,
                  name: "华容县",
                  children: [],
                },
                {
                  id: 430624,
                  name: "湘阴县",
                  children: [],
                },
                {
                  id: 430626,
                  name: "平江县",
                  children: [],
                },
                {
                  id: 430671,
                  name: "岳阳市屈原管理区",
                  children: [],
                },
                {
                  id: 430681,
                  name: "汨罗市",
                  children: [],
                },
                {
                  id: 430682,
                  name: "临湘市",
                  children: [],
                },
              ],
            },
            {
              id: 430700,
              name: "常德市",
              children: [
                {
                  id: 430702,
                  name: "武陵区",
                  children: [],
                },
                {
                  id: 430703,
                  name: "鼎城区",
                  children: [],
                },
                {
                  id: 430721,
                  name: "安乡县",
                  children: [],
                },
                {
                  id: 430722,
                  name: "汉寿县",
                  children: [],
                },
                {
                  id: 430723,
                  name: "澧县",
                  children: [],
                },
                {
                  id: 430724,
                  name: "临澧县",
                  children: [],
                },
                {
                  id: 430725,
                  name: "桃源县",
                  children: [],
                },
                {
                  id: 430726,
                  name: "石门县",
                  children: [],
                },
                {
                  id: 430771,
                  name: "常德市西洞庭管理区",
                  children: [],
                },
                {
                  id: 430781,
                  name: "津市市",
                  children: [],
                },
              ],
            },
            {
              id: 430800,
              name: "张家界市",
              children: [
                {
                  id: 430802,
                  name: "永定区",
                  children: [],
                },
                {
                  id: 430811,
                  name: "武陵源区",
                  children: [],
                },
                {
                  id: 430821,
                  name: "慈利县",
                  children: [],
                },
                {
                  id: 430822,
                  name: "桑植县",
                  children: [],
                },
              ],
            },
            {
              id: 430900,
              name: "益阳市",
              children: [
                {
                  id: 430902,
                  name: "资阳区",
                  children: [],
                },
                {
                  id: 430903,
                  name: "赫山区",
                  children: [],
                },
                {
                  id: 430921,
                  name: "南县",
                  children: [],
                },
                {
                  id: 430922,
                  name: "桃江县",
                  children: [],
                },
                {
                  id: 430923,
                  name: "安化县",
                  children: [],
                },
                {
                  id: 430971,
                  name: "益阳市大通湖管理区",
                  children: [],
                },
                {
                  id: 430972,
                  name: "湖南益阳高新技术产业园区",
                  children: [],
                },
                {
                  id: 430981,
                  name: "沅江市",
                  children: [],
                },
              ],
            },
            {
              id: 431000,
              name: "郴州市",
              children: [
                {
                  id: 431002,
                  name: "北湖区",
                  children: [],
                },
                {
                  id: 431003,
                  name: "苏仙区",
                  children: [],
                },
                {
                  id: 431021,
                  name: "桂阳县",
                  children: [],
                },
                {
                  id: 431022,
                  name: "宜章县",
                  children: [],
                },
                {
                  id: 431023,
                  name: "永兴县",
                  children: [],
                },
                {
                  id: 431024,
                  name: "嘉禾县",
                  children: [],
                },
                {
                  id: 431025,
                  name: "临武县",
                  children: [],
                },
                {
                  id: 431026,
                  name: "汝城县",
                  children: [],
                },
                {
                  id: 431027,
                  name: "桂东县",
                  children: [],
                },
                {
                  id: 431028,
                  name: "安仁县",
                  children: [],
                },
                {
                  id: 431081,
                  name: "资兴市",
                  children: [],
                },
              ],
            },
            {
              id: 431100,
              name: "永州市",
              children: [
                {
                  id: 431102,
                  name: "零陵区",
                  children: [],
                },
                {
                  id: 431103,
                  name: "冷水滩区",
                  children: [],
                },
                {
                  id: 431122,
                  name: "东安县",
                  children: [],
                },
                {
                  id: 431123,
                  name: "双牌县",
                  children: [],
                },
                {
                  id: 431124,
                  name: "道县",
                  children: [],
                },
                {
                  id: 431125,
                  name: "江永县",
                  children: [],
                },
                {
                  id: 431126,
                  name: "宁远县",
                  children: [],
                },
                {
                  id: 431127,
                  name: "蓝山县",
                  children: [],
                },
                {
                  id: 431128,
                  name: "新田县",
                  children: [],
                },
                {
                  id: 431129,
                  name: "江华瑶族自治县",
                  children: [],
                },
                {
                  id: 431171,
                  name: "永州经济技术开发区",
                  children: [],
                },
                {
                  id: 431173,
                  name: "永州市回龙圩管理区",
                  children: [],
                },
                {
                  id: 431181,
                  name: "祁阳市",
                  children: [],
                },
              ],
            },
            {
              id: 431200,
              name: "怀化市",
              children: [
                {
                  id: 431202,
                  name: "鹤城区",
                  children: [],
                },
                {
                  id: 431221,
                  name: "中方县",
                  children: [],
                },
                {
                  id: 431222,
                  name: "沅陵县",
                  children: [],
                },
                {
                  id: 431223,
                  name: "辰溪县",
                  children: [],
                },
                {
                  id: 431224,
                  name: "溆浦县",
                  children: [],
                },
                {
                  id: 431225,
                  name: "会同县",
                  children: [],
                },
                {
                  id: 431226,
                  name: "麻阳苗族自治县",
                  children: [],
                },
                {
                  id: 431227,
                  name: "新晃侗族自治县",
                  children: [],
                },
                {
                  id: 431228,
                  name: "芷江侗族自治县",
                  children: [],
                },
                {
                  id: 431229,
                  name: "靖州苗族侗族自治县",
                  children: [],
                },
                {
                  id: 431230,
                  name: "通道侗族自治县",
                  children: [],
                },
                {
                  id: 431271,
                  name: "怀化市洪江管理区",
                  children: [],
                },
                {
                  id: 431281,
                  name: "洪江市",
                  children: [],
                },
              ],
            },
            {
              id: 431300,
              name: "娄底市",
              children: [
                {
                  id: 431302,
                  name: "娄星区",
                  children: [],
                },
                {
                  id: 431321,
                  name: "双峰县",
                  children: [],
                },
                {
                  id: 431322,
                  name: "新化县",
                  children: [],
                },
                {
                  id: 431381,
                  name: "冷水江市",
                  children: [],
                },
                {
                  id: 431382,
                  name: "涟源市",
                  children: [],
                },
              ],
            },
            {
              id: 433100,
              name: "湘西土家族苗族自治州",
              children: [
                {
                  id: 433101,
                  name: "吉首市",
                  children: [],
                },
                {
                  id: 433122,
                  name: "泸溪县",
                  children: [],
                },
                {
                  id: 433123,
                  name: "凤凰县",
                  children: [],
                },
                {
                  id: 433124,
                  name: "花垣县",
                  children: [],
                },
                {
                  id: 433125,
                  name: "保靖县",
                  children: [],
                },
                {
                  id: 433126,
                  name: "古丈县",
                  children: [],
                },
                {
                  id: 433127,
                  name: "永顺县",
                  children: [],
                },
                {
                  id: 433130,
                  name: "龙山县",
                  children: [],
                },
              ],
            },
          ],
        },
        {
          id: 440000,
          name: "广东省",
          children: [
            {
              id: 440100,
              name: "广州市",
              children: [
                {
                  id: 440103,
                  name: "荔湾区",
                  children: [],
                },
                {
                  id: 440104,
                  name: "越秀区",
                  children: [],
                },
                {
                  id: 440105,
                  name: "海珠区",
                  children: [],
                },
                {
                  id: 440106,
                  name: "天河区",
                  children: [],
                },
                {
                  id: 440111,
                  name: "白云区",
                  children: [],
                },
                {
                  id: 440112,
                  name: "黄埔区",
                  children: [],
                },
                {
                  id: 440113,
                  name: "番禺区",
                  children: [],
                },
                {
                  id: 440114,
                  name: "花都区",
                  children: [],
                },
                {
                  id: 440115,
                  name: "南沙区",
                  children: [],
                },
                {
                  id: 440117,
                  name: "从化区",
                  children: [],
                },
                {
                  id: 440118,
                  name: "增城区",
                  children: [],
                },
              ],
            },
            {
              id: 440200,
              name: "韶关市",
              children: [
                {
                  id: 440203,
                  name: "武江区",
                  children: [],
                },
                {
                  id: 440204,
                  name: "浈江区",
                  children: [],
                },
                {
                  id: 440205,
                  name: "曲江区",
                  children: [],
                },
                {
                  id: 440222,
                  name: "始兴县",
                  children: [],
                },
                {
                  id: 440224,
                  name: "仁化县",
                  children: [],
                },
                {
                  id: 440229,
                  name: "翁源县",
                  children: [],
                },
                {
                  id: 440232,
                  name: "乳源瑶族自治县",
                  children: [],
                },
                {
                  id: 440233,
                  name: "新丰县",
                  children: [],
                },
                {
                  id: 440281,
                  name: "乐昌市",
                  children: [],
                },
                {
                  id: 440282,
                  name: "南雄市",
                  children: [],
                },
              ],
            },
            {
              id: 440300,
              name: "深圳市",
              children: [
                {
                  id: 440303,
                  name: "罗湖区",
                  children: [],
                },
                {
                  id: 440304,
                  name: "福田区",
                  children: [],
                },
                {
                  id: 440305,
                  name: "南山区",
                  children: [],
                },
                {
                  id: 440306,
                  name: "宝安区",
                  children: [],
                },
                {
                  id: 440307,
                  name: "龙岗区",
                  children: [],
                },
                {
                  id: 440308,
                  name: "盐田区",
                  children: [],
                },
                {
                  id: 440309,
                  name: "龙华区",
                  children: [],
                },
                {
                  id: 440310,
                  name: "坪山区",
                  children: [],
                },
                {
                  id: 440311,
                  name: "光明区",
                  children: [],
                },
              ],
            },
            {
              id: 440400,
              name: "珠海市",
              children: [
                {
                  id: 440402,
                  name: "香洲区",
                  children: [],
                },
                {
                  id: 440403,
                  name: "斗门区",
                  children: [],
                },
                {
                  id: 440404,
                  name: "金湾区",
                  children: [],
                },
              ],
            },
            {
              id: 440500,
              name: "汕头市",
              children: [
                {
                  id: 440507,
                  name: "龙湖区",
                  children: [],
                },
                {
                  id: 440511,
                  name: "金平区",
                  children: [],
                },
                {
                  id: 440512,
                  name: "濠江区",
                  children: [],
                },
                {
                  id: 440513,
                  name: "潮阳区",
                  children: [],
                },
                {
                  id: 440514,
                  name: "潮南区",
                  children: [],
                },
                {
                  id: 440515,
                  name: "澄海区",
                  children: [],
                },
                {
                  id: 440523,
                  name: "南澳县",
                  children: [],
                },
              ],
            },
            {
              id: 440600,
              name: "佛山市",
              children: [
                {
                  id: 440604,
                  name: "禅城区",
                  children: [],
                },
                {
                  id: 440605,
                  name: "南海区",
                  children: [],
                },
                {
                  id: 440606,
                  name: "顺德区",
                  children: [],
                },
                {
                  id: 440607,
                  name: "三水区",
                  children: [],
                },
                {
                  id: 440608,
                  name: "高明区",
                  children: [],
                },
              ],
            },
            {
              id: 440700,
              name: "江门市",
              children: [
                {
                  id: 440703,
                  name: "蓬江区",
                  children: [],
                },
                {
                  id: 440704,
                  name: "江海区",
                  children: [],
                },
                {
                  id: 440705,
                  name: "新会区",
                  children: [],
                },
                {
                  id: 440781,
                  name: "台山市",
                  children: [],
                },
                {
                  id: 440783,
                  name: "开平市",
                  children: [],
                },
                {
                  id: 440784,
                  name: "鹤山市",
                  children: [],
                },
                {
                  id: 440785,
                  name: "恩平市",
                  children: [],
                },
              ],
            },
            {
              id: 440800,
              name: "湛江市",
              children: [
                {
                  id: 440802,
                  name: "赤坎区",
                  children: [],
                },
                {
                  id: 440803,
                  name: "霞山区",
                  children: [],
                },
                {
                  id: 440804,
                  name: "坡头区",
                  children: [],
                },
                {
                  id: 440811,
                  name: "麻章区",
                  children: [],
                },
                {
                  id: 440823,
                  name: "遂溪县",
                  children: [],
                },
                {
                  id: 440825,
                  name: "徐闻县",
                  children: [],
                },
                {
                  id: 440881,
                  name: "廉江市",
                  children: [],
                },
                {
                  id: 440882,
                  name: "雷州市",
                  children: [],
                },
                {
                  id: 440883,
                  name: "吴川市",
                  children: [],
                },
              ],
            },
            {
              id: 440900,
              name: "茂名市",
              children: [
                {
                  id: 440902,
                  name: "茂南区",
                  children: [],
                },
                {
                  id: 440904,
                  name: "电白区",
                  children: [],
                },
                {
                  id: 440981,
                  name: "高州市",
                  children: [],
                },
                {
                  id: 440982,
                  name: "化州市",
                  children: [],
                },
                {
                  id: 440983,
                  name: "信宜市",
                  children: [],
                },
              ],
            },
            {
              id: 441200,
              name: "肇庆市",
              children: [
                {
                  id: 441202,
                  name: "端州区",
                  children: [],
                },
                {
                  id: 441203,
                  name: "鼎湖区",
                  children: [],
                },
                {
                  id: 441204,
                  name: "高要区",
                  children: [],
                },
                {
                  id: 441223,
                  name: "广宁县",
                  children: [],
                },
                {
                  id: 441224,
                  name: "怀集县",
                  children: [],
                },
                {
                  id: 441225,
                  name: "封开县",
                  children: [],
                },
                {
                  id: 441226,
                  name: "德庆县",
                  children: [],
                },
                {
                  id: 441284,
                  name: "四会市",
                  children: [],
                },
              ],
            },
            {
              id: 441300,
              name: "惠州市",
              children: [
                {
                  id: 441302,
                  name: "惠城区",
                  children: [],
                },
                {
                  id: 441303,
                  name: "惠阳区",
                  children: [],
                },
                {
                  id: 441322,
                  name: "博罗县",
                  children: [],
                },
                {
                  id: 441323,
                  name: "惠东县",
                  children: [],
                },
                {
                  id: 441324,
                  name: "龙门县",
                  children: [],
                },
              ],
            },
            {
              id: 441400,
              name: "梅州市",
              children: [
                {
                  id: 441402,
                  name: "梅江区",
                  children: [],
                },
                {
                  id: 441403,
                  name: "梅县区",
                  children: [],
                },
                {
                  id: 441422,
                  name: "大埔县",
                  children: [],
                },
                {
                  id: 441423,
                  name: "丰顺县",
                  children: [],
                },
                {
                  id: 441424,
                  name: "五华县",
                  children: [],
                },
                {
                  id: 441426,
                  name: "平远县",
                  children: [],
                },
                {
                  id: 441427,
                  name: "蕉岭县",
                  children: [],
                },
                {
                  id: 441481,
                  name: "兴宁市",
                  children: [],
                },
              ],
            },
            {
              id: 441500,
              name: "汕尾市",
              children: [
                {
                  id: 441502,
                  name: "城区",
                  children: [],
                },
                {
                  id: 441521,
                  name: "海丰县",
                  children: [],
                },
                {
                  id: 441523,
                  name: "陆河县",
                  children: [],
                },
                {
                  id: 441581,
                  name: "陆丰市",
                  children: [],
                },
              ],
            },
            {
              id: 441600,
              name: "河源市",
              children: [
                {
                  id: 441602,
                  name: "源城区",
                  children: [],
                },
                {
                  id: 441621,
                  name: "紫金县",
                  children: [],
                },
                {
                  id: 441622,
                  name: "龙川县",
                  children: [],
                },
                {
                  id: 441623,
                  name: "连平县",
                  children: [],
                },
                {
                  id: 441624,
                  name: "和平县",
                  children: [],
                },
                {
                  id: 441625,
                  name: "东源县",
                  children: [],
                },
              ],
            },
            {
              id: 441700,
              name: "阳江市",
              children: [
                {
                  id: 441702,
                  name: "江城区",
                  children: [],
                },
                {
                  id: 441704,
                  name: "阳东区",
                  children: [],
                },
                {
                  id: 441721,
                  name: "阳西县",
                  children: [],
                },
                {
                  id: 441781,
                  name: "阳春市",
                  children: [],
                },
              ],
            },
            {
              id: 441800,
              name: "清远市",
              children: [
                {
                  id: 441802,
                  name: "清城区",
                  children: [],
                },
                {
                  id: 441803,
                  name: "清新区",
                  children: [],
                },
                {
                  id: 441821,
                  name: "佛冈县",
                  children: [],
                },
                {
                  id: 441823,
                  name: "阳山县",
                  children: [],
                },
                {
                  id: 441825,
                  name: "连山壮族瑶族自治县",
                  children: [],
                },
                {
                  id: 441826,
                  name: "连南瑶族自治县",
                  children: [],
                },
                {
                  id: 441881,
                  name: "英德市",
                  children: [],
                },
                {
                  id: 441882,
                  name: "连州市",
                  children: [],
                },
              ],
            },
            {
              id: 441900,
              name: "东莞市",
              children: [
                {
                  id: 441901,
                  name: "莞城区",
                  children: [],
                },
                {
                  id: 441902,
                  name: "南城区",
                  children: [],
                },
                {
                  id: 441904,
                  name: "万江区",
                  children: [],
                },
                {
                  id: 441905,
                  name: "石碣镇",
                  children: [],
                },
                {
                  id: 441906,
                  name: "石龙镇",
                  children: [],
                },
                {
                  id: 441907,
                  name: "茶山镇",
                  children: [],
                },
                {
                  id: 441908,
                  name: "石排镇",
                  children: [],
                },
                {
                  id: 441909,
                  name: "企石镇",
                  children: [],
                },
                {
                  id: 441910,
                  name: "横沥镇",
                  children: [],
                },
                {
                  id: 441911,
                  name: "桥头镇",
                  children: [],
                },
                {
                  id: 441912,
                  name: "谢岗镇",
                  children: [],
                },
                {
                  id: 441913,
                  name: "东坑镇",
                  children: [],
                },
                {
                  id: 441914,
                  name: "常平镇",
                  children: [],
                },
                {
                  id: 441915,
                  name: "寮步镇",
                  children: [],
                },
                {
                  id: 441916,
                  name: "大朗镇",
                  children: [],
                },
                {
                  id: 441917,
                  name: "麻涌镇",
                  children: [],
                },
                {
                  id: 441918,
                  name: "中堂镇",
                  children: [],
                },
                {
                  id: 441919,
                  name: "高埗镇",
                  children: [],
                },
                {
                  id: 441920,
                  name: "樟木头镇",
                  children: [],
                },
                {
                  id: 441921,
                  name: "大岭山镇",
                  children: [],
                },
                {
                  id: 441922,
                  name: "望牛墩镇",
                  children: [],
                },
                {
                  id: 441923,
                  name: "黄江镇",
                  children: [],
                },
                {
                  id: 441924,
                  name: "洪梅镇",
                  children: [],
                },
                {
                  id: 441925,
                  name: "清溪镇",
                  children: [],
                },
                {
                  id: 441926,
                  name: "沙田镇",
                  children: [],
                },
                {
                  id: 441927,
                  name: "道滘镇",
                  children: [],
                },
                {
                  id: 441928,
                  name: "塘厦镇",
                  children: [],
                },
                {
                  id: 441929,
                  name: "虎门镇",
                  children: [],
                },
                {
                  id: 441930,
                  name: "厚街镇",
                  children: [],
                },
                {
                  id: 441931,
                  name: "凤岗镇",
                  children: [],
                },
                {
                  id: 441932,
                  name: "长安镇",
                  children: [],
                },
              ],
            },
            {
              id: 442000,
              name: "中山市",
              children: [
                {
                  id: 442001,
                  name: "石岐街道",
                  children: [],
                },
                {
                  id: 442002,
                  name: "东区街道",
                  children: [],
                },
                {
                  id: 442003,
                  name: "中山港街道",
                  children: [],
                },
                {
                  id: 442004,
                  name: "西区街道",
                  children: [],
                },
                {
                  id: 442005,
                  name: "南区街道",
                  children: [],
                },
                {
                  id: 442006,
                  name: "五桂山街道",
                  children: [],
                },
                {
                  id: 442007,
                  name: "民众街道",
                  children: [],
                },
                {
                  id: 442008,
                  name: "南朗街道",
                  children: [],
                },
                {
                  id: 442009,
                  name: "黄圃镇",
                  children: [],
                },
                {
                  id: 442010,
                  name: "东凤镇",
                  children: [],
                },
                {
                  id: 442011,
                  name: "古镇镇",
                  children: [],
                },
                {
                  id: 442012,
                  name: "沙溪镇",
                  children: [],
                },
                {
                  id: 442013,
                  name: "坦洲镇",
                  children: [],
                },
                {
                  id: 442014,
                  name: "港口镇",
                  children: [],
                },
                {
                  id: 442015,
                  name: "三角镇",
                  children: [],
                },
                {
                  id: 442016,
                  name: "横栏镇",
                  children: [],
                },
                {
                  id: 442017,
                  name: "南头镇",
                  children: [],
                },
                {
                  id: 442018,
                  name: "阜沙镇",
                  children: [],
                },
                {
                  id: 442019,
                  name: "三乡镇",
                  children: [],
                },
                {
                  id: 442020,
                  name: "板芙镇",
                  children: [],
                },
                {
                  id: 442021,
                  name: "大涌镇",
                  children: [],
                },
                {
                  id: 442022,
                  name: "神湾镇",
                  children: [],
                },
                {
                  id: 442023,
                  name: "小榄镇",
                  children: [],
                },
              ],
            },
            {
              id: 445100,
              name: "潮州市",
              children: [
                {
                  id: 445102,
                  name: "湘桥区",
                  children: [],
                },
                {
                  id: 445103,
                  name: "潮安区",
                  children: [],
                },
                {
                  id: 445122,
                  name: "饶平县",
                  children: [],
                },
              ],
            },
            {
              id: 445200,
              name: "揭阳市",
              children: [
                {
                  id: 445202,
                  name: "榕城区",
                  children: [],
                },
                {
                  id: 445203,
                  name: "揭东区",
                  children: [],
                },
                {
                  id: 445222,
                  name: "揭西县",
                  children: [],
                },
                {
                  id: 445224,
                  name: "惠来县",
                  children: [],
                },
                {
                  id: 445281,
                  name: "普宁市",
                  children: [],
                },
              ],
            },
            {
              id: 445300,
              name: "云浮市",
              children: [
                {
                  id: 445302,
                  name: "云城区",
                  children: [],
                },
                {
                  id: 445303,
                  name: "云安区",
                  children: [],
                },
                {
                  id: 445321,
                  name: "新兴县",
                  children: [],
                },
                {
                  id: 445322,
                  name: "郁南县",
                  children: [],
                },
                {
                  id: 445381,
                  name: "罗定市",
                  children: [],
                },
              ],
            },
          ],
        },
        {
          id: 450000,
          name: "广西壮族自治区",
          children: [
            {
              id: 450100,
              name: "南宁市",
              children: [
                {
                  id: 450102,
                  name: "兴宁区",
                  children: [],
                },
                {
                  id: 450103,
                  name: "青秀区",
                  children: [],
                },
                {
                  id: 450105,
                  name: "江南区",
                  children: [],
                },
                {
                  id: 450107,
                  name: "西乡塘区",
                  children: [],
                },
                {
                  id: 450108,
                  name: "良庆区",
                  children: [],
                },
                {
                  id: 450109,
                  name: "邕宁区",
                  children: [],
                },
                {
                  id: 450110,
                  name: "武鸣区",
                  children: [],
                },
                {
                  id: 450123,
                  name: "隆安县",
                  children: [],
                },
                {
                  id: 450124,
                  name: "马山县",
                  children: [],
                },
                {
                  id: 450125,
                  name: "上林县",
                  children: [],
                },
                {
                  id: 450126,
                  name: "宾阳县",
                  children: [],
                },
                {
                  id: 450181,
                  name: "横州市",
                  children: [],
                },
              ],
            },
            {
              id: 450200,
              name: "柳州市",
              children: [
                {
                  id: 450202,
                  name: "城中区",
                  children: [],
                },
                {
                  id: 450203,
                  name: "鱼峰区",
                  children: [],
                },
                {
                  id: 450204,
                  name: "柳南区",
                  children: [],
                },
                {
                  id: 450205,
                  name: "柳北区",
                  children: [],
                },
                {
                  id: 450206,
                  name: "柳江区",
                  children: [],
                },
                {
                  id: 450222,
                  name: "柳城县",
                  children: [],
                },
                {
                  id: 450223,
                  name: "鹿寨县",
                  children: [],
                },
                {
                  id: 450224,
                  name: "融安县",
                  children: [],
                },
                {
                  id: 450225,
                  name: "融水苗族自治县",
                  children: [],
                },
                {
                  id: 450226,
                  name: "三江侗族自治县",
                  children: [],
                },
              ],
            },
            {
              id: 450300,
              name: "桂林市",
              children: [
                {
                  id: 450302,
                  name: "秀峰区",
                  children: [],
                },
                {
                  id: 450303,
                  name: "叠彩区",
                  children: [],
                },
                {
                  id: 450304,
                  name: "象山区",
                  children: [],
                },
                {
                  id: 450305,
                  name: "七星区",
                  children: [],
                },
                {
                  id: 450311,
                  name: "雁山区",
                  children: [],
                },
                {
                  id: 450312,
                  name: "临桂区",
                  children: [],
                },
                {
                  id: 450321,
                  name: "阳朔县",
                  children: [],
                },
                {
                  id: 450323,
                  name: "灵川县",
                  children: [],
                },
                {
                  id: 450324,
                  name: "全州县",
                  children: [],
                },
                {
                  id: 450325,
                  name: "兴安县",
                  children: [],
                },
                {
                  id: 450326,
                  name: "永福县",
                  children: [],
                },
                {
                  id: 450327,
                  name: "灌阳县",
                  children: [],
                },
                {
                  id: 450328,
                  name: "龙胜各族自治县",
                  children: [],
                },
                {
                  id: 450329,
                  name: "资源县",
                  children: [],
                },
                {
                  id: 450330,
                  name: "平乐县",
                  children: [],
                },
                {
                  id: 450332,
                  name: "恭城瑶族自治县",
                  children: [],
                },
                {
                  id: 450381,
                  name: "荔浦市",
                  children: [],
                },
              ],
            },
            {
              id: 450400,
              name: "梧州市",
              children: [
                {
                  id: 450403,
                  name: "万秀区",
                  children: [],
                },
                {
                  id: 450405,
                  name: "长洲区",
                  children: [],
                },
                {
                  id: 450406,
                  name: "龙圩区",
                  children: [],
                },
                {
                  id: 450421,
                  name: "苍梧县",
                  children: [],
                },
                {
                  id: 450422,
                  name: "藤县",
                  children: [],
                },
                {
                  id: 450423,
                  name: "蒙山县",
                  children: [],
                },
                {
                  id: 450481,
                  name: "岑溪市",
                  children: [],
                },
              ],
            },
            {
              id: 450500,
              name: "北海市",
              children: [
                {
                  id: 450502,
                  name: "海城区",
                  children: [],
                },
                {
                  id: 450503,
                  name: "银海区",
                  children: [],
                },
                {
                  id: 450512,
                  name: "铁山港区",
                  children: [],
                },
                {
                  id: 450521,
                  name: "合浦县",
                  children: [],
                },
              ],
            },
            {
              id: 450600,
              name: "防城港市",
              children: [
                {
                  id: 450602,
                  name: "港口区",
                  children: [],
                },
                {
                  id: 450603,
                  name: "防城区",
                  children: [],
                },
                {
                  id: 450621,
                  name: "上思县",
                  children: [],
                },
                {
                  id: 450681,
                  name: "东兴市",
                  children: [],
                },
              ],
            },
            {
              id: 450700,
              name: "钦州市",
              children: [
                {
                  id: 450702,
                  name: "钦南区",
                  children: [],
                },
                {
                  id: 450703,
                  name: "钦北区",
                  children: [],
                },
                {
                  id: 450721,
                  name: "灵山县",
                  children: [],
                },
                {
                  id: 450722,
                  name: "浦北县",
                  children: [],
                },
              ],
            },
            {
              id: 450800,
              name: "贵港市",
              children: [
                {
                  id: 450802,
                  name: "港北区",
                  children: [],
                },
                {
                  id: 450803,
                  name: "港南区",
                  children: [],
                },
                {
                  id: 450804,
                  name: "覃塘区",
                  children: [],
                },
                {
                  id: 450821,
                  name: "平南县",
                  children: [],
                },
                {
                  id: 450881,
                  name: "桂平市",
                  children: [],
                },
              ],
            },
            {
              id: 450900,
              name: "玉林市",
              children: [
                {
                  id: 450902,
                  name: "玉州区",
                  children: [],
                },
                {
                  id: 450903,
                  name: "福绵区",
                  children: [],
                },
                {
                  id: 450921,
                  name: "容县",
                  children: [],
                },
                {
                  id: 450922,
                  name: "陆川县",
                  children: [],
                },
                {
                  id: 450923,
                  name: "博白县",
                  children: [],
                },
                {
                  id: 450924,
                  name: "兴业县",
                  children: [],
                },
                {
                  id: 450981,
                  name: "北流市",
                  children: [],
                },
              ],
            },
            {
              id: 451000,
              name: "百色市",
              children: [
                {
                  id: 451002,
                  name: "右江区",
                  children: [],
                },
                {
                  id: 451003,
                  name: "田阳区",
                  children: [],
                },
                {
                  id: 451022,
                  name: "田东县",
                  children: [],
                },
                {
                  id: 451024,
                  name: "德保县",
                  children: [],
                },
                {
                  id: 451026,
                  name: "那坡县",
                  children: [],
                },
                {
                  id: 451027,
                  name: "凌云县",
                  children: [],
                },
                {
                  id: 451028,
                  name: "乐业县",
                  children: [],
                },
                {
                  id: 451029,
                  name: "田林县",
                  children: [],
                },
                {
                  id: 451030,
                  name: "西林县",
                  children: [],
                },
                {
                  id: 451031,
                  name: "隆林各族自治县",
                  children: [],
                },
                {
                  id: 451081,
                  name: "靖西市",
                  children: [],
                },
                {
                  id: 451082,
                  name: "平果市",
                  children: [],
                },
              ],
            },
            {
              id: 451100,
              name: "贺州市",
              children: [
                {
                  id: 451102,
                  name: "八步区",
                  children: [],
                },
                {
                  id: 451103,
                  name: "平桂区",
                  children: [],
                },
                {
                  id: 451121,
                  name: "昭平县",
                  children: [],
                },
                {
                  id: 451122,
                  name: "钟山县",
                  children: [],
                },
                {
                  id: 451123,
                  name: "富川瑶族自治县",
                  children: [],
                },
              ],
            },
            {
              id: 451200,
              name: "河池市",
              children: [
                {
                  id: 451202,
                  name: "金城江区",
                  children: [],
                },
                {
                  id: 451203,
                  name: "宜州区",
                  children: [],
                },
                {
                  id: 451221,
                  name: "南丹县",
                  children: [],
                },
                {
                  id: 451222,
                  name: "天峨县",
                  children: [],
                },
                {
                  id: 451223,
                  name: "凤山县",
                  children: [],
                },
                {
                  id: 451224,
                  name: "东兰县",
                  children: [],
                },
                {
                  id: 451225,
                  name: "罗城仫佬族自治县",
                  children: [],
                },
                {
                  id: 451226,
                  name: "环江毛南族自治县",
                  children: [],
                },
                {
                  id: 451227,
                  name: "巴马瑶族自治县",
                  children: [],
                },
                {
                  id: 451228,
                  name: "都安瑶族自治县",
                  children: [],
                },
                {
                  id: 451229,
                  name: "大化瑶族自治县",
                  children: [],
                },
              ],
            },
            {
              id: 451300,
              name: "来宾市",
              children: [
                {
                  id: 451302,
                  name: "兴宾区",
                  children: [],
                },
                {
                  id: 451321,
                  name: "忻城县",
                  children: [],
                },
                {
                  id: 451322,
                  name: "象州县",
                  children: [],
                },
                {
                  id: 451323,
                  name: "武宣县",
                  children: [],
                },
                {
                  id: 451324,
                  name: "金秀瑶族自治县",
                  children: [],
                },
                {
                  id: 451381,
                  name: "合山市",
                  children: [],
                },
              ],
            },
            {
              id: 451400,
              name: "崇左市",
              children: [
                {
                  id: 451402,
                  name: "江州区",
                  children: [],
                },
                {
                  id: 451421,
                  name: "扶绥县",
                  children: [],
                },
                {
                  id: 451422,
                  name: "宁明县",
                  children: [],
                },
                {
                  id: 451423,
                  name: "龙州县",
                  children: [],
                },
                {
                  id: 451424,
                  name: "大新县",
                  children: [],
                },
                {
                  id: 451425,
                  name: "天等县",
                  children: [],
                },
                {
                  id: 451481,
                  name: "凭祥市",
                  children: [],
                },
              ],
            },
          ],
        },
        {
          id: 460000,
          name: "海南省",
          children: [
            {
              id: 460100,
              name: "海口市",
              children: [
                {
                  id: 460105,
                  name: "秀英区",
                  children: [],
                },
                {
                  id: 460106,
                  name: "龙华区",
                  children: [],
                },
                {
                  id: 460107,
                  name: "琼山区",
                  children: [],
                },
                {
                  id: 460108,
                  name: "美兰区",
                  children: [],
                },
              ],
            },
            {
              id: 460200,
              name: "三亚市",
              children: [
                {
                  id: 460202,
                  name: "海棠区",
                  children: [],
                },
                {
                  id: 460203,
                  name: "吉阳区",
                  children: [],
                },
                {
                  id: 460204,
                  name: "天涯区",
                  children: [],
                },
                {
                  id: 460205,
                  name: "崖州区",
                  children: [],
                },
              ],
            },
            {
              id: 460300,
              name: "三沙市",
              children: [
                {
                  id: 460321,
                  name: "西沙群岛",
                  children: [],
                },
                {
                  id: 460322,
                  name: "南沙群岛",
                  children: [],
                },
                {
                  id: 460323,
                  name: "中沙群岛的岛礁及其海域",
                  children: [],
                },
              ],
            },
            {
              id: 460400,
              name: "儋州市",
              children: [],
            },
            {
              id: 469000,
              name: "省直辖县级行政区划",
              children: [
                {
                  id: 469001,
                  name: "五指山市",
                  children: [],
                },
                {
                  id: 469002,
                  name: "琼海市",
                  children: [],
                },
                {
                  id: 469005,
                  name: "文昌市",
                  children: [],
                },
                {
                  id: 469006,
                  name: "万宁市",
                  children: [],
                },
                {
                  id: 469007,
                  name: "东方市",
                  children: [],
                },
                {
                  id: 469021,
                  name: "定安县",
                  children: [],
                },
                {
                  id: 469022,
                  name: "屯昌县",
                  children: [],
                },
                {
                  id: 469023,
                  name: "澄迈县",
                  children: [],
                },
                {
                  id: 469024,
                  name: "临高县",
                  children: [],
                },
                {
                  id: 469025,
                  name: "白沙黎族自治县",
                  children: [],
                },
                {
                  id: 469026,
                  name: "昌江黎族自治县",
                  children: [],
                },
                {
                  id: 469027,
                  name: "乐东黎族自治县",
                  children: [],
                },
                {
                  id: 469028,
                  name: "陵水黎族自治县",
                  children: [],
                },
                {
                  id: 469029,
                  name: "保亭黎族苗族自治县",
                  children: [],
                },
                {
                  id: 469030,
                  name: "琼中黎族苗族自治县",
                  children: [],
                },
              ],
            },
          ],
        },
        {
          id: 500000,
          name: "重庆市",
          children: [
            {
              id: 500100,
              name: "重庆市",
              children: [
                {
                  id: 500101,
                  name: "万州区",
                  children: [],
                },
                {
                  id: 500102,
                  name: "涪陵区",
                  children: [],
                },
                {
                  id: 500103,
                  name: "渝中区",
                  children: [],
                },
                {
                  id: 500104,
                  name: "大渡口区",
                  children: [],
                },
                {
                  id: 500105,
                  name: "江北区",
                  children: [],
                },
                {
                  id: 500106,
                  name: "沙坪坝区",
                  children: [],
                },
                {
                  id: 500107,
                  name: "九龙坡区",
                  children: [],
                },
                {
                  id: 500108,
                  name: "南岸区",
                  children: [],
                },
                {
                  id: 500109,
                  name: "北碚区",
                  children: [],
                },
                {
                  id: 500110,
                  name: "綦江区",
                  children: [],
                },
                {
                  id: 500111,
                  name: "大足区",
                  children: [],
                },
                {
                  id: 500112,
                  name: "渝北区",
                  children: [],
                },
                {
                  id: 500113,
                  name: "巴南区",
                  children: [],
                },
                {
                  id: 500114,
                  name: "黔江区",
                  children: [],
                },
                {
                  id: 500115,
                  name: "长寿区",
                  children: [],
                },
                {
                  id: 500116,
                  name: "江津区",
                  children: [],
                },
                {
                  id: 500117,
                  name: "合川区",
                  children: [],
                },
                {
                  id: 500118,
                  name: "永川区",
                  children: [],
                },
                {
                  id: 500119,
                  name: "南川区",
                  children: [],
                },
                {
                  id: 500120,
                  name: "璧山区",
                  children: [],
                },
                {
                  id: 500151,
                  name: "铜梁区",
                  children: [],
                },
                {
                  id: 500152,
                  name: "潼南区",
                  children: [],
                },
                {
                  id: 500153,
                  name: "荣昌区",
                  children: [],
                },
                {
                  id: 500154,
                  name: "开州区",
                  children: [],
                },
                {
                  id: 500155,
                  name: "梁平区",
                  children: [],
                },
                {
                  id: 500156,
                  name: "武隆区",
                  children: [],
                },
                {
                  id: 500229,
                  name: "城口县",
                  children: [],
                },
                {
                  id: 500230,
                  name: "丰都县",
                  children: [],
                },
                {
                  id: 500231,
                  name: "垫江县",
                  children: [],
                },
                {
                  id: 500233,
                  name: "忠县",
                  children: [],
                },
                {
                  id: 500235,
                  name: "云阳县",
                  children: [],
                },
                {
                  id: 500236,
                  name: "奉节县",
                  children: [],
                },
                {
                  id: 500237,
                  name: "巫山县",
                  children: [],
                },
                {
                  id: 500238,
                  name: "巫溪县",
                  children: [],
                },
                {
                  id: 500240,
                  name: "石柱土家族自治县",
                  children: [],
                },
                {
                  id: 500241,
                  name: "秀山土家族苗族自治县",
                  children: [],
                },
                {
                  id: 500242,
                  name: "酉阳土家族苗族自治县",
                  children: [],
                },
                {
                  id: 500243,
                  name: "彭水苗族土家族自治县",
                  children: [],
                },
              ],
            },
          ],
        },
        {
          id: 510000,
          name: "四川省",
          children: [
            {
              id: 510100,
              name: "成都市",
              children: [
                {
                  id: 510104,
                  name: "锦江区",
                  children: [],
                },
                {
                  id: 510105,
                  name: "青羊区",
                  children: [],
                },
                {
                  id: 510106,
                  name: "金牛区",
                  children: [],
                },
                {
                  id: 510107,
                  name: "武侯区",
                  children: [],
                },
                {
                  id: 510108,
                  name: "成华区",
                  children: [],
                },
                {
                  id: 510112,
                  name: "龙泉驿区",
                  children: [],
                },
                {
                  id: 510113,
                  name: "青白江区",
                  children: [],
                },
                {
                  id: 510114,
                  name: "新都区",
                  children: [],
                },
                {
                  id: 510115,
                  name: "温江区",
                  children: [],
                },
                {
                  id: 510116,
                  name: "双流区",
                  children: [],
                },
                {
                  id: 510117,
                  name: "郫都区",
                  children: [],
                },
                {
                  id: 510118,
                  name: "新津区",
                  children: [],
                },
                {
                  id: 510121,
                  name: "金堂县",
                  children: [],
                },
                {
                  id: 510129,
                  name: "大邑县",
                  children: [],
                },
                {
                  id: 510131,
                  name: "蒲江县",
                  children: [],
                },
                {
                  id: 510181,
                  name: "都江堰市",
                  children: [],
                },
                {
                  id: 510182,
                  name: "彭州市",
                  children: [],
                },
                {
                  id: 510183,
                  name: "邛崃市",
                  children: [],
                },
                {
                  id: 510184,
                  name: "崇州市",
                  children: [],
                },
                {
                  id: 510185,
                  name: "简阳市",
                  children: [],
                },
              ],
            },
            {
              id: 510300,
              name: "自贡市",
              children: [
                {
                  id: 510302,
                  name: "自流井区",
                  children: [],
                },
                {
                  id: 510303,
                  name: "贡井区",
                  children: [],
                },
                {
                  id: 510304,
                  name: "大安区",
                  children: [],
                },
                {
                  id: 510311,
                  name: "沿滩区",
                  children: [],
                },
                {
                  id: 510321,
                  name: "荣县",
                  children: [],
                },
                {
                  id: 510322,
                  name: "富顺县",
                  children: [],
                },
              ],
            },
            {
              id: 510400,
              name: "攀枝花市",
              children: [
                {
                  id: 510402,
                  name: "东区",
                  children: [],
                },
                {
                  id: 510403,
                  name: "西区",
                  children: [],
                },
                {
                  id: 510411,
                  name: "仁和区",
                  children: [],
                },
                {
                  id: 510421,
                  name: "米易县",
                  children: [],
                },
                {
                  id: 510422,
                  name: "盐边县",
                  children: [],
                },
              ],
            },
            {
              id: 510500,
              name: "泸州市",
              children: [
                {
                  id: 510502,
                  name: "江阳区",
                  children: [],
                },
                {
                  id: 510503,
                  name: "纳溪区",
                  children: [],
                },
                {
                  id: 510504,
                  name: "龙马潭区",
                  children: [],
                },
                {
                  id: 510521,
                  name: "泸县",
                  children: [],
                },
                {
                  id: 510522,
                  name: "合江县",
                  children: [],
                },
                {
                  id: 510524,
                  name: "叙永县",
                  children: [],
                },
                {
                  id: 510525,
                  name: "古蔺县",
                  children: [],
                },
              ],
            },
            {
              id: 510600,
              name: "德阳市",
              children: [
                {
                  id: 510603,
                  name: "旌阳区",
                  children: [],
                },
                {
                  id: 510604,
                  name: "罗江区",
                  children: [],
                },
                {
                  id: 510623,
                  name: "中江县",
                  children: [],
                },
                {
                  id: 510681,
                  name: "广汉市",
                  children: [],
                },
                {
                  id: 510682,
                  name: "什邡市",
                  children: [],
                },
                {
                  id: 510683,
                  name: "绵竹市",
                  children: [],
                },
              ],
            },
            {
              id: 510700,
              name: "绵阳市",
              children: [
                {
                  id: 510703,
                  name: "涪城区",
                  children: [],
                },
                {
                  id: 510704,
                  name: "游仙区",
                  children: [],
                },
                {
                  id: 510705,
                  name: "安州区",
                  children: [],
                },
                {
                  id: 510722,
                  name: "三台县",
                  children: [],
                },
                {
                  id: 510723,
                  name: "盐亭县",
                  children: [],
                },
                {
                  id: 510725,
                  name: "梓潼县",
                  children: [],
                },
                {
                  id: 510726,
                  name: "北川羌族自治县",
                  children: [],
                },
                {
                  id: 510727,
                  name: "平武县",
                  children: [],
                },
                {
                  id: 510781,
                  name: "江油市",
                  children: [],
                },
              ],
            },
            {
              id: 510800,
              name: "广元市",
              children: [
                {
                  id: 510802,
                  name: "利州区",
                  children: [],
                },
                {
                  id: 510811,
                  name: "昭化区",
                  children: [],
                },
                {
                  id: 510812,
                  name: "朝天区",
                  children: [],
                },
                {
                  id: 510821,
                  name: "旺苍县",
                  children: [],
                },
                {
                  id: 510822,
                  name: "青川县",
                  children: [],
                },
                {
                  id: 510823,
                  name: "剑阁县",
                  children: [],
                },
                {
                  id: 510824,
                  name: "苍溪县",
                  children: [],
                },
              ],
            },
            {
              id: 510900,
              name: "遂宁市",
              children: [
                {
                  id: 510903,
                  name: "船山区",
                  children: [],
                },
                {
                  id: 510904,
                  name: "安居区",
                  children: [],
                },
                {
                  id: 510921,
                  name: "蓬溪县",
                  children: [],
                },
                {
                  id: 510923,
                  name: "大英县",
                  children: [],
                },
                {
                  id: 510981,
                  name: "射洪市",
                  children: [],
                },
              ],
            },
            {
              id: 511000,
              name: "内江市",
              children: [
                {
                  id: 511002,
                  name: "市中区",
                  children: [],
                },
                {
                  id: 511011,
                  name: "东兴区",
                  children: [],
                },
                {
                  id: 511024,
                  name: "威远县",
                  children: [],
                },
                {
                  id: 511025,
                  name: "资中县",
                  children: [],
                },
                {
                  id: 511071,
                  name: "内江经济开发区",
                  children: [],
                },
                {
                  id: 511083,
                  name: "隆昌市",
                  children: [],
                },
              ],
            },
            {
              id: 511100,
              name: "乐山市",
              children: [
                {
                  id: 511102,
                  name: "市中区",
                  children: [],
                },
                {
                  id: 511111,
                  name: "沙湾区",
                  children: [],
                },
                {
                  id: 511112,
                  name: "五通桥区",
                  children: [],
                },
                {
                  id: 511113,
                  name: "金口河区",
                  children: [],
                },
                {
                  id: 511123,
                  name: "犍为县",
                  children: [],
                },
                {
                  id: 511124,
                  name: "井研县",
                  children: [],
                },
                {
                  id: 511126,
                  name: "夹江县",
                  children: [],
                },
                {
                  id: 511129,
                  name: "沐川县",
                  children: [],
                },
                {
                  id: 511132,
                  name: "峨边彝族自治县",
                  children: [],
                },
                {
                  id: 511133,
                  name: "马边彝族自治县",
                  children: [],
                },
                {
                  id: 511181,
                  name: "峨眉山市",
                  children: [],
                },
              ],
            },
            {
              id: 511300,
              name: "南充市",
              children: [
                {
                  id: 511302,
                  name: "顺庆区",
                  children: [],
                },
                {
                  id: 511303,
                  name: "高坪区",
                  children: [],
                },
                {
                  id: 511304,
                  name: "嘉陵区",
                  children: [],
                },
                {
                  id: 511321,
                  name: "南部县",
                  children: [],
                },
                {
                  id: 511322,
                  name: "营山县",
                  children: [],
                },
                {
                  id: 511323,
                  name: "蓬安县",
                  children: [],
                },
                {
                  id: 511324,
                  name: "仪陇县",
                  children: [],
                },
                {
                  id: 511325,
                  name: "西充县",
                  children: [],
                },
                {
                  id: 511381,
                  name: "阆中市",
                  children: [],
                },
              ],
            },
            {
              id: 511400,
              name: "眉山市",
              children: [
                {
                  id: 511402,
                  name: "东坡区",
                  children: [],
                },
                {
                  id: 511403,
                  name: "彭山区",
                  children: [],
                },
                {
                  id: 511421,
                  name: "仁寿县",
                  children: [],
                },
                {
                  id: 511423,
                  name: "洪雅县",
                  children: [],
                },
                {
                  id: 511424,
                  name: "丹棱县",
                  children: [],
                },
                {
                  id: 511425,
                  name: "青神县",
                  children: [],
                },
              ],
            },
            {
              id: 511500,
              name: "宜宾市",
              children: [
                {
                  id: 511502,
                  name: "翠屏区",
                  children: [],
                },
                {
                  id: 511503,
                  name: "南溪区",
                  children: [],
                },
                {
                  id: 511504,
                  name: "叙州区",
                  children: [],
                },
                {
                  id: 511523,
                  name: "江安县",
                  children: [],
                },
                {
                  id: 511524,
                  name: "长宁县",
                  children: [],
                },
                {
                  id: 511525,
                  name: "高县",
                  children: [],
                },
                {
                  id: 511526,
                  name: "珙县",
                  children: [],
                },
                {
                  id: 511527,
                  name: "筠连县",
                  children: [],
                },
                {
                  id: 511528,
                  name: "兴文县",
                  children: [],
                },
                {
                  id: 511529,
                  name: "屏山县",
                  children: [],
                },
              ],
            },
            {
              id: 511600,
              name: "广安市",
              children: [
                {
                  id: 511602,
                  name: "广安区",
                  children: [],
                },
                {
                  id: 511603,
                  name: "前锋区",
                  children: [],
                },
                {
                  id: 511621,
                  name: "岳池县",
                  children: [],
                },
                {
                  id: 511622,
                  name: "武胜县",
                  children: [],
                },
                {
                  id: 511623,
                  name: "邻水县",
                  children: [],
                },
                {
                  id: 511681,
                  name: "华蓥市",
                  children: [],
                },
              ],
            },
            {
              id: 511700,
              name: "达州市",
              children: [
                {
                  id: 511702,
                  name: "通川区",
                  children: [],
                },
                {
                  id: 511703,
                  name: "达川区",
                  children: [],
                },
                {
                  id: 511722,
                  name: "宣汉县",
                  children: [],
                },
                {
                  id: 511723,
                  name: "开江县",
                  children: [],
                },
                {
                  id: 511724,
                  name: "大竹县",
                  children: [],
                },
                {
                  id: 511725,
                  name: "渠县",
                  children: [],
                },
                {
                  id: 511771,
                  name: "达州经济开发区",
                  children: [],
                },
                {
                  id: 511781,
                  name: "万源市",
                  children: [],
                },
              ],
            },
            {
              id: 511800,
              name: "雅安市",
              children: [
                {
                  id: 511802,
                  name: "雨城区",
                  children: [],
                },
                {
                  id: 511803,
                  name: "名山区",
                  children: [],
                },
                {
                  id: 511822,
                  name: "荥经县",
                  children: [],
                },
                {
                  id: 511823,
                  name: "汉源县",
                  children: [],
                },
                {
                  id: 511824,
                  name: "石棉县",
                  children: [],
                },
                {
                  id: 511825,
                  name: "天全县",
                  children: [],
                },
                {
                  id: 511826,
                  name: "芦山县",
                  children: [],
                },
                {
                  id: 511827,
                  name: "宝兴县",
                  children: [],
                },
              ],
            },
            {
              id: 511900,
              name: "巴中市",
              children: [
                {
                  id: 511902,
                  name: "巴州区",
                  children: [],
                },
                {
                  id: 511903,
                  name: "恩阳区",
                  children: [],
                },
                {
                  id: 511921,
                  name: "通江县",
                  children: [],
                },
                {
                  id: 511922,
                  name: "南江县",
                  children: [],
                },
                {
                  id: 511923,
                  name: "平昌县",
                  children: [],
                },
                {
                  id: 511971,
                  name: "巴中经济开发区",
                  children: [],
                },
              ],
            },
            {
              id: 512000,
              name: "资阳市",
              children: [
                {
                  id: 512002,
                  name: "雁江区",
                  children: [],
                },
                {
                  id: 512021,
                  name: "安岳县",
                  children: [],
                },
                {
                  id: 512022,
                  name: "乐至县",
                  children: [],
                },
              ],
            },
            {
              id: 513200,
              name: "阿坝藏族羌族自治州",
              children: [
                {
                  id: 513201,
                  name: "马尔康市",
                  children: [],
                },
                {
                  id: 513221,
                  name: "汶川县",
                  children: [],
                },
                {
                  id: 513222,
                  name: "理县",
                  children: [],
                },
                {
                  id: 513223,
                  name: "茂县",
                  children: [],
                },
                {
                  id: 513224,
                  name: "松潘县",
                  children: [],
                },
                {
                  id: 513225,
                  name: "九寨沟县",
                  children: [],
                },
                {
                  id: 513226,
                  name: "金川县",
                  children: [],
                },
                {
                  id: 513227,
                  name: "小金县",
                  children: [],
                },
                {
                  id: 513228,
                  name: "黑水县",
                  children: [],
                },
                {
                  id: 513230,
                  name: "壤塘县",
                  children: [],
                },
                {
                  id: 513231,
                  name: "阿坝县",
                  children: [],
                },
                {
                  id: 513232,
                  name: "若尔盖县",
                  children: [],
                },
                {
                  id: 513233,
                  name: "红原县",
                  children: [],
                },
              ],
            },
            {
              id: 513300,
              name: "甘孜藏族自治州",
              children: [
                {
                  id: 513301,
                  name: "康定市",
                  children: [],
                },
                {
                  id: 513322,
                  name: "泸定县",
                  children: [],
                },
                {
                  id: 513323,
                  name: "丹巴县",
                  children: [],
                },
                {
                  id: 513324,
                  name: "九龙县",
                  children: [],
                },
                {
                  id: 513325,
                  name: "雅江县",
                  children: [],
                },
                {
                  id: 513326,
                  name: "道孚县",
                  children: [],
                },
                {
                  id: 513327,
                  name: "炉霍县",
                  children: [],
                },
                {
                  id: 513328,
                  name: "甘孜县",
                  children: [],
                },
                {
                  id: 513329,
                  name: "新龙县",
                  children: [],
                },
                {
                  id: 513330,
                  name: "德格县",
                  children: [],
                },
                {
                  id: 513331,
                  name: "白玉县",
                  children: [],
                },
                {
                  id: 513332,
                  name: "石渠县",
                  children: [],
                },
                {
                  id: 513333,
                  name: "色达县",
                  children: [],
                },
                {
                  id: 513334,
                  name: "理塘县",
                  children: [],
                },
                {
                  id: 513335,
                  name: "巴塘县",
                  children: [],
                },
                {
                  id: 513336,
                  name: "乡城县",
                  children: [],
                },
                {
                  id: 513337,
                  name: "稻城县",
                  children: [],
                },
                {
                  id: 513338,
                  name: "得荣县",
                  children: [],
                },
              ],
            },
            {
              id: 513400,
              name: "凉山彝族自治州",
              children: [
                {
                  id: 513401,
                  name: "西昌市",
                  children: [],
                },
                {
                  id: 513402,
                  name: "会理市",
                  children: [],
                },
                {
                  id: 513422,
                  name: "木里藏族自治县",
                  children: [],
                },
                {
                  id: 513423,
                  name: "盐源县",
                  children: [],
                },
                {
                  id: 513424,
                  name: "德昌县",
                  children: [],
                },
                {
                  id: 513426,
                  name: "会东县",
                  children: [],
                },
                {
                  id: 513427,
                  name: "宁南县",
                  children: [],
                },
                {
                  id: 513428,
                  name: "普格县",
                  children: [],
                },
                {
                  id: 513429,
                  name: "布拖县",
                  children: [],
                },
                {
                  id: 513430,
                  name: "金阳县",
                  children: [],
                },
                {
                  id: 513431,
                  name: "昭觉县",
                  children: [],
                },
                {
                  id: 513432,
                  name: "喜德县",
                  children: [],
                },
                {
                  id: 513433,
                  name: "冕宁县",
                  children: [],
                },
                {
                  id: 513434,
                  name: "越西县",
                  children: [],
                },
                {
                  id: 513435,
                  name: "甘洛县",
                  children: [],
                },
                {
                  id: 513436,
                  name: "美姑县",
                  children: [],
                },
                {
                  id: 513437,
                  name: "雷波县",
                  children: [],
                },
              ],
            },
          ],
        },
        {
          id: 520000,
          name: "贵州省",
          children: [
            {
              id: 520100,
              name: "贵阳市",
              children: [
                {
                  id: 520102,
                  name: "南明区",
                  children: [],
                },
                {
                  id: 520103,
                  name: "云岩区",
                  children: [],
                },
                {
                  id: 520111,
                  name: "花溪区",
                  children: [],
                },
                {
                  id: 520112,
                  name: "乌当区",
                  children: [],
                },
                {
                  id: 520113,
                  name: "白云区",
                  children: [],
                },
                {
                  id: 520115,
                  name: "观山湖区",
                  children: [],
                },
                {
                  id: 520121,
                  name: "开阳县",
                  children: [],
                },
                {
                  id: 520122,
                  name: "息烽县",
                  children: [],
                },
                {
                  id: 520123,
                  name: "修文县",
                  children: [],
                },
                {
                  id: 520181,
                  name: "清镇市",
                  children: [],
                },
              ],
            },
            {
              id: 520200,
              name: "六盘水市",
              children: [
                {
                  id: 520201,
                  name: "钟山区",
                  children: [],
                },
                {
                  id: 520203,
                  name: "六枝特区",
                  children: [],
                },
                {
                  id: 520204,
                  name: "水城区",
                  children: [],
                },
                {
                  id: 520281,
                  name: "盘州市",
                  children: [],
                },
              ],
            },
            {
              id: 520300,
              name: "遵义市",
              children: [
                {
                  id: 520302,
                  name: "红花岗区",
                  children: [],
                },
                {
                  id: 520303,
                  name: "汇川区",
                  children: [],
                },
                {
                  id: 520304,
                  name: "播州区",
                  children: [],
                },
                {
                  id: 520322,
                  name: "桐梓县",
                  children: [],
                },
                {
                  id: 520323,
                  name: "绥阳县",
                  children: [],
                },
                {
                  id: 520324,
                  name: "正安县",
                  children: [],
                },
                {
                  id: 520325,
                  name: "道真仡佬族苗族自治县",
                  children: [],
                },
                {
                  id: 520326,
                  name: "务川仡佬族苗族自治县",
                  children: [],
                },
                {
                  id: 520327,
                  name: "凤冈县",
                  children: [],
                },
                {
                  id: 520328,
                  name: "湄潭县",
                  children: [],
                },
                {
                  id: 520329,
                  name: "余庆县",
                  children: [],
                },
                {
                  id: 520330,
                  name: "习水县",
                  children: [],
                },
                {
                  id: 520381,
                  name: "赤水市",
                  children: [],
                },
                {
                  id: 520382,
                  name: "仁怀市",
                  children: [],
                },
              ],
            },
            {
              id: 520400,
              name: "安顺市",
              children: [
                {
                  id: 520402,
                  name: "西秀区",
                  children: [],
                },
                {
                  id: 520403,
                  name: "平坝区",
                  children: [],
                },
                {
                  id: 520422,
                  name: "普定县",
                  children: [],
                },
                {
                  id: 520423,
                  name: "镇宁布依族苗族自治县",
                  children: [],
                },
                {
                  id: 520424,
                  name: "关岭布依族苗族自治县",
                  children: [],
                },
                {
                  id: 520425,
                  name: "紫云苗族布依族自治县",
                  children: [],
                },
              ],
            },
            {
              id: 520500,
              name: "毕节市",
              children: [
                {
                  id: 520502,
                  name: "七星关区",
                  children: [],
                },
                {
                  id: 520521,
                  name: "大方县",
                  children: [],
                },
                {
                  id: 520523,
                  name: "金沙县",
                  children: [],
                },
                {
                  id: 520524,
                  name: "织金县",
                  children: [],
                },
                {
                  id: 520525,
                  name: "纳雍县",
                  children: [],
                },
                {
                  id: 520526,
                  name: "威宁彝族回族苗族自治县",
                  children: [],
                },
                {
                  id: 520527,
                  name: "赫章县",
                  children: [],
                },
                {
                  id: 520581,
                  name: "黔西市",
                  children: [],
                },
              ],
            },
            {
              id: 520600,
              name: "铜仁市",
              children: [
                {
                  id: 520602,
                  name: "碧江区",
                  children: [],
                },
                {
                  id: 520603,
                  name: "万山区",
                  children: [],
                },
                {
                  id: 520621,
                  name: "江口县",
                  children: [],
                },
                {
                  id: 520622,
                  name: "玉屏侗族自治县",
                  children: [],
                },
                {
                  id: 520623,
                  name: "石阡县",
                  children: [],
                },
                {
                  id: 520624,
                  name: "思南县",
                  children: [],
                },
                {
                  id: 520625,
                  name: "印江土家族苗族自治县",
                  children: [],
                },
                {
                  id: 520626,
                  name: "德江县",
                  children: [],
                },
                {
                  id: 520627,
                  name: "沿河土家族自治县",
                  children: [],
                },
                {
                  id: 520628,
                  name: "松桃苗族自治县",
                  children: [],
                },
              ],
            },
            {
              id: 522300,
              name: "黔西南布依族苗族自治州",
              children: [
                {
                  id: 522301,
                  name: "兴义市",
                  children: [],
                },
                {
                  id: 522302,
                  name: "兴仁市",
                  children: [],
                },
                {
                  id: 522323,
                  name: "普安县",
                  children: [],
                },
                {
                  id: 522324,
                  name: "晴隆县",
                  children: [],
                },
                {
                  id: 522325,
                  name: "贞丰县",
                  children: [],
                },
                {
                  id: 522326,
                  name: "望谟县",
                  children: [],
                },
                {
                  id: 522327,
                  name: "册亨县",
                  children: [],
                },
                {
                  id: 522328,
                  name: "安龙县",
                  children: [],
                },
              ],
            },
            {
              id: 522600,
              name: "黔东南苗族侗族自治州",
              children: [
                {
                  id: 522601,
                  name: "凯里市",
                  children: [],
                },
                {
                  id: 522622,
                  name: "黄平县",
                  children: [],
                },
                {
                  id: 522623,
                  name: "施秉县",
                  children: [],
                },
                {
                  id: 522624,
                  name: "三穗县",
                  children: [],
                },
                {
                  id: 522625,
                  name: "镇远县",
                  children: [],
                },
                {
                  id: 522626,
                  name: "岑巩县",
                  children: [],
                },
                {
                  id: 522627,
                  name: "天柱县",
                  children: [],
                },
                {
                  id: 522628,
                  name: "锦屏县",
                  children: [],
                },
                {
                  id: 522629,
                  name: "剑河县",
                  children: [],
                },
                {
                  id: 522630,
                  name: "台江县",
                  children: [],
                },
                {
                  id: 522631,
                  name: "黎平县",
                  children: [],
                },
                {
                  id: 522632,
                  name: "榕江县",
                  children: [],
                },
                {
                  id: 522633,
                  name: "从江县",
                  children: [],
                },
                {
                  id: 522634,
                  name: "雷山县",
                  children: [],
                },
                {
                  id: 522635,
                  name: "麻江县",
                  children: [],
                },
                {
                  id: 522636,
                  name: "丹寨县",
                  children: [],
                },
              ],
            },
            {
              id: 522700,
              name: "黔南布依族苗族自治州",
              children: [
                {
                  id: 522701,
                  name: "都匀市",
                  children: [],
                },
                {
                  id: 522702,
                  name: "福泉市",
                  children: [],
                },
                {
                  id: 522722,
                  name: "荔波县",
                  children: [],
                },
                {
                  id: 522723,
                  name: "贵定县",
                  children: [],
                },
                {
                  id: 522725,
                  name: "瓮安县",
                  children: [],
                },
                {
                  id: 522726,
                  name: "独山县",
                  children: [],
                },
                {
                  id: 522727,
                  name: "平塘县",
                  children: [],
                },
                {
                  id: 522728,
                  name: "罗甸县",
                  children: [],
                },
                {
                  id: 522729,
                  name: "长顺县",
                  children: [],
                },
                {
                  id: 522730,
                  name: "龙里县",
                  children: [],
                },
                {
                  id: 522731,
                  name: "惠水县",
                  children: [],
                },
                {
                  id: 522732,
                  name: "三都水族自治县",
                  children: [],
                },
              ],
            },
          ],
        },
        {
          id: 530000,
          name: "云南省",
          children: [
            {
              id: 530100,
              name: "昆明市",
              children: [
                {
                  id: 530102,
                  name: "五华区",
                  children: [],
                },
                {
                  id: 530103,
                  name: "盘龙区",
                  children: [],
                },
                {
                  id: 530111,
                  name: "官渡区",
                  children: [],
                },
                {
                  id: 530112,
                  name: "西山区",
                  children: [],
                },
                {
                  id: 530113,
                  name: "东川区",
                  children: [],
                },
                {
                  id: 530114,
                  name: "呈贡区",
                  children: [],
                },
                {
                  id: 530115,
                  name: "晋宁区",
                  children: [],
                },
                {
                  id: 530124,
                  name: "富民县",
                  children: [],
                },
                {
                  id: 530125,
                  name: "宜良县",
                  children: [],
                },
                {
                  id: 530126,
                  name: "石林彝族自治县",
                  children: [],
                },
                {
                  id: 530127,
                  name: "嵩明县",
                  children: [],
                },
                {
                  id: 530128,
                  name: "禄劝彝族苗族自治县",
                  children: [],
                },
                {
                  id: 530129,
                  name: "寻甸回族彝族自治县",
                  children: [],
                },
                {
                  id: 530181,
                  name: "安宁市",
                  children: [],
                },
              ],
            },
            {
              id: 530300,
              name: "曲靖市",
              children: [
                {
                  id: 530302,
                  name: "麒麟区",
                  children: [],
                },
                {
                  id: 530303,
                  name: "沾益区",
                  children: [],
                },
                {
                  id: 530304,
                  name: "马龙区",
                  children: [],
                },
                {
                  id: 530322,
                  name: "陆良县",
                  children: [],
                },
                {
                  id: 530323,
                  name: "师宗县",
                  children: [],
                },
                {
                  id: 530324,
                  name: "罗平县",
                  children: [],
                },
                {
                  id: 530325,
                  name: "富源县",
                  children: [],
                },
                {
                  id: 530326,
                  name: "会泽县",
                  children: [],
                },
                {
                  id: 530381,
                  name: "宣威市",
                  children: [],
                },
              ],
            },
            {
              id: 530400,
              name: "玉溪市",
              children: [
                {
                  id: 530402,
                  name: "红塔区",
                  children: [],
                },
                {
                  id: 530403,
                  name: "江川区",
                  children: [],
                },
                {
                  id: 530423,
                  name: "通海县",
                  children: [],
                },
                {
                  id: 530424,
                  name: "华宁县",
                  children: [],
                },
                {
                  id: 530425,
                  name: "易门县",
                  children: [],
                },
                {
                  id: 530426,
                  name: "峨山彝族自治县",
                  children: [],
                },
                {
                  id: 530427,
                  name: "新平彝族傣族自治县",
                  children: [],
                },
                {
                  id: 530428,
                  name: "元江哈尼族彝族傣族自治县",
                  children: [],
                },
                {
                  id: 530481,
                  name: "澄江市",
                  children: [],
                },
              ],
            },
            {
              id: 530500,
              name: "保山市",
              children: [
                {
                  id: 530502,
                  name: "隆阳区",
                  children: [],
                },
                {
                  id: 530521,
                  name: "施甸县",
                  children: [],
                },
                {
                  id: 530523,
                  name: "龙陵县",
                  children: [],
                },
                {
                  id: 530524,
                  name: "昌宁县",
                  children: [],
                },
                {
                  id: 530581,
                  name: "腾冲市",
                  children: [],
                },
              ],
            },
            {
              id: 530600,
              name: "昭通市",
              children: [
                {
                  id: 530602,
                  name: "昭阳区",
                  children: [],
                },
                {
                  id: 530621,
                  name: "鲁甸县",
                  children: [],
                },
                {
                  id: 530622,
                  name: "巧家县",
                  children: [],
                },
                {
                  id: 530623,
                  name: "盐津县",
                  children: [],
                },
                {
                  id: 530624,
                  name: "大关县",
                  children: [],
                },
                {
                  id: 530625,
                  name: "永善县",
                  children: [],
                },
                {
                  id: 530626,
                  name: "绥江县",
                  children: [],
                },
                {
                  id: 530627,
                  name: "镇雄县",
                  children: [],
                },
                {
                  id: 530628,
                  name: "彝良县",
                  children: [],
                },
                {
                  id: 530629,
                  name: "威信县",
                  children: [],
                },
                {
                  id: 530681,
                  name: "水富市",
                  children: [],
                },
              ],
            },
            {
              id: 530700,
              name: "丽江市",
              children: [
                {
                  id: 530702,
                  name: "古城区",
                  children: [],
                },
                {
                  id: 530721,
                  name: "玉龙纳西族自治县",
                  children: [],
                },
                {
                  id: 530722,
                  name: "永胜县",
                  children: [],
                },
                {
                  id: 530723,
                  name: "华坪县",
                  children: [],
                },
                {
                  id: 530724,
                  name: "宁蒗彝族自治县",
                  children: [],
                },
              ],
            },
            {
              id: 530800,
              name: "普洱市",
              children: [
                {
                  id: 530802,
                  name: "思茅区",
                  children: [],
                },
                {
                  id: 530821,
                  name: "宁洱哈尼族彝族自治县",
                  children: [],
                },
                {
                  id: 530822,
                  name: "墨江哈尼族自治县",
                  children: [],
                },
                {
                  id: 530823,
                  name: "景东彝族自治县",
                  children: [],
                },
                {
                  id: 530824,
                  name: "景谷傣族彝族自治县",
                  children: [],
                },
                {
                  id: 530825,
                  name: "镇沅彝族哈尼族拉祜族自治县",
                  children: [],
                },
                {
                  id: 530826,
                  name: "江城哈尼族彝族自治县",
                  children: [],
                },
                {
                  id: 530827,
                  name: "孟连傣族拉祜族佤族自治县",
                  children: [],
                },
                {
                  id: 530828,
                  name: "澜沧拉祜族自治县",
                  children: [],
                },
                {
                  id: 530829,
                  name: "西盟佤族自治县",
                  children: [],
                },
              ],
            },
            {
              id: 530900,
              name: "临沧市",
              children: [
                {
                  id: 530902,
                  name: "临翔区",
                  children: [],
                },
                {
                  id: 530921,
                  name: "凤庆县",
                  children: [],
                },
                {
                  id: 530922,
                  name: "云县",
                  children: [],
                },
                {
                  id: 530923,
                  name: "永德县",
                  children: [],
                },
                {
                  id: 530924,
                  name: "镇康县",
                  children: [],
                },
                {
                  id: 530925,
                  name: "双江拉祜族佤族布朗族傣族自治县",
                  children: [],
                },
                {
                  id: 530926,
                  name: "耿马傣族佤族自治县",
                  children: [],
                },
                {
                  id: 530927,
                  name: "沧源佤族自治县",
                  children: [],
                },
              ],
            },
            {
              id: 532300,
              name: "楚雄彝族自治州",
              children: [
                {
                  id: 532301,
                  name: "楚雄市",
                  children: [],
                },
                {
                  id: 532302,
                  name: "禄丰市",
                  children: [],
                },
                {
                  id: 532322,
                  name: "双柏县",
                  children: [],
                },
                {
                  id: 532323,
                  name: "牟定县",
                  children: [],
                },
                {
                  id: 532324,
                  name: "南华县",
                  children: [],
                },
                {
                  id: 532325,
                  name: "姚安县",
                  children: [],
                },
                {
                  id: 532326,
                  name: "大姚县",
                  children: [],
                },
                {
                  id: 532327,
                  name: "永仁县",
                  children: [],
                },
                {
                  id: 532328,
                  name: "元谋县",
                  children: [],
                },
                {
                  id: 532329,
                  name: "武定县",
                  children: [],
                },
              ],
            },
            {
              id: 532500,
              name: "红河哈尼族彝族自治州",
              children: [
                {
                  id: 532501,
                  name: "个旧市",
                  children: [],
                },
                {
                  id: 532502,
                  name: "开远市",
                  children: [],
                },
                {
                  id: 532503,
                  name: "蒙自市",
                  children: [],
                },
                {
                  id: 532504,
                  name: "弥勒市",
                  children: [],
                },
                {
                  id: 532523,
                  name: "屏边苗族自治县",
                  children: [],
                },
                {
                  id: 532524,
                  name: "建水县",
                  children: [],
                },
                {
                  id: 532525,
                  name: "石屏县",
                  children: [],
                },
                {
                  id: 532527,
                  name: "泸西县",
                  children: [],
                },
                {
                  id: 532528,
                  name: "元阳县",
                  children: [],
                },
                {
                  id: 532529,
                  name: "红河县",
                  children: [],
                },
                {
                  id: 532530,
                  name: "金平苗族瑶族傣族自治县",
                  children: [],
                },
                {
                  id: 532531,
                  name: "绿春县",
                  children: [],
                },
                {
                  id: 532532,
                  name: "河口瑶族自治县",
                  children: [],
                },
              ],
            },
            {
              id: 532600,
              name: "文山壮族苗族自治州",
              children: [
                {
                  id: 532601,
                  name: "文山市",
                  children: [],
                },
                {
                  id: 532622,
                  name: "砚山县",
                  children: [],
                },
                {
                  id: 532623,
                  name: "西畴县",
                  children: [],
                },
                {
                  id: 532624,
                  name: "麻栗坡县",
                  children: [],
                },
                {
                  id: 532625,
                  name: "马关县",
                  children: [],
                },
                {
                  id: 532626,
                  name: "丘北县",
                  children: [],
                },
                {
                  id: 532627,
                  name: "广南县",
                  children: [],
                },
                {
                  id: 532628,
                  name: "富宁县",
                  children: [],
                },
              ],
            },
            {
              id: 532800,
              name: "西双版纳傣族自治州",
              children: [
                {
                  id: 532801,
                  name: "景洪市",
                  children: [],
                },
                {
                  id: 532822,
                  name: "勐海县",
                  children: [],
                },
                {
                  id: 532823,
                  name: "勐腊县",
                  children: [],
                },
              ],
            },
            {
              id: 532900,
              name: "大理白族自治州",
              children: [
                {
                  id: 532901,
                  name: "大理市",
                  children: [],
                },
                {
                  id: 532922,
                  name: "漾濞彝族自治县",
                  children: [],
                },
                {
                  id: 532923,
                  name: "祥云县",
                  children: [],
                },
                {
                  id: 532924,
                  name: "宾川县",
                  children: [],
                },
                {
                  id: 532925,
                  name: "弥渡县",
                  children: [],
                },
                {
                  id: 532926,
                  name: "南涧彝族自治县",
                  children: [],
                },
                {
                  id: 532927,
                  name: "巍山彝族回族自治县",
                  children: [],
                },
                {
                  id: 532928,
                  name: "永平县",
                  children: [],
                },
                {
                  id: 532929,
                  name: "云龙县",
                  children: [],
                },
                {
                  id: 532930,
                  name: "洱源县",
                  children: [],
                },
                {
                  id: 532931,
                  name: "剑川县",
                  children: [],
                },
                {
                  id: 532932,
                  name: "鹤庆县",
                  children: [],
                },
              ],
            },
            {
              id: 533100,
              name: "德宏傣族景颇族自治州",
              children: [
                {
                  id: 533102,
                  name: "瑞丽市",
                  children: [],
                },
                {
                  id: 533103,
                  name: "芒市",
                  children: [],
                },
                {
                  id: 533122,
                  name: "梁河县",
                  children: [],
                },
                {
                  id: 533123,
                  name: "盈江县",
                  children: [],
                },
                {
                  id: 533124,
                  name: "陇川县",
                  children: [],
                },
              ],
            },
            {
              id: 533300,
              name: "怒江傈僳族自治州",
              children: [
                {
                  id: 533301,
                  name: "泸水市",
                  children: [],
                },
                {
                  id: 533323,
                  name: "福贡县",
                  children: [],
                },
                {
                  id: 533324,
                  name: "贡山独龙族怒族自治县",
                  children: [],
                },
                {
                  id: 533325,
                  name: "兰坪白族普米族自治县",
                  children: [],
                },
              ],
            },
            {
              id: 533400,
              name: "迪庆藏族自治州",
              children: [
                {
                  id: 533401,
                  name: "香格里拉市",
                  children: [],
                },
                {
                  id: 533422,
                  name: "德钦县",
                  children: [],
                },
                {
                  id: 533423,
                  name: "维西傈僳族自治县",
                  children: [],
                },
              ],
            },
          ],
        },
        {
          id: 540000,
          name: "西藏自治区",
          children: [
            {
              id: 540100,
              name: "拉萨市",
              children: [
                {
                  id: 540102,
                  name: "城关区",
                  children: [],
                },
                {
                  id: 540103,
                  name: "堆龙德庆区",
                  children: [],
                },
                {
                  id: 540104,
                  name: "达孜区",
                  children: [],
                },
                {
                  id: 540121,
                  name: "林周县",
                  children: [],
                },
                {
                  id: 540122,
                  name: "当雄县",
                  children: [],
                },
                {
                  id: 540123,
                  name: "尼木县",
                  children: [],
                },
                {
                  id: 540124,
                  name: "曲水县",
                  children: [],
                },
                {
                  id: 540127,
                  name: "墨竹工卡县",
                  children: [],
                },
                {
                  id: 540171,
                  name: "格尔木藏青工业园区",
                  children: [],
                },
                {
                  id: 540172,
                  name: "拉萨经济技术开发区",
                  children: [],
                },
                {
                  id: 540173,
                  name: "西藏文化旅游创意园区",
                  children: [],
                },
                {
                  id: 540174,
                  name: "达孜工业园区",
                  children: [],
                },
              ],
            },
            {
              id: 540200,
              name: "日喀则市",
              children: [
                {
                  id: 540202,
                  name: "桑珠孜区",
                  children: [],
                },
                {
                  id: 540221,
                  name: "南木林县",
                  children: [],
                },
                {
                  id: 540222,
                  name: "江孜县",
                  children: [],
                },
                {
                  id: 540223,
                  name: "定日县",
                  children: [],
                },
                {
                  id: 540224,
                  name: "萨迦县",
                  children: [],
                },
                {
                  id: 540225,
                  name: "拉孜县",
                  children: [],
                },
                {
                  id: 540226,
                  name: "昂仁县",
                  children: [],
                },
                {
                  id: 540227,
                  name: "谢通门县",
                  children: [],
                },
                {
                  id: 540228,
                  name: "白朗县",
                  children: [],
                },
                {
                  id: 540229,
                  name: "仁布县",
                  children: [],
                },
                {
                  id: 540230,
                  name: "康马县",
                  children: [],
                },
                {
                  id: 540231,
                  name: "定结县",
                  children: [],
                },
                {
                  id: 540232,
                  name: "仲巴县",
                  children: [],
                },
                {
                  id: 540233,
                  name: "亚东县",
                  children: [],
                },
                {
                  id: 540234,
                  name: "吉隆县",
                  children: [],
                },
                {
                  id: 540235,
                  name: "聂拉木县",
                  children: [],
                },
                {
                  id: 540236,
                  name: "萨嘎县",
                  children: [],
                },
                {
                  id: 540237,
                  name: "岗巴县",
                  children: [],
                },
              ],
            },
            {
              id: 540300,
              name: "昌都市",
              children: [
                {
                  id: 540302,
                  name: "卡若区",
                  children: [],
                },
                {
                  id: 540321,
                  name: "江达县",
                  children: [],
                },
                {
                  id: 540322,
                  name: "贡觉县",
                  children: [],
                },
                {
                  id: 540323,
                  name: "类乌齐县",
                  children: [],
                },
                {
                  id: 540324,
                  name: "丁青县",
                  children: [],
                },
                {
                  id: 540325,
                  name: "察雅县",
                  children: [],
                },
                {
                  id: 540326,
                  name: "八宿县",
                  children: [],
                },
                {
                  id: 540327,
                  name: "左贡县",
                  children: [],
                },
                {
                  id: 540328,
                  name: "芒康县",
                  children: [],
                },
                {
                  id: 540329,
                  name: "洛隆县",
                  children: [],
                },
                {
                  id: 540330,
                  name: "边坝县",
                  children: [],
                },
              ],
            },
            {
              id: 540400,
              name: "林芝市",
              children: [
                {
                  id: 540402,
                  name: "巴宜区",
                  children: [],
                },
                {
                  id: 540421,
                  name: "工布江达县",
                  children: [],
                },
                {
                  id: 540422,
                  name: "米林县",
                  children: [],
                },
                {
                  id: 540423,
                  name: "墨脱县",
                  children: [],
                },
                {
                  id: 540424,
                  name: "波密县",
                  children: [],
                },
                {
                  id: 540425,
                  name: "察隅县",
                  children: [],
                },
                {
                  id: 540426,
                  name: "朗县",
                  children: [],
                },
              ],
            },
            {
              id: 540500,
              name: "山南市",
              children: [
                {
                  id: 540502,
                  name: "乃东区",
                  children: [],
                },
                {
                  id: 540521,
                  name: "扎囊县",
                  children: [],
                },
                {
                  id: 540522,
                  name: "贡嘎县",
                  children: [],
                },
                {
                  id: 540523,
                  name: "桑日县",
                  children: [],
                },
                {
                  id: 540524,
                  name: "琼结县",
                  children: [],
                },
                {
                  id: 540525,
                  name: "曲松县",
                  children: [],
                },
                {
                  id: 540526,
                  name: "措美县",
                  children: [],
                },
                {
                  id: 540527,
                  name: "洛扎县",
                  children: [],
                },
                {
                  id: 540528,
                  name: "加查县",
                  children: [],
                },
                {
                  id: 540529,
                  name: "隆子县",
                  children: [],
                },
                {
                  id: 540530,
                  name: "错那县",
                  children: [],
                },
                {
                  id: 540531,
                  name: "浪卡子县",
                  children: [],
                },
              ],
            },
            {
              id: 540600,
              name: "那曲市",
              children: [
                {
                  id: 540602,
                  name: "色尼区",
                  children: [],
                },
                {
                  id: 540621,
                  name: "嘉黎县",
                  children: [],
                },
                {
                  id: 540622,
                  name: "比如县",
                  children: [],
                },
                {
                  id: 540623,
                  name: "聂荣县",
                  children: [],
                },
                {
                  id: 540624,
                  name: "安多县",
                  children: [],
                },
                {
                  id: 540625,
                  name: "申扎县",
                  children: [],
                },
                {
                  id: 540626,
                  name: "索县",
                  children: [],
                },
                {
                  id: 540627,
                  name: "班戈县",
                  children: [],
                },
                {
                  id: 540628,
                  name: "巴青县",
                  children: [],
                },
                {
                  id: 540629,
                  name: "尼玛县",
                  children: [],
                },
                {
                  id: 540630,
                  name: "双湖县",
                  children: [],
                },
              ],
            },
            {
              id: 542500,
              name: "阿里地区",
              children: [
                {
                  id: 542521,
                  name: "普兰县",
                  children: [],
                },
                {
                  id: 542522,
                  name: "札达县",
                  children: [],
                },
                {
                  id: 542523,
                  name: "噶尔县",
                  children: [],
                },
                {
                  id: 542524,
                  name: "日土县",
                  children: [],
                },
                {
                  id: 542525,
                  name: "革吉县",
                  children: [],
                },
                {
                  id: 542526,
                  name: "改则县",
                  children: [],
                },
                {
                  id: 542527,
                  name: "措勤县",
                  children: [],
                },
              ],
            },
          ],
        },
        {
          id: 610000,
          name: "陕西省",
          children: [
            {
              id: 610100,
              name: "西安市",
              children: [
                {
                  id: 610102,
                  name: "新城区",
                  children: [],
                },
                {
                  id: 610103,
                  name: "碑林区",
                  children: [],
                },
                {
                  id: 610104,
                  name: "莲湖区",
                  children: [],
                },
                {
                  id: 610111,
                  name: "灞桥区",
                  children: [],
                },
                {
                  id: 610112,
                  name: "未央区",
                  children: [],
                },
                {
                  id: 610113,
                  name: "雁塔区",
                  children: [],
                },
                {
                  id: 610114,
                  name: "阎良区",
                  children: [],
                },
                {
                  id: 610115,
                  name: "临潼区",
                  children: [],
                },
                {
                  id: 610116,
                  name: "长安区",
                  children: [],
                },
                {
                  id: 610117,
                  name: "高陵区",
                  children: [],
                },
                {
                  id: 610118,
                  name: "鄠邑区",
                  children: [],
                },
                {
                  id: 610122,
                  name: "蓝田县",
                  children: [],
                },
                {
                  id: 610124,
                  name: "周至县",
                  children: [],
                },
              ],
            },
            {
              id: 610200,
              name: "铜川市",
              children: [
                {
                  id: 610202,
                  name: "王益区",
                  children: [],
                },
                {
                  id: 610203,
                  name: "印台区",
                  children: [],
                },
                {
                  id: 610204,
                  name: "耀州区",
                  children: [],
                },
                {
                  id: 610222,
                  name: "宜君县",
                  children: [],
                },
              ],
            },
            {
              id: 610300,
              name: "宝鸡市",
              children: [
                {
                  id: 610302,
                  name: "渭滨区",
                  children: [],
                },
                {
                  id: 610303,
                  name: "金台区",
                  children: [],
                },
                {
                  id: 610304,
                  name: "陈仓区",
                  children: [],
                },
                {
                  id: 610305,
                  name: "凤翔区",
                  children: [],
                },
                {
                  id: 610323,
                  name: "岐山县",
                  children: [],
                },
                {
                  id: 610324,
                  name: "扶风县",
                  children: [],
                },
                {
                  id: 610326,
                  name: "眉县",
                  children: [],
                },
                {
                  id: 610327,
                  name: "陇县",
                  children: [],
                },
                {
                  id: 610328,
                  name: "千阳县",
                  children: [],
                },
                {
                  id: 610329,
                  name: "麟游县",
                  children: [],
                },
                {
                  id: 610330,
                  name: "凤县",
                  children: [],
                },
                {
                  id: 610331,
                  name: "太白县",
                  children: [],
                },
              ],
            },
            {
              id: 610400,
              name: "咸阳市",
              children: [
                {
                  id: 610402,
                  name: "秦都区",
                  children: [],
                },
                {
                  id: 610403,
                  name: "杨陵区",
                  children: [],
                },
                {
                  id: 610404,
                  name: "渭城区",
                  children: [],
                },
                {
                  id: 610422,
                  name: "三原县",
                  children: [],
                },
                {
                  id: 610423,
                  name: "泾阳县",
                  children: [],
                },
                {
                  id: 610424,
                  name: "乾县",
                  children: [],
                },
                {
                  id: 610425,
                  name: "礼泉县",
                  children: [],
                },
                {
                  id: 610426,
                  name: "永寿县",
                  children: [],
                },
                {
                  id: 610428,
                  name: "长武县",
                  children: [],
                },
                {
                  id: 610429,
                  name: "旬邑县",
                  children: [],
                },
                {
                  id: 610430,
                  name: "淳化县",
                  children: [],
                },
                {
                  id: 610431,
                  name: "武功县",
                  children: [],
                },
                {
                  id: 610481,
                  name: "兴平市",
                  children: [],
                },
                {
                  id: 610482,
                  name: "彬州市",
                  children: [],
                },
              ],
            },
            {
              id: 610500,
              name: "渭南市",
              children: [
                {
                  id: 610502,
                  name: "临渭区",
                  children: [],
                },
                {
                  id: 610503,
                  name: "华州区",
                  children: [],
                },
                {
                  id: 610522,
                  name: "潼关县",
                  children: [],
                },
                {
                  id: 610523,
                  name: "大荔县",
                  children: [],
                },
                {
                  id: 610524,
                  name: "合阳县",
                  children: [],
                },
                {
                  id: 610525,
                  name: "澄城县",
                  children: [],
                },
                {
                  id: 610526,
                  name: "蒲城县",
                  children: [],
                },
                {
                  id: 610527,
                  name: "白水县",
                  children: [],
                },
                {
                  id: 610528,
                  name: "富平县",
                  children: [],
                },
                {
                  id: 610581,
                  name: "韩城市",
                  children: [],
                },
                {
                  id: 610582,
                  name: "华阴市",
                  children: [],
                },
              ],
            },
            {
              id: 610600,
              name: "延安市",
              children: [
                {
                  id: 610602,
                  name: "宝塔区",
                  children: [],
                },
                {
                  id: 610603,
                  name: "安塞区",
                  children: [],
                },
                {
                  id: 610621,
                  name: "延长县",
                  children: [],
                },
                {
                  id: 610622,
                  name: "延川县",
                  children: [],
                },
                {
                  id: 610625,
                  name: "志丹县",
                  children: [],
                },
                {
                  id: 610626,
                  name: "吴起县",
                  children: [],
                },
                {
                  id: 610627,
                  name: "甘泉县",
                  children: [],
                },
                {
                  id: 610628,
                  name: "富县",
                  children: [],
                },
                {
                  id: 610629,
                  name: "洛川县",
                  children: [],
                },
                {
                  id: 610630,
                  name: "宜川县",
                  children: [],
                },
                {
                  id: 610631,
                  name: "黄龙县",
                  children: [],
                },
                {
                  id: 610632,
                  name: "黄陵县",
                  children: [],
                },
                {
                  id: 610681,
                  name: "子长市",
                  children: [],
                },
              ],
            },
            {
              id: 610700,
              name: "汉中市",
              children: [
                {
                  id: 610702,
                  name: "汉台区",
                  children: [],
                },
                {
                  id: 610703,
                  name: "南郑区",
                  children: [],
                },
                {
                  id: 610722,
                  name: "城固县",
                  children: [],
                },
                {
                  id: 610723,
                  name: "洋县",
                  children: [],
                },
                {
                  id: 610724,
                  name: "西乡县",
                  children: [],
                },
                {
                  id: 610725,
                  name: "勉县",
                  children: [],
                },
                {
                  id: 610726,
                  name: "宁强县",
                  children: [],
                },
                {
                  id: 610727,
                  name: "略阳县",
                  children: [],
                },
                {
                  id: 610728,
                  name: "镇巴县",
                  children: [],
                },
                {
                  id: 610729,
                  name: "留坝县",
                  children: [],
                },
                {
                  id: 610730,
                  name: "佛坪县",
                  children: [],
                },
              ],
            },
            {
              id: 610800,
              name: "榆林市",
              children: [
                {
                  id: 610802,
                  name: "榆阳区",
                  children: [],
                },
                {
                  id: 610803,
                  name: "横山区",
                  children: [],
                },
                {
                  id: 610822,
                  name: "府谷县",
                  children: [],
                },
                {
                  id: 610824,
                  name: "靖边县",
                  children: [],
                },
                {
                  id: 610825,
                  name: "定边县",
                  children: [],
                },
                {
                  id: 610826,
                  name: "绥德县",
                  children: [],
                },
                {
                  id: 610827,
                  name: "米脂县",
                  children: [],
                },
                {
                  id: 610828,
                  name: "佳县",
                  children: [],
                },
                {
                  id: 610829,
                  name: "吴堡县",
                  children: [],
                },
                {
                  id: 610830,
                  name: "清涧县",
                  children: [],
                },
                {
                  id: 610831,
                  name: "子洲县",
                  children: [],
                },
                {
                  id: 610881,
                  name: "神木市",
                  children: [],
                },
              ],
            },
            {
              id: 610900,
              name: "安康市",
              children: [
                {
                  id: 610902,
                  name: "汉滨区",
                  children: [],
                },
                {
                  id: 610921,
                  name: "汉阴县",
                  children: [],
                },
                {
                  id: 610922,
                  name: "石泉县",
                  children: [],
                },
                {
                  id: 610923,
                  name: "宁陕县",
                  children: [],
                },
                {
                  id: 610924,
                  name: "紫阳县",
                  children: [],
                },
                {
                  id: 610925,
                  name: "岚皋县",
                  children: [],
                },
                {
                  id: 610926,
                  name: "平利县",
                  children: [],
                },
                {
                  id: 610927,
                  name: "镇坪县",
                  children: [],
                },
                {
                  id: 610929,
                  name: "白河县",
                  children: [],
                },
                {
                  id: 610981,
                  name: "旬阳市",
                  children: [],
                },
              ],
            },
            {
              id: 611000,
              name: "商洛市",
              children: [
                {
                  id: 611002,
                  name: "商州区",
                  children: [],
                },
                {
                  id: 611021,
                  name: "洛南县",
                  children: [],
                },
                {
                  id: 611022,
                  name: "丹凤县",
                  children: [],
                },
                {
                  id: 611023,
                  name: "商南县",
                  children: [],
                },
                {
                  id: 611024,
                  name: "山阳县",
                  children: [],
                },
                {
                  id: 611025,
                  name: "镇安县",
                  children: [],
                },
                {
                  id: 611026,
                  name: "柞水县",
                  children: [],
                },
              ],
            },
          ],
        },
        {
          id: 620000,
          name: "甘肃省",
          children: [
            {
              id: 620100,
              name: "兰州市",
              children: [
                {
                  id: 620102,
                  name: "城关区",
                  children: [],
                },
                {
                  id: 620103,
                  name: "七里河区",
                  children: [],
                },
                {
                  id: 620104,
                  name: "西固区",
                  children: [],
                },
                {
                  id: 620105,
                  name: "安宁区",
                  children: [],
                },
                {
                  id: 620111,
                  name: "红古区",
                  children: [],
                },
                {
                  id: 620121,
                  name: "永登县",
                  children: [],
                },
                {
                  id: 620122,
                  name: "皋兰县",
                  children: [],
                },
                {
                  id: 620123,
                  name: "榆中县",
                  children: [],
                },
                {
                  id: 620171,
                  name: "兰州新区",
                  children: [],
                },
              ],
            },
            {
              id: 620200,
              name: "嘉峪关市",
              children: [
                {
                  id: 620201,
                  name: "嘉峪关市",
                  children: [],
                },
              ],
            },
            {
              id: 620300,
              name: "金昌市",
              children: [
                {
                  id: 620302,
                  name: "金川区",
                  children: [],
                },
                {
                  id: 620321,
                  name: "永昌县",
                  children: [],
                },
              ],
            },
            {
              id: 620400,
              name: "白银市",
              children: [
                {
                  id: 620402,
                  name: "白银区",
                  children: [],
                },
                {
                  id: 620403,
                  name: "平川区",
                  children: [],
                },
                {
                  id: 620421,
                  name: "靖远县",
                  children: [],
                },
                {
                  id: 620422,
                  name: "会宁县",
                  children: [],
                },
                {
                  id: 620423,
                  name: "景泰县",
                  children: [],
                },
              ],
            },
            {
              id: 620500,
              name: "天水市",
              children: [
                {
                  id: 620502,
                  name: "秦州区",
                  children: [],
                },
                {
                  id: 620503,
                  name: "麦积区",
                  children: [],
                },
                {
                  id: 620521,
                  name: "清水县",
                  children: [],
                },
                {
                  id: 620522,
                  name: "秦安县",
                  children: [],
                },
                {
                  id: 620523,
                  name: "甘谷县",
                  children: [],
                },
                {
                  id: 620524,
                  name: "武山县",
                  children: [],
                },
                {
                  id: 620525,
                  name: "张家川回族自治县",
                  children: [],
                },
              ],
            },
            {
              id: 620600,
              name: "武威市",
              children: [
                {
                  id: 620602,
                  name: "凉州区",
                  children: [],
                },
                {
                  id: 620621,
                  name: "民勤县",
                  children: [],
                },
                {
                  id: 620622,
                  name: "古浪县",
                  children: [],
                },
                {
                  id: 620623,
                  name: "天祝藏族自治县",
                  children: [],
                },
              ],
            },
            {
              id: 620700,
              name: "张掖市",
              children: [
                {
                  id: 620702,
                  name: "甘州区",
                  children: [],
                },
                {
                  id: 620721,
                  name: "肃南裕固族自治县",
                  children: [],
                },
                {
                  id: 620722,
                  name: "民乐县",
                  children: [],
                },
                {
                  id: 620723,
                  name: "临泽县",
                  children: [],
                },
                {
                  id: 620724,
                  name: "高台县",
                  children: [],
                },
                {
                  id: 620725,
                  name: "山丹县",
                  children: [],
                },
              ],
            },
            {
              id: 620800,
              name: "平凉市",
              children: [
                {
                  id: 620802,
                  name: "崆峒区",
                  children: [],
                },
                {
                  id: 620821,
                  name: "泾川县",
                  children: [],
                },
                {
                  id: 620822,
                  name: "灵台县",
                  children: [],
                },
                {
                  id: 620823,
                  name: "崇信县",
                  children: [],
                },
                {
                  id: 620825,
                  name: "庄浪县",
                  children: [],
                },
                {
                  id: 620826,
                  name: "静宁县",
                  children: [],
                },
                {
                  id: 620881,
                  name: "华亭市",
                  children: [],
                },
              ],
            },
            {
              id: 620900,
              name: "酒泉市",
              children: [
                {
                  id: 620902,
                  name: "肃州区",
                  children: [],
                },
                {
                  id: 620921,
                  name: "金塔县",
                  children: [],
                },
                {
                  id: 620922,
                  name: "瓜州县",
                  children: [],
                },
                {
                  id: 620923,
                  name: "肃北蒙古族自治县",
                  children: [],
                },
                {
                  id: 620924,
                  name: "阿克塞哈萨克族自治县",
                  children: [],
                },
                {
                  id: 620981,
                  name: "玉门市",
                  children: [],
                },
                {
                  id: 620982,
                  name: "敦煌市",
                  children: [],
                },
              ],
            },
            {
              id: 621000,
              name: "庆阳市",
              children: [
                {
                  id: 621002,
                  name: "西峰区",
                  children: [],
                },
                {
                  id: 621021,
                  name: "庆城县",
                  children: [],
                },
                {
                  id: 621022,
                  name: "环县",
                  children: [],
                },
                {
                  id: 621023,
                  name: "华池县",
                  children: [],
                },
                {
                  id: 621024,
                  name: "合水县",
                  children: [],
                },
                {
                  id: 621025,
                  name: "正宁县",
                  children: [],
                },
                {
                  id: 621026,
                  name: "宁县",
                  children: [],
                },
                {
                  id: 621027,
                  name: "镇原县",
                  children: [],
                },
              ],
            },
            {
              id: 621100,
              name: "定西市",
              children: [
                {
                  id: 621102,
                  name: "安定区",
                  children: [],
                },
                {
                  id: 621121,
                  name: "通渭县",
                  children: [],
                },
                {
                  id: 621122,
                  name: "陇西县",
                  children: [],
                },
                {
                  id: 621123,
                  name: "渭源县",
                  children: [],
                },
                {
                  id: 621124,
                  name: "临洮县",
                  children: [],
                },
                {
                  id: 621125,
                  name: "漳县",
                  children: [],
                },
                {
                  id: 621126,
                  name: "岷县",
                  children: [],
                },
              ],
            },
            {
              id: 621200,
              name: "陇南市",
              children: [
                {
                  id: 621202,
                  name: "武都区",
                  children: [],
                },
                {
                  id: 621221,
                  name: "成县",
                  children: [],
                },
                {
                  id: 621222,
                  name: "文县",
                  children: [],
                },
                {
                  id: 621223,
                  name: "宕昌县",
                  children: [],
                },
                {
                  id: 621224,
                  name: "康县",
                  children: [],
                },
                {
                  id: 621225,
                  name: "西和县",
                  children: [],
                },
                {
                  id: 621226,
                  name: "礼县",
                  children: [],
                },
                {
                  id: 621227,
                  name: "徽县",
                  children: [],
                },
                {
                  id: 621228,
                  name: "两当县",
                  children: [],
                },
              ],
            },
            {
              id: 622900,
              name: "临夏回族自治州",
              children: [
                {
                  id: 622901,
                  name: "临夏市",
                  children: [],
                },
                {
                  id: 622921,
                  name: "临夏县",
                  children: [],
                },
                {
                  id: 622922,
                  name: "康乐县",
                  children: [],
                },
                {
                  id: 622923,
                  name: "永靖县",
                  children: [],
                },
                {
                  id: 622924,
                  name: "广河县",
                  children: [],
                },
                {
                  id: 622925,
                  name: "和政县",
                  children: [],
                },
                {
                  id: 622926,
                  name: "东乡族自治县",
                  children: [],
                },
                {
                  id: 622927,
                  name: "积石山保安族东乡族撒拉族自治县",
                  children: [],
                },
              ],
            },
            {
              id: 623000,
              name: "甘南藏族自治州",
              children: [
                {
                  id: 623001,
                  name: "合作市",
                  children: [],
                },
                {
                  id: 623021,
                  name: "临潭县",
                  children: [],
                },
                {
                  id: 623022,
                  name: "卓尼县",
                  children: [],
                },
                {
                  id: 623023,
                  name: "舟曲县",
                  children: [],
                },
                {
                  id: 623024,
                  name: "迭部县",
                  children: [],
                },
                {
                  id: 623025,
                  name: "玛曲县",
                  children: [],
                },
                {
                  id: 623026,
                  name: "碌曲县",
                  children: [],
                },
                {
                  id: 623027,
                  name: "夏河县",
                  children: [],
                },
              ],
            },
          ],
        },
        {
          id: 630000,
          name: "青海省",
          children: [
            {
              id: 630100,
              name: "西宁市",
              children: [
                {
                  id: 630102,
                  name: "城东区",
                  children: [],
                },
                {
                  id: 630103,
                  name: "城中区",
                  children: [],
                },
                {
                  id: 630104,
                  name: "城西区",
                  children: [],
                },
                {
                  id: 630105,
                  name: "城北区",
                  children: [],
                },
                {
                  id: 630106,
                  name: "湟中区",
                  children: [],
                },
                {
                  id: 630121,
                  name: "大通回族土族自治县",
                  children: [],
                },
                {
                  id: 630123,
                  name: "湟源县",
                  children: [],
                },
              ],
            },
            {
              id: 630200,
              name: "海东市",
              children: [
                {
                  id: 630202,
                  name: "乐都区",
                  children: [],
                },
                {
                  id: 630203,
                  name: "平安区",
                  children: [],
                },
                {
                  id: 630222,
                  name: "民和回族土族自治县",
                  children: [],
                },
                {
                  id: 630223,
                  name: "互助土族自治县",
                  children: [],
                },
                {
                  id: 630224,
                  name: "化隆回族自治县",
                  children: [],
                },
                {
                  id: 630225,
                  name: "循化撒拉族自治县",
                  children: [],
                },
              ],
            },
            {
              id: 632200,
              name: "海北藏族自治州",
              children: [
                {
                  id: 632221,
                  name: "门源回族自治县",
                  children: [],
                },
                {
                  id: 632222,
                  name: "祁连县",
                  children: [],
                },
                {
                  id: 632223,
                  name: "海晏县",
                  children: [],
                },
                {
                  id: 632224,
                  name: "刚察县",
                  children: [],
                },
              ],
            },
            {
              id: 632300,
              name: "黄南藏族自治州",
              children: [
                {
                  id: 632301,
                  name: "同仁市",
                  children: [],
                },
                {
                  id: 632322,
                  name: "尖扎县",
                  children: [],
                },
                {
                  id: 632323,
                  name: "泽库县",
                  children: [],
                },
                {
                  id: 632324,
                  name: "河南蒙古族自治县",
                  children: [],
                },
              ],
            },
            {
              id: 632500,
              name: "海南藏族自治州",
              children: [
                {
                  id: 632521,
                  name: "共和县",
                  children: [],
                },
                {
                  id: 632522,
                  name: "同德县",
                  children: [],
                },
                {
                  id: 632523,
                  name: "贵德县",
                  children: [],
                },
                {
                  id: 632524,
                  name: "兴海县",
                  children: [],
                },
                {
                  id: 632525,
                  name: "贵南县",
                  children: [],
                },
              ],
            },
            {
              id: 632600,
              name: "果洛藏族自治州",
              children: [
                {
                  id: 632621,
                  name: "玛沁县",
                  children: [],
                },
                {
                  id: 632622,
                  name: "班玛县",
                  children: [],
                },
                {
                  id: 632623,
                  name: "甘德县",
                  children: [],
                },
                {
                  id: 632624,
                  name: "达日县",
                  children: [],
                },
                {
                  id: 632625,
                  name: "久治县",
                  children: [],
                },
                {
                  id: 632626,
                  name: "玛多县",
                  children: [],
                },
              ],
            },
            {
              id: 632700,
              name: "玉树藏族自治州",
              children: [
                {
                  id: 632701,
                  name: "玉树市",
                  children: [],
                },
                {
                  id: 632722,
                  name: "杂多县",
                  children: [],
                },
                {
                  id: 632723,
                  name: "称多县",
                  children: [],
                },
                {
                  id: 632724,
                  name: "治多县",
                  children: [],
                },
                {
                  id: 632725,
                  name: "囊谦县",
                  children: [],
                },
                {
                  id: 632726,
                  name: "曲麻莱县",
                  children: [],
                },
              ],
            },
            {
              id: 632800,
              name: "海西蒙古族藏族自治州",
              children: [
                {
                  id: 632801,
                  name: "格尔木市",
                  children: [],
                },
                {
                  id: 632802,
                  name: "德令哈市",
                  children: [],
                },
                {
                  id: 632803,
                  name: "茫崖市",
                  children: [],
                },
                {
                  id: 632821,
                  name: "乌兰县",
                  children: [],
                },
                {
                  id: 632822,
                  name: "都兰县",
                  children: [],
                },
                {
                  id: 632823,
                  name: "天峻县",
                  children: [],
                },
                {
                  id: 632857,
                  name: "大柴旦行政委员会",
                  children: [],
                },
              ],
            },
          ],
        },
        {
          id: 640000,
          name: "宁夏回族自治区",
          children: [
            {
              id: 640100,
              name: "银川市",
              children: [
                {
                  id: 640104,
                  name: "兴庆区",
                  children: [],
                },
                {
                  id: 640105,
                  name: "西夏区",
                  children: [],
                },
                {
                  id: 640106,
                  name: "金凤区",
                  children: [],
                },
                {
                  id: 640121,
                  name: "永宁县",
                  children: [],
                },
                {
                  id: 640122,
                  name: "贺兰县",
                  children: [],
                },
                {
                  id: 640181,
                  name: "灵武市",
                  children: [],
                },
              ],
            },
            {
              id: 640200,
              name: "石嘴山市",
              children: [
                {
                  id: 640202,
                  name: "大武口区",
                  children: [],
                },
                {
                  id: 640205,
                  name: "惠农区",
                  children: [],
                },
                {
                  id: 640221,
                  name: "平罗县",
                  children: [],
                },
              ],
            },
            {
              id: 640300,
              name: "吴忠市",
              children: [
                {
                  id: 640302,
                  name: "利通区",
                  children: [],
                },
                {
                  id: 640303,
                  name: "红寺堡区",
                  children: [],
                },
                {
                  id: 640323,
                  name: "盐池县",
                  children: [],
                },
                {
                  id: 640324,
                  name: "同心县",
                  children: [],
                },
                {
                  id: 640381,
                  name: "青铜峡市",
                  children: [],
                },
              ],
            },
            {
              id: 640400,
              name: "固原市",
              children: [
                {
                  id: 640402,
                  name: "原州区",
                  children: [],
                },
                {
                  id: 640422,
                  name: "西吉县",
                  children: [],
                },
                {
                  id: 640423,
                  name: "隆德县",
                  children: [],
                },
                {
                  id: 640424,
                  name: "泾源县",
                  children: [],
                },
                {
                  id: 640425,
                  name: "彭阳县",
                  children: [],
                },
              ],
            },
            {
              id: 640500,
              name: "中卫市",
              children: [
                {
                  id: 640502,
                  name: "沙坡头区",
                  children: [],
                },
                {
                  id: 640521,
                  name: "中宁县",
                  children: [],
                },
                {
                  id: 640522,
                  name: "海原县",
                  children: [],
                },
              ],
            },
          ],
        },
        {
          id: 650000,
          name: "新疆维吾尔自治区",
          children: [
            {
              id: 650100,
              name: "乌鲁木齐市",
              children: [
                {
                  id: 650102,
                  name: "天山区",
                  children: [],
                },
                {
                  id: 650103,
                  name: "沙依巴克区",
                  children: [],
                },
                {
                  id: 650104,
                  name: "新市区",
                  children: [],
                },
                {
                  id: 650105,
                  name: "水磨沟区",
                  children: [],
                },
                {
                  id: 650106,
                  name: "头屯河区",
                  children: [],
                },
                {
                  id: 650107,
                  name: "达坂城区",
                  children: [],
                },
                {
                  id: 650109,
                  name: "米东区",
                  children: [],
                },
                {
                  id: 650121,
                  name: "乌鲁木齐县",
                  children: [],
                },
              ],
            },
            {
              id: 650200,
              name: "克拉玛依市",
              children: [
                {
                  id: 650202,
                  name: "独山子区",
                  children: [],
                },
                {
                  id: 650203,
                  name: "克拉玛依区",
                  children: [],
                },
                {
                  id: 650204,
                  name: "白碱滩区",
                  children: [],
                },
                {
                  id: 650205,
                  name: "乌尔禾区",
                  children: [],
                },
              ],
            },
            {
              id: 650400,
              name: "吐鲁番市",
              children: [
                {
                  id: 650402,
                  name: "高昌区",
                  children: [],
                },
                {
                  id: 650421,
                  name: "鄯善县",
                  children: [],
                },
                {
                  id: 650422,
                  name: "托克逊县",
                  children: [],
                },
              ],
            },
            {
              id: 650500,
              name: "哈密市",
              children: [
                {
                  id: 650502,
                  name: "伊州区",
                  children: [],
                },
                {
                  id: 650521,
                  name: "巴里坤哈萨克自治县",
                  children: [],
                },
                {
                  id: 650522,
                  name: "伊吾县",
                  children: [],
                },
              ],
            },
            {
              id: 652300,
              name: "昌吉回族自治州",
              children: [
                {
                  id: 652301,
                  name: "昌吉市",
                  children: [],
                },
                {
                  id: 652302,
                  name: "阜康市",
                  children: [],
                },
                {
                  id: 652323,
                  name: "呼图壁县",
                  children: [],
                },
                {
                  id: 652324,
                  name: "玛纳斯县",
                  children: [],
                },
                {
                  id: 652325,
                  name: "奇台县",
                  children: [],
                },
                {
                  id: 652327,
                  name: "吉木萨尔县",
                  children: [],
                },
                {
                  id: 652328,
                  name: "木垒哈萨克自治县",
                  children: [],
                },
              ],
            },
            {
              id: 652700,
              name: "博尔塔拉蒙古自治州",
              children: [
                {
                  id: 652701,
                  name: "博乐市",
                  children: [],
                },
                {
                  id: 652702,
                  name: "阿拉山口市",
                  children: [],
                },
                {
                  id: 652722,
                  name: "精河县",
                  children: [],
                },
                {
                  id: 652723,
                  name: "温泉县",
                  children: [],
                },
              ],
            },
            {
              id: 652800,
              name: "巴音郭楞蒙古自治州",
              children: [
                {
                  id: 652801,
                  name: "库尔勒市",
                  children: [],
                },
                {
                  id: 652822,
                  name: "轮台县",
                  children: [],
                },
                {
                  id: 652823,
                  name: "尉犁县",
                  children: [],
                },
                {
                  id: 652824,
                  name: "若羌县",
                  children: [],
                },
                {
                  id: 652825,
                  name: "且末县",
                  children: [],
                },
                {
                  id: 652826,
                  name: "焉耆回族自治县",
                  children: [],
                },
                {
                  id: 652827,
                  name: "和静县",
                  children: [],
                },
                {
                  id: 652828,
                  name: "和硕县",
                  children: [],
                },
                {
                  id: 652829,
                  name: "博湖县",
                  children: [],
                },
                {
                  id: 652871,
                  name: "库尔勒经济技术开发区",
                  children: [],
                },
              ],
            },
            {
              id: 652900,
              name: "阿克苏地区",
              children: [
                {
                  id: 652901,
                  name: "阿克苏市",
                  children: [],
                },
                {
                  id: 652902,
                  name: "库车市",
                  children: [],
                },
                {
                  id: 652922,
                  name: "温宿县",
                  children: [],
                },
                {
                  id: 652924,
                  name: "沙雅县",
                  children: [],
                },
                {
                  id: 652925,
                  name: "新和县",
                  children: [],
                },
                {
                  id: 652926,
                  name: "拜城县",
                  children: [],
                },
                {
                  id: 652927,
                  name: "乌什县",
                  children: [],
                },
                {
                  id: 652928,
                  name: "阿瓦提县",
                  children: [],
                },
                {
                  id: 652929,
                  name: "柯坪县",
                  children: [],
                },
              ],
            },
            {
              id: 653000,
              name: "克孜勒苏柯尔克孜自治州",
              children: [
                {
                  id: 653001,
                  name: "阿图什市",
                  children: [],
                },
                {
                  id: 653022,
                  name: "阿克陶县",
                  children: [],
                },
                {
                  id: 653023,
                  name: "阿合奇县",
                  children: [],
                },
                {
                  id: 653024,
                  name: "乌恰县",
                  children: [],
                },
              ],
            },
            {
              id: 653100,
              name: "喀什地区",
              children: [
                {
                  id: 653101,
                  name: "喀什市",
                  children: [],
                },
                {
                  id: 653121,
                  name: "疏附县",
                  children: [],
                },
                {
                  id: 653122,
                  name: "疏勒县",
                  children: [],
                },
                {
                  id: 653123,
                  name: "英吉沙县",
                  children: [],
                },
                {
                  id: 653124,
                  name: "泽普县",
                  children: [],
                },
                {
                  id: 653125,
                  name: "莎车县",
                  children: [],
                },
                {
                  id: 653126,
                  name: "叶城县",
                  children: [],
                },
                {
                  id: 653127,
                  name: "麦盖提县",
                  children: [],
                },
                {
                  id: 653128,
                  name: "岳普湖县",
                  children: [],
                },
                {
                  id: 653129,
                  name: "伽师县",
                  children: [],
                },
                {
                  id: 653130,
                  name: "巴楚县",
                  children: [],
                },
                {
                  id: 653131,
                  name: "塔什库尔干塔吉克自治县",
                  children: [],
                },
              ],
            },
            {
              id: 653200,
              name: "和田地区",
              children: [
                {
                  id: 653201,
                  name: "和田市",
                  children: [],
                },
                {
                  id: 653221,
                  name: "和田县",
                  children: [],
                },
                {
                  id: 653222,
                  name: "墨玉县",
                  children: [],
                },
                {
                  id: 653223,
                  name: "皮山县",
                  children: [],
                },
                {
                  id: 653224,
                  name: "洛浦县",
                  children: [],
                },
                {
                  id: 653225,
                  name: "策勒县",
                  children: [],
                },
                {
                  id: 653226,
                  name: "于田县",
                  children: [],
                },
                {
                  id: 653227,
                  name: "民丰县",
                  children: [],
                },
              ],
            },
            {
              id: 654000,
              name: "伊犁哈萨克自治州",
              children: [
                {
                  id: 654002,
                  name: "伊宁市",
                  children: [],
                },
                {
                  id: 654003,
                  name: "奎屯市",
                  children: [],
                },
                {
                  id: 654004,
                  name: "霍尔果斯市",
                  children: [],
                },
                {
                  id: 654021,
                  name: "伊宁县",
                  children: [],
                },
                {
                  id: 654022,
                  name: "察布查尔锡伯自治县",
                  children: [],
                },
                {
                  id: 654023,
                  name: "霍城县",
                  children: [],
                },
                {
                  id: 654024,
                  name: "巩留县",
                  children: [],
                },
                {
                  id: 654025,
                  name: "新源县",
                  children: [],
                },
                {
                  id: 654026,
                  name: "昭苏县",
                  children: [],
                },
                {
                  id: 654027,
                  name: "特克斯县",
                  children: [],
                },
                {
                  id: 654028,
                  name: "尼勒克县",
                  children: [],
                },
              ],
            },
            {
              id: 654200,
              name: "塔城地区",
              children: [
                {
                  id: 654201,
                  name: "塔城市",
                  children: [],
                },
                {
                  id: 654202,
                  name: "乌苏市",
                  children: [],
                },
                {
                  id: 654203,
                  name: "沙湾市",
                  children: [],
                },
                {
                  id: 654221,
                  name: "额敏县",
                  children: [],
                },
                {
                  id: 654224,
                  name: "托里县",
                  children: [],
                },
                {
                  id: 654225,
                  name: "裕民县",
                  children: [],
                },
                {
                  id: 654226,
                  name: "和布克赛尔蒙古自治县",
                  children: [],
                },
              ],
            },
            {
              id: 654300,
              name: "阿勒泰地区",
              children: [
                {
                  id: 654301,
                  name: "阿勒泰市",
                  children: [],
                },
                {
                  id: 654321,
                  name: "布尔津县",
                  children: [],
                },
                {
                  id: 654322,
                  name: "富蕴县",
                  children: [],
                },
                {
                  id: 654323,
                  name: "福海县",
                  children: [],
                },
                {
                  id: 654324,
                  name: "哈巴河县",
                  children: [],
                },
                {
                  id: 654325,
                  name: "青河县",
                  children: [],
                },
                {
                  id: 654326,
                  name: "吉木乃县",
                  children: [],
                },
              ],
            },
            {
              id: 659000,
              name: "自治区直辖县级行政区划",
              children: [
                {
                  id: 659001,
                  name: "石河子市",
                  children: [],
                },
                {
                  id: 659002,
                  name: "阿拉尔市",
                  children: [],
                },
                {
                  id: 659003,
                  name: "图木舒克市",
                  children: [],
                },
                {
                  id: 659004,
                  name: "五家渠市",
                  children: [],
                },
                {
                  id: 659005,
                  name: "北屯市",
                  children: [],
                },
                {
                  id: 659006,
                  name: "铁门关市",
                  children: [],
                },
                {
                  id: 659007,
                  name: "双河市",
                  children: [],
                },
                {
                  id: 659008,
                  name: "可克达拉市",
                  children: [],
                },
                {
                  id: 659009,
                  name: "昆玉市",
                  children: [],
                },
                {
                  id: 659010,
                  name: "胡杨河市",
                  children: [],
                },
                {
                  id: 659011,
                  name: "新星市",
                  children: [],
                },
              ],
            },
          ],
        },
      ],
    };
  },
};
