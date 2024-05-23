import Mock from "mockjs";
import usualPageApi from "./usualPage";
import loginApi from "./login";

// 模拟登录
Mock.mock(/api\/captchaImage/, "get", loginApi.captchaImage);
Mock.mock(/api\/login/, "post", loginApi.login);
Mock.mock(/api\/getInfo/, "get", loginApi.getInfo);
Mock.mock(/api\/getRouters/, "get", loginApi.getRouters);
Mock.mock(/api\/logout/, "post", loginApi.logout);

// Mock.mock("/dev-api/captchaImage", "get", loginApi.captchaImage);
// Mock.mock("/dev-api/login", "post", loginApi.login);
// Mock.mock("/dev-api/getInfo", "get", loginApi.getInfo);
// Mock.mock("/dev-api/getRouters", "get", loginApi.getRouters);
// Mock.mock("/dev-api/logout", "post", loginApi.logout);

// 定义mock请求拦截
Mock.mock(/api\/usual\/userList/, "get", usualPageApi.getUserList);
Mock.mock(/api\/usual\/user/, "get", usualPageApi.getUserDetailsById);
Mock.mock(
  /api\/usual\/list\/updateById/,
  "post",
  usualPageApi.updateUserStatusById
);
Mock.mock(/api\/usual\/list\/userAdd/, "post", usualPageApi.userAdd);
Mock.mock(/api\/usual\/list\/userEdit/, "post", usualPageApi.userEdit);
Mock.mock(/api\/usual\/userDelete/, "delete", usualPageApi.userDeleteById);

// Mock.mock(/dev-api\/usual\/userList/, "get", usualPageApi.getUserList);
// Mock.mock(/dev-api\/usual\/user/, "get", usualPageApi.getUserDetailsById);
// Mock.mock(
//   "/dev-api/usual/list/updateById",
//   "post",
//   usualPageApi.updateUserStatusById
// );
// Mock.mock("/dev-api/usual/list/userAdd", "post", usualPageApi.userAdd);
// Mock.mock("/dev-api/usual/list/userEdit", "post", usualPageApi.userEdit);
// Mock.mock(/dev-api\/usual\/userDelete/, "delete", usualPageApi.userDeleteById);
