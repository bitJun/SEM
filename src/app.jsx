import React, { Component } from "react";
import Taro, { useDidShow } from "@tarojs/taro";
import { Provider } from 'react-redux';
import stores from '@stores'
import { set as setGlobalData, get as getGlobalData } from '@config/global';
import { weappConfig } from '@config';
import "./app.scss";

const App = (props) => {
	useDidShow(()=>{
    let environment = Taro.getEnv();
    getSystemInfo();
    switch (environment) {
			case 'WEAPP':
				if (weappConfig.openUpdate) {
					updateVersion() // 是否强制更新
				}
				if (weappConfig.watchNet) {
					watchNet()
				}
				break
		}
	});
  const getSystemInfo =()=> {
    let systemInfo = getGlobalData('systemInfo');
    if (!systemInfo) {
      Taro.getSystemInfoAsync({
        success (res) {
          setGlobalData('systemInfo', res)
        }
      });
    }
  }
  const updateVersion =()=> {
		const updateManager = Taro.getUpdateManager()
		updateManager.onCheckForUpdate(function (res) {
		  // 是否有新的版本
		})
		updateManager.onUpdateReady(function () {
			Taro.showModal({
				title: '更新提示',
				content: '新版本已经准备好，现重启更新！',
				showCancel: false,
				confirmColor: '#FF3377',
				cancelColor: '#666666',
				success: () => {
					updateManager.applyUpdate()
				}
			})
		})
		updateManager.onUpdateFailed(function () {
			// 新的版本下载失败
			Tips.error('新版本更新失败')
		})
	}
  const watchNet =()=> { // 监听网络变化
		Taro.onNetworkStatusChange(function (res) {
			if (!res.isConnected) {
			Tips.confirm('网络提示', '当前网络不可用，请检查网络后，重启小程序！')
			}
			if (res.networkType === '2g' || res.networkType === '3g') {
			Tips.confirm('网络提示', '当前网络慢，请稍后重试')
			}
		})
		Taro.getNetworkType({
			success(res) {
			const networkType = res.networkType
			if (networkType === 'none') {
				Tips.confirm('网络提示', '当前网络不可用，请检查网络后，重启小程序！')
			}
			}
		})
	}
  return (
		<Provider store={stores}>
			{props.children}
		</Provider>
	)
}

export default App;
