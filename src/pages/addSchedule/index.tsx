import {
  View,
  Input,
  Form,
  Switch,
  Text,
  Picker,
  Textarea
} from "@tarojs/components";
import Taro from "@tarojs/taro";
import taro from "@tarojs/taro-h5";
import { useEffect, useRef, useState } from "react";
import {
  getScheduleByid,
  insertScheduleAPI,
  updateScheduleAPI
} from "../../service/api";
import { AtButton, AtForm, AtInput, AtInputNumber, AtListItem } from "taro-ui";
import "./index.scss";
const AddSchedule = () => {
  const [id, setId] = useState(0);
  const [remindThing, setRemindThig] = useState("");
  const [thingAddress, setThingAddress] = useState("");
  const [startDate, setStartDate] = useState("0000-00-00");
  const [startTime, setStartTime] = useState("00:00");
  const [endDate, setEndDate] = useState("0000-00-00");
  const [endTime, setEndTime] = useState("23:59");
  const [remindDate, setRemindDate] = useState("0000-00-00");
  const [remindTime, setRemindTime] = useState("00:00");
  const [remark, setRemark] = useState("");

  useEffect(() => {
    let id = Taro.getCurrentInstance().router?.params.id;
    console.log(id);
    if (id) {
      setId(Number(id));
      getScheduleByid({
        endTime: "",
        id: id,
        openId: "",
        remark: "",
        remindThing: "",
        remindTime: "",
        startTime: "",
        thingAddress: ""
      }).then((res: any) => {
        Taro.setNavigationBarTitle({
          title: "修改日程"
        });
        setRemindThig(res.data.data.remindThing);
        setThingAddress(res.data.data.thingAddress);
        setRemindDate(formatDate(res.data.data.remindTime));
        setRemindTime(formatTime(res.data.data.remindTime));
        setStartDate(formatDate(res.data.data.startTime));
        setStartTime(formatTime(res.data.data.startTime));
        setEndDate(formatDate(res.data.data.endTime));
        setEndTime(formatTime(res.data.data.endTime));
        setRemark(res.data.data.remark);
      });
    }
  }, []);

  function formatDate(value: number) {
    if (value) {
      let date = new Date(value); // 时间戳为秒：10位数
      //let date = new Date(value)    // 时间戳为毫秒：13位数
      let year = date.getFullYear();
      let month =
        date.getMonth() + 1 < 10
          ? `0${date.getMonth() + 1}`
          : date.getMonth() + 1;
      let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
      return `${year}-${month}-${day}`;
    } else {
      return "";
    }
  }

  function formatTime(value: number) {
    if (value) {
      let date = new Date(value); // 时间戳为秒：10位数
      //let date = new Date(value)    // 时间戳为毫秒：13位数
      let hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
      let minute =
        date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
      return `${hour}:${minute}`;
    } else {
      return "";
    }
  }

  return (
    <View className="body">
      <View className="form-content">
        <Form>
          <View className="form-item">
            <View className="form-item-child">
              <Text style={{ color: "red" }}>*</Text>提醒事项:
            </View>
            <Input
              className="form-item-input"
              type="text"
              value={remindThing}
              onInput={(e: any) => {
                setRemindThig(e.target.value);
              }}
              placeholder="请输入提醒事项"
              focus
            />
          </View>
          <View className="form-item">
            <View className="form-item-child">
              <Text style={{ color: "red" }}>*</Text>事项地点:
            </View>
            <Input
              className="form-item-input"
              type="text"
              value={thingAddress}
              onInput={(e: any) => {
                setThingAddress(e.target.value);
              }}
              placeholder="请输入事项地点"
              focus
            />
          </View>
          <View className="form-item-time">
            <View className="form-item-child">
              <Text style={{ color: "red" }}>*</Text>开始时间:
            </View>
            <View className="form-item-picker">
              <Picker
                mode="date"
                value={startDate}
                onChange={(e: any) => {
                  setStartDate(e.target.value);
                }}
              >
                <AtListItem extraText={startDate} />
              </Picker>
              <Picker
                mode="time"
                value={startTime}
                onChange={(e: any) => {
                  setStartTime(e.target.value);
                }}
              >
                <AtListItem extraText={startTime} />
              </Picker>
            </View>
          </View>
          <View className="form-item-time">
            <View className="form-item-child">
              <Text style={{ color: "red" }}>*</Text>结束时间:
            </View>
            <View className="form-item-picker">
              <Picker
                mode="date"
                value={endDate}
                onChange={(e: any) => {
                  setEndDate(e.target.value);
                }}
              >
                <AtListItem extraText={endDate} />
              </Picker>
              <Picker
                mode="time"
                value={endTime}
                onChange={(e: any) => {
                  setEndTime(e.target.value);
                }}
              >
                <AtListItem extraText={endTime} />
              </Picker>
            </View>
          </View>
          <View className="form-item-time">
            <View className="form-item-child">提醒时间:</View>
            <View className="form-item-picker">
              <Picker
                mode="date"
                value={remindDate}
                onChange={(e: any) => {
                  setRemindDate(e.target.value);
                }}
              >
                <AtListItem extraText={remindDate} />
              </Picker>
              <Picker
                mode="time"
                value={remindTime}
                onChange={(e: any) => {
                  setRemindTime(e.target.value);
                }}
              >
                <AtListItem extraText={remindTime} />
              </Picker>
            </View>
          </View>
          <View className="form-item-time">
            <View className="form-item-child">备注:</View>
            <Textarea
              className="form-item-textarea"
              value={remark}
              onInput={(e: any) => {
                setRemark(e.target.value);
              }}
              autoFocus
            />
          </View>
          <AtButton
            type="primary"
            full
            className="submit"
            onClick={() => {
              let scheduleData = {
                remindThing: remindThing,
                thingAddress: thingAddress,
                startTime: new Date(startDate + " " + startTime),
                endTime: new Date(endDate + " " + endTime),
                remindTime: new Date(remindDate + " " + remindTime),
                remark: remark
              };
              console.log(scheduleData);
              if (id == 0) {
                insertScheduleAPI(scheduleData).then(() => {
                  Taro.switchTab({
                    url: "../index/index"
                  });
                });
              } else {
                updateScheduleAPI({
                  id: id,
                  remindThing: remindThing,
                  thingAddress: thingAddress,
                  startTime: new Date(startDate + " " + startTime),
                  endTime: new Date(endDate + " " + endTime),
                  remindTime: new Date(remindDate + " " + remindTime),
                  remark: remark
                }).then(() => {
                  Taro.switchTab({
                    url: "../index/index"
                  });
                });
              }
            }}
          >
            提交
          </AtButton>
        </Form>
        <View className="tip-title">注：</View>
        <View className="tip">1.提交之后选择订阅本小程序才能获得微信提醒</View>
        <View className="tip">
          2.如果不选择提醒时间则默认事项开始前十分钟提醒
        </View>
      </View>
    </View>
  );
};

export default AddSchedule;
