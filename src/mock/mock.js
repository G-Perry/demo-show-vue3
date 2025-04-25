import Mock from "mockjs";
import usualPageApi from "./usualPage";
import loginApi from "./login";

// 模拟登录
Mock.mock(/api\/captchaImage/, "get", loginApi.captchaImage);
Mock.mock(/api\/login/, "post", loginApi.login);
Mock.mock(/api\/getInfo/, "get", loginApi.getInfo);
Mock.mock(/api\/getRouters/, "get", loginApi.getRouters);
Mock.mock(/api\/logout/, "post", loginApi.logout);


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

Mock.mock(/api\/usual\/select\/options/, "get", usualPageApi.getSelectOptions);