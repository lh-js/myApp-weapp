import { Input, View } from "@tarojs/components";
import "./index.scss";
import Taro from "@tarojs/taro";
import { AtButton } from "taro-ui";
import { useState } from "react";
export default () => {
  const [userId, setUserId] = useState("");
  function connect() {
    Taro.connectSocket({
      url: "wss://127.0.0.1/springboot/websocket/" + userId,
      success: function() {
        console.log("connect success");
      }
    }).then(task => {
      task.onOpen(function() {
        console.log("onOpen");
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

  function send() {
    Taro.sendSocketMessage({
      data: "hello service"
    });
  }
  function close() {
    Taro.closeSocket();
  }
  return (
    <View>
      <Input
        type="number"
        value={userId}
        onInput={(e: any) => {
          setUserId(e.target.value);
        }}
        placeholder="userId"
        focus
      />
      <AtButton onClick={connect}>点击连接</AtButton>
      <AtButton onClick={send}>点击向服务端发送消息</AtButton>
      <AtButton onClick={close}>点击关闭</AtButton>
    </View>
  );
};
