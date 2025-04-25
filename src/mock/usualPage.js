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
};
