import http from "@/utils/request";

// export const getData = (data) => {
//   return http.get("/usual/list", data);
// };

export function getUserList(data) {
  return http.request({
    url: "/usual/userList",
    method: "get",
    params: data,
  });
}

export function getUserDetailsById(id) {
  return http.request({
    url: "/usual/user/" + id,
    method: "get",
  });
}

export function updateUserStatusById(data) {
  return http.request({
    url: "/usual/list/updateById",
    method: "post",
    data: data,
  });
}

export function userAdd(data) {
  return http.request({
    url: "/usual/list/userAdd",
    method: "post",
    data: data,
  });
}

export function userEdit(data) {
  return http.request({
    url: "/usual/list/userEdit",
    method: "post",
    data: data,
  });
}

// 删除用户
export function userDeleteById(id) {
  return http.request({
    url: "/usual/userDelete/" + id,
    method: "delete",
  });
}

// export async function getSelectOptions() {
//   await new Promise((resolve) => setTimeout(resolve, 2000));
//   return http.request({
//     url: "/usual/select/options",
//     method: "get",
//   });
// }
export function getSelectOptions() {
  return http.request({
    url: "/usual/select/options",
    method: "get",
  });
}
export function getAreaTree() {
  return http.request({
    url: "/system/area/tree",
    method: "get",
  });
}
