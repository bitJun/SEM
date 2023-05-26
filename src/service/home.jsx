import {
  requestBaseUrl
} from '@config'
import { baseRequest } from '@utils/request';

const queryHomePageCourseList = (data) => {
  return baseRequest({
		url: `${requestBaseUrl}/course/getHomePageCourseList`,
		method: 'POST',
    contentType: 'application/json',
		data
	})
}

const queryFindTaskstatus = (data) => {
  return baseRequest({
		url: `${requestBaseUrl}/user/findTaskstatus`,
		method: 'GET',
		data
	})
}

const updateNoviceTask = (data) => {
  return baseRequest({
		url: `${requestBaseUrl}/user/noviceTask`,
		method: 'GET',
		data
	})
}

export {
  queryHomePageCourseList,
  queryFindTaskstatus,
  updateNoviceTask
}