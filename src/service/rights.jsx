import {
  requestBaseUrl
} from '@config'
import { baseRequest } from '@utils/request';

const queryUserRightsList = (data) => {
  return baseRequest({
		url: `${requestBaseUrl}/user_right/list`,
		method: 'get',
		data
	})
}

export {
  queryUserRightsList
}