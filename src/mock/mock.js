import Mock from "mockjs";
import usualPageApi from "./usualPage";
import loginApi from "./login";

// 模拟登录
// console.log(loginApi,2222);
Mock.mock("/dev-api/captchaImage", "get", loginApi.captchaImage);
Mock.mock("/dev-api/login", "post", loginApi.login);
Mock.mock("/dev-api/getInfo", "get", loginApi.getInfo);
Mock.mock("/dev-api/getRouters", "get", loginApi.getRouters);
Mock.mock("/dev-api/logout", "post", loginApi.logout);
// Mock.mock("/dev-api/captchaImage", "get", (data) => {
//   console.log(data, 121212);
// });

// // 定义mock请求拦截
Mock.mock(/dev-api\/usual\/userList/, "get", usualPageApi.getUserList);
Mock.mock(/dev-api\/usual\/user/, "get", usualPageApi.getUserDetailsById);
Mock.mock(
  "/dev-api/usual/list/updateById",
  "post",
  usualPageApi.updateUserStatusById
);
Mock.mock("/dev-api/usual/list/userAdd", "post", usualPageApi.userAdd);
Mock.mock("/dev-api/usual/list/userEdit", "post", usualPageApi.userEdit);
Mock.mock(/dev-api\/usual\/userDelete/, "delete", usualPageApi.userDeleteById);
