import Taro from "@tarojs/taro";
import { Component, PropsWithChildren, useEffect, useState } from "react";
import appConfig from "./app.config";
import "./app.scss";
import { getUserInfoAPI } from "./service/api";
import { store } from "./store/store";

function App(props: { children: any }) {
  useEffect(() => {
    getUserInfo();
    // connect();
  }, []);
  function getUserInfo() {
    getUserInfoAPI().then((res: any) => {
      store.setState(res.data.data);
    });
  }

  function connect() {
    if (!Taro.getStorageSync("token")) {
      return;
    }
    Taro.connectSocket({
      url:
        "wss://127.0.0.1/springboot/websocket/" + Taro.getStorageSync("token"),
      success: function() {
        console.log("connect success");
      }
    }).then(task => {
      task.onOpen(function() {
        console.log("onOpen");
        send("ping");
      });
      task.onMessage(function(msg) {
        console.log("onMessage: ", msg);
        // task.close()
      });
      task.onError(function() {
        console.log("onError");
      });
      task.onClose(function(e) {
        console.log("onClose: ", e);
      });
    });
  }

  function send(data) {
    Taro.sendSocketMessage({
      data: data
    });
  }
  function close() {
    Taro.closeSocket();
  }
  // this.props.children 是将要会渲染的页面
  return props.children;
}

export default App;
