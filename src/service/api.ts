import Taro from "@tarojs/taro";
import request from "./service";

export const loginAPI = (data: any) =>
  request("/springboot/user/login", "POST", null, data);

export const getUserInfoAPI = () =>
  request(
    "/springboot/user/getUserInfo",
    "POST",
    {
      Authorization: Taro.getStorageSync("token")
    },
    null
  );

export const send = () =>
  request(
    "/springboot/user/send",
    "POST",
    {
      Authorization: Taro.getStorageSync("token")
    },
    null
  );
