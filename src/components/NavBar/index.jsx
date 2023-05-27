import React, { useState, useCallback } from "react";
import {
  View,
  Image
} from "@tarojs/components";
import Taro, { useDidShow } from "@tarojs/taro";
import {
  baseUrl
} from '@config';
import { set as setGlobalData, get as getGlobalData } from '@config/global';
import './index.scss';

const NavBar = (props) => {

  const [systemInfo, setSystemInfo] = useState({});

  useDidShow(()=>{
    setSystemInfo(getGlobalData('systemInfo') || {})
  })
  
  const {
    bgColor = '#ffffff',
    showBack,
    title,
    backAction,
    rightActions,
    centerView,
    color = '#000000'
  } = props;

  const Back = () => {
    console.log('Back')
    Taro.navigateBack();
  }
  return (
    <View
      className="navbar_view"
      style={{
        paddingTop: `${systemInfo?.safeArea?.top}px`,
        backgroundColor: bgColor
      }}
    >
      <View className="navbar_view_main">
        {
          showBack &&
          <View className="navbar_view_back" onClick={()=>{Back()}}>
            <Image
              src={color == '#000000' ? `${baseUrl}back_black.png` : `${baseUrl}back.png`}
              className="navbar_view_back_icon"
            />
          </View>
        }
        {
          title ? (
            <View className="navbar_view_center" style={{color: color}}>{title}</View>
          ) : null
        }
        {
          centerView &&
          <View className="navbar_view_center">{centerView()}</View>
        }
        {
          rightActions &&
          <View className="navbar_view_right">{rightActions()}</View>
        }
      </View>
    </View>
  )
}
export default React.memo(NavBar);