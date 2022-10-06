import { View, Image } from "@tarojs/components";
import "./index.scss";
import { AtButton, AtIcon, AtListItem, AtSwipeAction } from "taro-ui";
import { useEffect, useState } from "react";
import Taro from "@tarojs/taro";
import { send } from "../../service/api";
const Index = () => {
  const bmap = require("../../utils/bmap/bmap-wx.min.js");
  var BMap = new bmap.BMapWX({
    ak: "oMbd8EKpx0zKX5xzQGbY9KGtYyS7zZdW"
  });
  const [address, setAddress] = useState();
  const [weatherText, setWeatherText] = useState();
  const [weatherIcon, setWeatherIcon] = useState();
  const [weatherTemp, setWeatherTemp] = useState();

  useEffect(() => {
    getAddress();
  }, []);
  function getAddress() {
    BMap.regeocoding({
      success: (res: { originalData: { result: any } }) => {
        console.log(res);
        let data = res.originalData.result;
        getCity(data.addressComponent.adcode);
        setAddress(
          data.addressComponent.province +
            data.addressComponent.city +
            data.addressComponent.district
        );
      },
      fail: err => {
        console.log(err);
      }
    });
  }

  function getCity(adcode: Number) {
    Taro.request({
      url: `https://geoapi.qweather.com/v2/city/lookup?location=${adcode}&key=0631719cf04a4006bc85a31be11827e6`,
      method: "GET",
      header: {
        "content-type": "application/json" // 默认值
      },
      success: function(res) {
        console.log(res.data);
        getWeather(res.data.location[0].id);
      }
    });
  }

  function getWeather(id: Number) {
    Taro.request({
      url: `https://devapi.qweather.com/v7/weather/now?location=${id}&key=0631719cf04a4006bc85a31be11827e6`,
      header: {
        "content-type": "application/json" // 默认值
      },
      success: function(res) {
        console.log(res.data);
        setWeatherIcon(res.data.now.icon);
        setWeatherText(res.data.now.text);
        setWeatherTemp(res.data.now.temp);
      }
    });
  }

  function test() {
    Taro.requestSubscribeMessage({
      tmplIds: ["N0liGKV50bJRH_sMx4qnNzf-DeZxreWDgcmwry_WeYM"],
      success: function(res) {
        console.log(res);
        send();
      },
      fail: function(err) {
        console.log(err);
      }
    });
  }

  function change(date) {
    console.log(date);
  }
  return (
    <View className="body">
      {weatherIcon ? (
        <Image src={require(`../../assets/icons/${weatherIcon}.svg`)} />
      ) : null}
      <View style="fontSize:40px">{weatherTemp}°C</View>
      <View>{weatherText}</View>
      <View style="fontSize:30px">{address}</View>
      <View className="schedule-content">
        <View className="schedule-title">我的日程</View>
        <View className="schedule-item">
          <AtSwipeAction
            autoClose
            options={[
              {
                text: "删除",
                style: {
                  backgroundColor: "#FF4949",
                  width: "16px"
                }
              }
            ]}
          >
            <AtListItem
              title="标题文字"
              note="描述信息"
              arrow="right"
              extraText="详细信息"
              iconInfo={{ size: 25, color: "#78A4FA", value: "calendar" }}
            />
          </AtSwipeAction>
        </View>
      </View>
      <AtButton
        type="primary"
        className="add-schedule"
        onClick={() => {
          Taro.navigateTo({
            url: "../addSchedule/index"
          });
        }}
      >
        <AtIcon value="add" size="20" color="#FFFFFF"></AtIcon>
      </AtButton>
    </View>
  );
};

export default Index;
