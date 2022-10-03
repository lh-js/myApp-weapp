import { Component, PropsWithChildren, useEffect, useState } from "react";
import { View, Text, Button } from "@tarojs/components";
import "./index.scss";
import Taro from "@tarojs/taro";
import { AtButton, AtAvatar, AtIcon } from "taro-ui";
import { useStore } from "../../store/store";

export default () => {
  const [userInfo, setUserInfo] = useStore();
  useEffect(() => {
    console.log(userInfo);
  });
  function userLogin(avatar, username) {
    Taro.login({
      success: function(res) {
        if (res.code) {
          //发起网络请求
          Taro.request({
            url: "https://192.168.124.5/springboot/user/login",
            method: "POST",
            data: {
              avatar: avatar,
              code: res.code,
              username: username
            },
            success: res => {
              console.log(res);
              Taro.setStorage({
                key: "token",
                data: res.data.data.token
              });
              setUserInfo(res.data.data);
            },
            fail: err => {
              console.log(err);
            }
          });
        } else {
          console.log("登录失败！" + res.errMsg);
        }
      }
    });
  }

  function getUserInfo() {
    Taro.getUserProfile({
      desc: "用于完善会员资料", // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: res => {
        // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
        console.log(res);
        userLogin(res.userInfo.avatarUrl, res.userInfo.nickName);
      }
    });
  }

  return (
    <View className="index">
      {!userInfo ? (
        <View className="login-content">
          <AtButton
            type="primary"
            size="normal"
            circle
            className="login-button"
            onClick={getUserInfo}
          >
            点击登录
          </AtButton>
        </View>
      ) : (
        <View className="login-content">
          <View className="login-user">
            <View className="login-userinfo">
              <AtAvatar image={userInfo?.avatar}></AtAvatar>
              <View style="color:#FFFFFF;margin-left:10px">
                {userInfo?.username}
              </View>
            </View>
            <AtIcon value="settings" size="20" color="#FFFFFF"></AtIcon>
          </View>
        </View>
      )}
    </View>
  );
};
