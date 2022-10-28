import Taro from "@tarojs/taro";

const baseUrl = "https://localhost";
// const baseUrl = "https://www.lihong.org.cn";

function request(url: any, method: any, header: any, data: any) {
  Taro.showLoading({
    title: "玩命请求中"
  });
  return new Promise((reslove, reject) => {
    Taro.request({
      url: baseUrl + url,
      method: method,
      data: data,
      header: header,
      success: (res: any) => {
        console.log(res);
        Taro.hideLoading();
        if (res.data.status != 200) {
          Taro.showToast({
            title: res.data.message,
            icon: "none",
            duration: 5000
          });
          return;
        }
        reslove(res);
      },
      fail: err => {
        console.log(err);
        Taro.hideLoading();
        reject(err);
      }
    });
  });
}

export default request;
