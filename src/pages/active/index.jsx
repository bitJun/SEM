import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image
} from '@tarojs/components';
import Taro, { useDidShow } from '@tarojs/taro';
import {
  NavBar
} from '@components';
import { set as setGlobalData, get as getGlobalData } from '@config/global';
import {
  baseUrl
} from '@config';
import {
  queryOfflineActivityList,
  postOfflineActivityEnroll,
  postPaymentSync
} from '@service/active';
import './index.scss';

const Mine = () => {
  let systemInfo = getGlobalData('systemInfo');
  let rate = systemInfo.safeArea.width / 750;

  const [list, setList] = useState([]);
  const [orderSn, setOrderSn] = useState('');

  useDidShow(()=>{
    loadData();
  });

  const loadData = () => {
    queryOfflineActivityList()
      .then(res=>{
        setList(res);
      })
  }

  const showDetail = (activityCode) => {
    Taro.navigateTo({
      url: `/pages/active/detail?activityCode=${activityCode}`
    })
  }

  const onEnroll = (activityCode) => {
    postOfflineActivityEnroll({activityCode})
      .then(res=> {
        console.log('res', res);
        setOrderSn(res.orderSn);
        let {
          prepayResponse
        } = res;
        Taro.requestPayment({
          'timeStamp': prepayResponse.timeStamp,
          'nonceStr': prepayResponse.nonceStr,
          'package': prepayResponse.packageStr,
          'signType': prepayResponse.signType,
          'paySign': prepayResponse.paySign,
          success: function (json) {
            console.log('json', json)
            postPaymentSync({orderSn: res.prepayResponse.orderSn})
              .then({})
            // self.setState({
            //   canPay: true
            // });
            // getMallOrderPaidOrder(orderNo);
            // Taro.redirectTo({
            //   url: `/pages/order/pay/success?orderNo=${orderNo}`
            // });
          },
          fail: function (json) {
            // self.setState({
            //   canPay: true
            // });
            // if (json.errMsg !== "requestPayment:fail cancel") {
            //   Taro.redirectTo({
            //     url: `/pages/order/pay/fail?orderNo=${orderNo}`
            //   });
            // }
            // if (json.errMsg == "requestPayment:fail cancel") {
            //   Taro.redirectTo({
            //     url: `/pages/order/detail/index?orderNo=${orderNo}`
            //   });
            // }
          },
          complete: function(json) {
            console.log('jsondata', json)
          }
        });
      })
  }
  
  return (
    <View
      className='active_view'
      style={{
        paddingTop: `calc(${systemInfo.safeArea.top}px + ${88 * rate}px)`,
      }}
    >
      <NavBar
        title='活动'
        showBack={false}
        bgColor="transparent"
      />
      <View className='active_view_banner'>
        <Image
          src={`${baseUrl}actveBanner.png`}
          className='active_view_banner_img'
          mode='widthFix'
        />
      </View>
      <View className='active_view_main'>
        <View className='active_view_main_title'>
          进行中
        </View>
        <View className='active_view_main_list'>
          {
            list && list.map(item=>
              <View
                className='active_view_main_list_item'
                key={item?.activityCode}
                onClick={()=>{
                  showDetail(item?.activityCode)
                }}
              >
                <Image
                  src={item?.activityPic}
                  className='active_view_main_list_item_img'
                  mode='aspectFill'
                />
                <View className='active_view_main_list_item_info'>
                  <View className='active_view_main_list_item_info_name'>
                    {item?.activityTitle}
                    <Text className='active_view_main_list_item_info_name_tag'>{item?.activityType == 0 ? '非官方' : '官方'}</Text>
                  </View>
                  <View className='active_view_main_list_item_info_tags'></View>
                  <View className='active_view_main_list_item_info_time'>
                    时间：{item?.startTime}
                  </View>
                  {
                    item?.locationInfo ? (
                      <View className='active_view_main_list_item_info_address'>
                        地点：{item.locationInfo}
                      </View>
                    ) : null
                  }
                  <View
                    className='active_view_main_list_item_info_action'
                    onClick={()=>{onEnroll(item?.activityCode)}}
                  >
                    报名
                  </View>
                </View>
              </View>
            )
          }
        </View>
        <View className='active_view_main_title'>
          已结束
        </View>
      </View>

    </View>
  )
}

export default Mine;
