import { Component, PropsWithChildren, useEffect, useState } from "react";
import { View, Text, Button } from "@tarojs/components";
import "./index.scss";
import Taro from "@tarojs/taro";
import { AtButton, AtAvatar, AtIcon } from "taro-ui";
import { useStore } from "../../store/store";
import { loginAPI } from "../../service/api";
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
          loginAPI({
            avatar: avatar,
            code: res.code,
            username: username
          }).then((res: any) => {
            Taro.setStorage({
              key: "token",
              data: res?.data?.data?.token
            });
            setUserInfo(res?.data?.data);
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

  function loginOut() {
    Taro.showModal({
      title: "提示",
      content: "确定要退出登录吗？",
      success: function(res) {
        if (res.confirm) {
          Taro.removeStorage({
            key: "token",
            success: function(res) {
              console.log(res);
              Taro.showToast({
                title: "退出登录成功",
                icon: "success",
                duration: 2000
              });
              setUserInfo(undefined);
            }
          });
        } else if (res.cancel) {
          console.log("用户点击取消");
        }
      }
    });
  }

  return (
    <View>
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
              <View className="login-username">{userInfo?.username}</View>
            </View>
            <View>
              <AtButton type="secondary" circle size="small" onClick={loginOut}>
                退出登录
              </AtButton>
            </View>
          </View>
        </View>
      )}
      <View className="mine-content">
        <View className="mine-item">V1.0.0</View>
      </View>
    </View>
  );
};
