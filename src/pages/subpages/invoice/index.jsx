import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image
} from '@tarojs/components';
import Taro, { useDidShow } from '@tarojs/taro';
import {
  NavBar
} from '@components';
import { set as setGlobalData, get as getGlobalData } from '@config/global';
import {
  baseUrl
} from '@config';
import {
  postApplyInvoice,
  queryInvoiceList,
  queryInvoiceFindInvoiceStatus
} from '@service/invoice';
import './index.scss';

const Mine = () => {
  let systemInfo = getGlobalData('systemInfo');
  let rate = systemInfo.safeArea.width / 750;

  const [list, setList] = useState([]);
  const [statusText] = useState({
    0: '开发票',
    1: '开具中',
    2: '查看发票'
  })

  useDidShow(()=>{
    onLoad();
  })

  const onLoad = () => {
    queryInvoiceList()
      .then(res=>{
        setList(res);
      })
  }

  const onOpenBill = (id) => {
    Taro.navigateTo({
      url: `/pages/subpages/invoice/open?id=${id}`
    })
  }

  const onOpenInvoice = (data) => {
    let {
      orderId,
      invoiceId,
      status
    } = data;
    if (status == 0) {
      Taro.navigateTo({
        url: `/pages/subpages/invoice/open?orderId=${orderId}`
      })
    }
    if (status == 2) {
      Taro.navigateTo({
        url: `/pages/subpages/invoice/detail?invoiceId=${invoiceId}`
      })
    }
  }

  return (
    <View
      className='bill_view content'
      style={{
        paddingTop: `calc(${systemInfo.safeArea.top}px + ${88 * rate}px)`,
      }}
    >
      <NavBar
        title='开发票'
        showBack={true}
        bgColor="transparent"
        color="#000000"
      />
      <View className='bill_view_main'>
        {
          list.map(item=>
            <View className={`bill_view_main_item`} key={item}>
              <View className='bill_view_main_item_name'>
                {item?.title}
                <View className='bill_view_main_item_name_num'>x{item?.amount}</View>
              </View>
              <View className='bill_view_main_item_price'>￥{item?.actualPayAmount / 100}</View>
              <View
                className={`bill_view_main_item_action  ${item?.status == 1  ? '' : 'disable'}`}
                onClick={()=>{onOpenInvoice(item)}}
              >
                {statusText[item?.status]}
              </View>
            </View>  
          )
        }
      </View>
    </View>
  )
}

export default Mine;
