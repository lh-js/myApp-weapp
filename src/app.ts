import Taro from "@tarojs/taro";
import { Component, PropsWithChildren, useEffect, useState } from "react";
import appConfig from "./app.config";
import "./app.scss";
import { store } from "./store/store";

function App(props: { children: any }) {
  useEffect(() => {
    getUserInfo();
  }, []);
  function getUserInfo() {
    Taro.request({
      url: "https://192.168.124.5/springboot/user/getUserInfo",
      method: "POST",
      header: {
        Authorization: Taro.getStorageSync("token")
      },
      success: res => {
        console.log(res);
        store.setState(res.data.data);
      },
      fail: err => {
        console.log(err);
      }
    });
  }
  // this.props.children 是将要会渲染的页面
  return props.children;
}

export default App;
