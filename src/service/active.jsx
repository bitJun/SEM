import {
  requestBaseUrl
} from '@config'
import { baseRequest } from '@utils/request';

/**
 * 查询线下活动列表
 * @param {*} data 
 * @returns 
 */
const queryOfflineActivityList = (data) => {
  return baseRequest({
		url: `${requestBaseUrl}/offlineActivity/list`,
		method: 'POST',
    contentType: 'application/json',
		data
	})
}

/**
 * 查询活动详情
 * @param {*} data 
 * @returns 
 */
const queryOfflineActivityInfo = (activityCode) => {
  return baseRequest({
		url: `${requestBaseUrl}/offlineActivity/detail/${activityCode}`,
		method: 'GET'
	})
}

/**
 * 活动报名
 * @param {*} data 
 * @returns 
 */
const postOfflineActivityEnroll = (data) => {
  return baseRequest({
		url: `${requestBaseUrl}/offlineActivity/enroll`,
		method: 'POST',
    contentType: 'application/json',
		data
	})
}

/**
 * 同步支付结果
 * @param {*} data 
 * @returns 
 */
const postPaymentSync = (data) => {
  return baseRequest({
		url: `${requestBaseUrl}/payment/sync`,
		method: 'POST',
    contentType: 'application/json',
		data
	})
}

/**
 * 入场码相关信息
 * @param {*} data 
 * @returns 
 */
const queryOfflineEntryInfo = (activityCode) => {
  return baseRequest({
		url: `${requestBaseUrl}/offlineActivity/entryInfo/${activityCode}`,
		method: 'GET'
	})
}

/**
 * 查询我的活动列表
 * @param {*} data 
 * @returns 
 */
const queryOfflineViewMyActivities = (data) => {
  return baseRequest({
		url: `${requestBaseUrl}/offlineActivity/viewMyActivities`,
		method: 'POST',
    contentType: 'application/json',
		data
	})
}

export {
  queryOfflineActivityList,
  queryOfflineActivityInfo,
  postOfflineActivityEnroll,
	postPaymentSync,
	queryOfflineEntryInfo,
	queryOfflineViewMyActivities
}