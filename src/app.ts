import Taro from "@tarojs/taro";
import { Component, PropsWithChildren, useEffect, useState } from "react";
import appConfig from "./app.config";
import "./app.scss";
import { getUserInfoAPI } from "./service/api";
import { store } from "./store/store";

function App(props: { children: any }) {
  useEffect(() => {
    getUserInfo();
  }, []);
  function getUserInfo() {
    getUserInfoAPI().then((res: any) => {
      store.setState(res.data.data);
    });
  }
  // this.props.children 是将要会渲染的页面
  return props.children;
}

export default App;
