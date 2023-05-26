import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image
} from '@tarojs/components';
import Taro from '@tarojs/taro';
import {
  NavBar
} from '@components';
import { set as setGlobalData, get as getGlobalData } from '@config/global';
import {
  baseUrl
} from '@config';
import './protocol.scss';

const Protocol = () => {
  let systemInfo = getGlobalData('systemInfo');
  let rate = systemInfo.safeArea.width / 750;

  const showBusinessCard = () => {
    Taro.navigateTo({
      url: '/pages/subpages/user/businessCard'
    })
  }

  return (
    <View
      className='protocol_view content'
      style={{
        paddingTop: `calc(${systemInfo.safeArea.top}px + ${88 * rate}px)`,
      }}
    >
      <NavBar
        title='平台协议'
        showBack={true}
        bgColor="transparent"
        color="#000000"
      />
      <View className='protocol_view_main'>
        <View className='protocol_view_item'>
          <Image
            src={`${baseUrl}protocol.png`}
            className='protocol_view_item_icon'
          />
          隐私保护指引
          <Image
            src={`${baseUrl}more.png`}
            className='protocol_view_item_right'
          />
        </View>
        <View className='protocol_view_item'>
          <Image
            src={`${baseUrl}privacy.png`}
            className='protocol_view_item_icon'
          />
          小程序服务协议
          <Image
            src={`${baseUrl}more.png`}
            className='protocol_view_item_right'
          />
        </View>
        <View className='protocol_view_item'>
          <Image
            src={`${baseUrl}contract.png`}
            className='protocol_view_item_icon'
          />
          程前朋友圈会员合同
          <Image
            src={`${baseUrl}more.png`}
            className='protocol_view_item_right'
          />
        </View>
      </View>
    </View>
  )
}

export default Protocol;
