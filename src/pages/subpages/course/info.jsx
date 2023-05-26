import React, { useEffect, useState } from 'react';
import {
  View,
  Video,
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
import './info.scss';

const Mine = () => {
  let systemInfo = getGlobalData('systemInfo');
  let rate = systemInfo.safeArea.width / 750;

  return (
    <View
      className='index_view content'
      style={{
        paddingTop: `calc(${systemInfo.safeArea.top}px + ${88 * rate}px)`,
      }}
    >
      <NavBar
        title='课程详情'
        showBack={true}
        bgColor="transparent"
        color="#000000"
      />
    </View>
  )
}

export default Mine;
