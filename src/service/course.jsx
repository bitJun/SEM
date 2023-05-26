import {
  requestBaseUrl
} from '@config'
import { baseRequest } from '@utils/request';

const queryCourseClassificationList = (data) => {
  return baseRequest({
		url: `${requestBaseUrl}/course/getCourseClassificationList`,
		method: 'POST',
    contentType: 'application/json',
		data
	})
}

/**
 * 查询课程详情
 * @param {*} courseId 
 * @returns 
 */
const queryCoruseDetailById = (courseId) => {
  return baseRequest({
    url: `${requestBaseUrl}/course/detail/${courseId}`,
    method: 'GET'
  })
}

/**
 * 浏览课程章节详情
 * @param {*} chapterId 
 * @returns 
 */
const queryCoruseChapterDetailById = (chapterId) => {
  return baseRequest({
    url: `${requestBaseUrl}/course/chapter/view/${chapterId}`,
    method: 'GET'
  })
}

/**
 * 购买课程
 * @param {*} data 
 * @returns 
 */
const postCorusePurchase = (data) => {
  return baseRequest({
		url: `${requestBaseUrl}/course/purchase`,
		method: 'POST',
    contentType: 'application/json',
		data
	})
}

/**
 * 购买课程
 * @param {*} data 
 * @returns 
 */
const postCourseChapterList = (data) => {
  return baseRequest({
		url: `${requestBaseUrl}/course/getCourseChapterList`,
		method: 'POST',
    contentType: 'application/json',
		data
	})
}

export {
  queryCourseClassificationList,
  queryCoruseDetailById,
  queryCoruseChapterDetailById,
  postCorusePurchase,
  postCourseChapterList
}