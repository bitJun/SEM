import {
  requestBaseUrl
} from '@config'
import { baseRequest } from '@utils/request';

/**
 * 问题反馈
 * @param {*} data 
 * @returns 
 */
const postUserFeedback = (data) => {
  return baseRequest({
		url: `${requestBaseUrl}/feedback`,
		method: 'POST',
		data
	})
}

/**
 * 查询常见问题列表
 * @param {*} data 
 * @returns 
 */
const queryFaqList = (data) => {
  return baseRequest({
		url: `${requestBaseUrl}/faq/list`,
		method: 'GET',
		data
	})
}

/**
 * 取消点赞
 * @param {*} data 
 * @returns 
 */
const postUgcCancelLike = (data) => {
  return baseRequest({
		url: `${requestBaseUrl}/ugc/cancelLike`,
		method: 'POST',
		data
	})
}

/**
 * 评论消息
 * @param {*} data 
 * @returns 
 */
const postUgcComment = (data) => {
  return baseRequest({
		url: `${requestBaseUrl}/ugc/comment`,
		method: 'POST',
		data
	})
}

/**
 * 查询评论消息列表
 * @param {*} data 
 * @returns 
 */
const postUgcCommentDetail = (data) => {
  return baseRequest({
		url: `${requestBaseUrl}/ugc/comment/detail`,
		method: 'POST',
		data
	})
}

/**
 * 点赞消息
 * @param {*} data 
 * @returns 
 */
const postUgcLike = (data) => {
  return baseRequest({
		url: `${requestBaseUrl}/ugc/like`,
		method: 'POST',
		data
	})
}

/**
 * 查询消息列表
 * @param {*} data 
 * @returns 
 */
const postUgcList = (data) => {
  return baseRequest({
		url: `${requestBaseUrl}/ugc/list`,
		method: 'POST',
		data
	})
}

/**
 * 发布消息
 * @param {*} data 
 * @returns 
 */
const postUgcPublish = (data) => {
  return baseRequest({
		url: `${requestBaseUrl}/ugc/publish`,
		method: 'POST',
		data
	})
}

/**
 * 回复评论消息
 * @param {*} data 
 * @returns 
 */
const postUgcReply = (data) => {
  return baseRequest({
		url: `${requestBaseUrl}/ugc/reply`,
		method: 'POST',
		data
	})
}

export {
  postUserFeedback,
  queryFaqList,
  postUgcCancelLike,
  postUgcComment,
  postUgcCommentDetail,
  postUgcLike,
  postUgcList,
  postUgcPublish,
  postUgcReply
}