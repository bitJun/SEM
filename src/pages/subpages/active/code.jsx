import React, { useEffect, useState } from 'react';
import {
  View,
  Image
} from '@tarojs/components';
import Taro, { useDidShow, getCurrentInstance } from '@tarojs/taro';
import {
  NavBar
} from '@components';
import { set as setGlobalData, get as getGlobalData } from '@config/global';
import {
  baseUrl
} from '@config';
import {
  queryOfflineEntryInfo
} from '@service/active';
import './code.scss';

const ActiveCode = () => {
  let systemInfo = getGlobalData('systemInfo');
  let rate = systemInfo.safeArea.width / 750;
  const [detail, setDetail] = useState({});

  useDidShow(()=>{
    onLoad();
  })

  const onLoad = () => {
    let orderSn = getCurrentInstance().router.params.orderSn;
    queryOfflineEntryInfo(orderSn)
      .then(res=>{
        setDetail(res);
      })
  }

  return (
    <View
      className='code_view content'
      style={{
        paddingTop: `calc(${systemInfo.safeArea.top}px + ${88 * rate}px)`,
      }}
    >
      <NavBar
        title='我的权益'
        showBack={true}
        bgColor="transparent"
        color="#000000"
      />
      <View className='code_view_main'>
        <View className='code_view_main_content'>
          <View className='code_view_main_content_title'></View>
          <View className='code_view_main_content_desc'></View>
          <View className='code_view_main_content_detail'>
            <Image
              src={`data:image/png;base64,${detail?.qrCode}`}
              className='code_view_main_content_detail_img'
            />
          </View>
        </View>
      </View>
    </View>
  )
}
export default ActiveCode;
