import Taro from '@tarojs/taro';
import {
	getStorageSync,
	getIsWxClient,
	isAppleMobileDevice,
	isAndroidMobileDevice,
	clearStroageSync
} from '@utils/util';
const CODE_SUCCESS = 200;
const CODE_AUTH_EXPIRED = [401]; //登录失效
const systemInfo = Taro.getSystemInfoSync();
import { weappConfig } from '../config';

Taro.isNeedLogin = false;// 登录状态

/**
 * 目前浏览器端暂时不用做，只做微信H5和小程序
 * 客户端请求参数
 * @param {*} options
 */
export function baseRequest(options) {
	const { url, data, method = 'GET', showToast = true, router, contentType} = options;
	const token = getStorageSync('token');
	const header = token ? { 'token': token} : {}
	if (['POST', 'PUT'].indexOf(method) != -1 && contentType) {
		header['content-type'] = contentType
	} else{
		header['content-type'] = 'application/x-www-form-urlencoded'
	}
	header['version'] = weappConfig.version;
	const getEnv = Taro.getEnv();
	return new Promise((resolve,reject)=>{
		Taro.request({
			url: url,
			method,
			data: data,
			header
		})
		.then((res)=>{
			if (res.data.code == CODE_SUCCESS) {
				resolve(res.data.data)
			} else {
				Taro.showToast({
					title: res.data.message,
					icon: 'none'
				});
				if (CODE_AUTH_EXPIRED.indexOf(res.data.code) != -1) {
					clearStroageSync();
					Taro.redirectTo({
						url: '/pages/login/index'
					})
				}
			}
		}).catch((err)=>{
			if(err.code === CODE_AUTH_EXPIRED) {
				if(getEnv === 'WEAPP'){
					Taro.removeStorageSync('HP_TOKEN');
				}
				else{
					Taro.reLaunch({
						url: `/pages/login/register`
					});
				}
			}
			reject(err)
		})
	})
}

export const statisticsRequset = (options) => {
	const { url, data, method = 'GET', contentType} = options
	const token = getStorageSync('token');
	// const token = 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIxMTM5NzQzODc0MTU2MDk3NTg0Iiwic3ViIjoiMTU5NTcxMjc0MDgiLCJpc3MiOiJidyIsImlhdCI6MTU2MTE4NDAxNiwiZXhwIjoxNTYxNzg4ODE2fQ.W9MGmUalbjwSRmZdQHgq5SlsKoylJIGmQFuS_z8679o'
	const header = token ? { 'token': token} : {}
	header['version'] = '1.0.0';
	header['appId'] = 'BW_MALL';
	if (method === "POST" && contentType) {
		header['content-type'] = contentType
	}else{
		header['content-type'] = 'application/x-www-form-urlencoded'
	}

	// visitorSource  Integer  是  访问来源 0-未知 1-app 3-小程序 5-H5
	// terminalType  Integer  是  终端类型 0-未知，1-安卓，3-ios，5-pc
	const getEnv = Taro.getEnv();
	if(getEnv === 'WEAPP'){
		header['visitorSource'] = '3'
	}else if(getEnv === 'WEB'){
		header['visitorSource'] = '5'
	}else{
		header['visitorSource'] = '0'
	}
	if(getEnv === 'WEAPP'){
		if( systemInfo && systemInfo.system.indexOf('iOS') > -1){
			header['terminalType'] = '3'
		}else if( systemInfo && systemInfo.system.indexOf('Android') > -1){
			header['terminalType'] = '1'
		}else{
			header['terminalType'] = '5'
		}
	} else {
		if( isAppleMobileDevice() ){
			header['terminalType'] = '3'
		}else if( isAndroidMobileDevice() ){
			header['terminalType'] = '1'
		}else{
			header['terminalType'] = '5'
		}
	}
	return Taro.request({
		url: url,
		method,
		data: data,
		header
	})
}
/**
 * isToken 该接口是否需要验证token合法性，默认不验证
 * @param {*} options
 */
export default  function wxRequest(options){
	return new Promise((resolve,reject)=>{
		baseRequest(options)
		.then((res)=>{
			resolve(res)
		}).catch(err=>{
			reject(err)
		})
	})
}
