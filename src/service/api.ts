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

export const insertScheduleAPI = (data: any) =>
  request(
    "/springboot/schedule/insert",
    "POST",
    {
      Authorization: Taro.getStorageSync("token")
    },
    data
  );

export const selectByOpenId = () =>
  request(
    "/springboot/schedule/selectByOpenId",
    "POST",
    {
      Authorization: Taro.getStorageSync("token")
    },
    null
  );

export const getScheduleByid = (data: any) =>
  request(
    "/springboot/schedule/selectById",
    "POST",
    {
      Authorization: Taro.getStorageSync("token")
    },
    data
  );

export const updateScheduleAPI = (data: any) =>
  request(
    "/springboot/schedule/updateSchedule",
    "POST",
    {
      Authorization: Taro.getStorageSync("token")
    },
    data
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
