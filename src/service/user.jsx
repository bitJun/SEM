import {
  requestBaseUrl
} from '@config'
import { baseRequest } from '@utils/request';

const wxLogin = (data) => {
  return baseRequest({
		url: `${requestBaseUrl}/login`,
		method: 'POST',
    contentType: 'application/json',
		data
	})
}

export {
  wxLogin
}