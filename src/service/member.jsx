import {
  requestBaseUrl
} from '@config'
import { baseRequest } from '@utils/request';

const postPayToMember = (data) => {
  return baseRequest({
		url: `${requestBaseUrl}/user/payToMember`,
		method: 'POST',
    contentType: 'application/json',
		data
	})
}

const queryUser = (data) => {
  return baseRequest({
		url: `${requestBaseUrl}/user`,
		method: 'GET',
    data
	})
}

const putEditPublic = (data) => {
  return baseRequest({
		url: `${requestBaseUrl}/user/editPublic`,
		method: 'POST',
    contentType: 'application/json',
		data
	})
}

const querySearch = (data) => {
  return baseRequest({
		url: `${requestBaseUrl}/user/search`,
		method: 'GET',
    data
	})
}

const queryVisitOther = (data) => {
  return baseRequest({
		url: `${requestBaseUrl}/user/visitOther`,
		method: 'GET',
    data
	})
}

const queryOtherUser = (data) => {
  return baseRequest({
		url: `${requestBaseUrl}/user/otherDetail`,
		method: 'GET',
    data
	})
}

const putUser = (data) => {
  return baseRequest({
		url: `${requestBaseUrl}/user`,
		method: 'PUT',
		contentType: 'application/json',
    data
	})
}

const queryDictdataList = (data) => {
  return baseRequest({
		url: `${requestBaseUrl}/dictdata/list`,
		method: 'GET',
    data
	})
}

export {
  postPayToMember,
  queryUser,
  putEditPublic,
  querySearch,
  queryVisitOther,
	queryOtherUser,
	putUser,
	queryDictdataList
}