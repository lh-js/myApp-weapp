import {
  View,
  Input,
  Form,
  Switch,
  Text,
  Picker,
  Textarea
} from "@tarojs/components";
import { useRef, useState } from "react";
import { AtButton, AtForm, AtInput, AtInputNumber, AtListItem } from "taro-ui";
import "./index.scss";
const AddSchedule = () => {
  const [remindThing, setRemindThig] = useState("");
  const [thingAddress, setThingAddress] = useState("");
  const [startDate, setStartDate] = useState("0000-00-00");
  const [startTime, setStartTime] = useState("00:00");
  const [endDate, setEndDate] = useState("0000-00-00");
  const [endTime, setEndTime] = useState("23:59");
  const [remindDate, setRemindDate] = useState("0000-00-00");
  const [remindTime, setRemindTime] = useState("00:00");
  const [remark, setRemark] = useState("");
  return (
    <View className="body">
      <View className="form-content">
        <Form>
          <View className="form-item">
            <View className="form-item-child">*提醒事项:</View>
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
            <View className="form-item-child">*事项地点:</View>
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
            <View className="form-item-child">*开始时间:</View>
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
            <View className="form-item-child">*结束时间:</View>
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
                startTime: startDate + " " + startTime,
                endTime: endDate + " " + endTime,
                remindTime: remindDate + " " + remindTime,
                remark: remark
              };
              console.log(scheduleData);
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
