import React, { useState } from "react";
import {
  Button,
  View,
  Image
} from '@tarojs/components';
import Taro, { useDidShow } from '@tarojs/taro';
import { set as setGlobalData, get as getGlobalData } from '@config/global';
import {
  setStorageSync,
  getStorageSync
} from '@utils/util';
import {
  wxLogin
} from '@service/user';
import './index.scss';

const Login = () => {
  const [check, setCheck] = useState(false);
  const [encryptedData, setEncryptedData] = useState({});
  const [code, setCode] = useState(null);
  const [iv, setIv] = useState(null);

  const onGetUserInfo = (e) => {
    let {
      detail
    } = e;
    Taro.login().then(loginRes => {
      setEncryptedData(detail.encryptedData);
      setCode(loginRes.code);
      setIv(detail.iv);
    });
  }

  const onGetPhoneNumber = (e) => {
    let {
      detail
    } = e;
    let params = {};
    params.phoneCode = detail.code;
    params.encryptedData = encryptedData;
    params.iv = iv;
    params.code = code;
    doLogin(params);
  }

  const doLogin = (data) => {
    wxLogin(data)
      .then(res=>{
        setStorageSync('token', res.token);
        setStorageSync('isMembership', res.isMembership);
        if (!res.identityInfo.isMembership) {
          Taro.navigateTo({
            url: '/pages/landing/index'
          });
        } else {
          Taro.switchTab({
            url: '/pages/index/index'
          });
        }
      })
  }

  return (
    <View>
      <Button
        className='wxLogin_view_main_action'
        openType='getUserInfo'
        onGetUserInfo={(e)=>{onGetUserInfo(e)}}
      >
        微信快捷登录
      </Button>
      <Button
        className='wxLogin_view_main_action'
        openType='getPhoneNumber'
        onGetPhoneNumber={(e)=>{onGetPhoneNumber(e)}}
      >
        微信
      </Button>
    </View>
  )
}

export default Login;