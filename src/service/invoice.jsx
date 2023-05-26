import {
  requestBaseUrl
} from '@config'
import { baseRequest } from '@utils/request';

const postApplyInvoice = (data) => {
  return baseRequest({
		url: `${requestBaseUrl}/invoice/apply`,
		method: 'POST',
    contentType: 'application/json',
		data
	})
}

const queryInvoiceList = (data) => {
  return baseRequest({
		url: `${requestBaseUrl}/invoice/list`,
		method: 'GET',
	})
}

const queryInvoiceFindInvoiceStatus = (data) => {
  return baseRequest({
		url: `${requestBaseUrl}/invoice/findInvoiceStatus`,
		method: 'GET',
		data
	})
}

export {
  postApplyInvoice,
  queryInvoiceList,
  queryInvoiceFindInvoiceStatus
}