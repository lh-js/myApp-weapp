import { View, Image, CommonEvent } from "@tarojs/components";
import "./index.scss";
import { AtButton, AtIcon, AtListItem, AtSwipeAction } from "taro-ui";
import { useEffect, useState } from "react";
import Taro, { usePullDownRefresh } from "@tarojs/taro";
import { deteleScheduleAPI, selectByOpenId } from "../../service/api";
import { SwipeActionOption } from "taro-ui/types/swipe-action";
const Index = () => {
  const bmap = require("../../utils/bmap/bmap-wx.min.js");
  var BMap = new bmap.BMapWX({
    ak: "oMbd8EKpx0zKX5xzQGbY9KGtYyS7zZdW"
  });
  const [address, setAddress] = useState();
  const [weatherText, setWeatherText] = useState();
  const [weatherIcon, setWeatherIcon] = useState();
  const [weatherTemp, setWeatherTemp] = useState();
  const [schedule, setSchedule] = useState<any[]>();
  const [openIndex, setOpenIndex] = useState(-1);

  // useEffect(() => {
  //   getAddress();
  // }, []);
  useEffect(() => {
    selectByOpenId().then((res: any) => {
      setSchedule(res.data.data);
      console.log(res.data.data);
    });
  }, []);

  usePullDownRefresh(() => {
    selectByOpenId().then((res: any) => {
      setSchedule(res.data.data);
      console.log(res.data.data);
    });
  });
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

  return (
    <View className="body">
      {/* {weatherIcon ? (
        <Image src={require(`../../assets/icons/${weatherIcon}.svg`)} />
      ) : null}
      <View style="fontSize:40px">{weatherTemp}°C</View>
      <View>{weatherText}</View>
      <View style="fontSize:30px">{address}</View> */}
      <View className="schedule-content">
        <View className="schedule-title">我的日程</View>
        {schedule?.length != 0
          ? schedule?.map((item, index) => (
              <View key={item.id} className="schedule-item">
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
                  onClick={() => {
                    console.log(item);
                    deteleScheduleAPI(item).then(res => {
                      selectByOpenId().then((res: any) => {
                        setSchedule(res.data.data);
                        console.log(res.data.data);
                      });
                    });
                  }}
                  // onOpened={() => {
                  //   setOpenIndex(index);
                  // }}
                  // isOpened={index == openIndex}
                >
                  <AtListItem
                    title={item.remindThing}
                    note={item.thingAddress}
                    arrow="right"
                    extraText="详细信息"
                    iconInfo={{ size: 25, color: "#78A4FA", value: "calendar" }}
                    onClick={() => {
                      console.log(item);
                      Taro.reLaunch({
                        url: "../addSchedule/index?id=" + item.id
                      });
                    }}
                  />
                </AtSwipeAction>
              </View>
            ))
          : "暂无日程"}
      </View>
      <AtButton
        type="primary"
        className="add-schedule"
        onClick={() => {
          Taro.reLaunch({
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
