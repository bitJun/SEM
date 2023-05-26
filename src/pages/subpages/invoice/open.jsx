import React, { useEffect, useState } from 'react';
import {
  View,
  Input
} from '@tarojs/components';
import {
  AtTabs,
  AtTabsPane
} from 'taro-ui';
import Taro, { getCurrentInstance } from '@tarojs/taro';
import {
  NavBar
} from '@components';
import { set as setGlobalData, get as getGlobalData } from '@config/global';
import {
  baseUrl
} from '@config';
import {
  postApplyInvoice
} from '@service/invoice';
import './open.scss';

const OpenBill = () => {
  let systemInfo = getGlobalData('systemInfo');
  let rate = systemInfo.safeArea.width / 750;

  const [current, setCurrent] = useState(0);
  const [detail, setDetail] = useState({
    address: "",
    bankNo: "",
    companyName: "",
    customName: "",
    depositBank: "",
    orderId: 0,
    phone: "",
    taxIdentityNo: "",
    type: 1,
    userId: 0
  })

  const tabList = [
    {
      title: '个人发票'
    },
    {
      title: '普通增值税发票'
    },
    {
      title: '专用增值税发票'
    }
  ]

  const onChangeTab = (value) => {
    let params = {...detail};
    params.type = Number(value) + 1;
    setCurrent(value);
    setDetail(params);
  }

  const onChange = (key, event) => {
    let params = {...detail};
    let value = event.target.value;
    params[key] = value;
    setDetail(params);
  }

  const onSubmit = () => {
    let params = getCurrentInstance().router.params;
    detail.orderId = params.orderId;
    if (current == 0) {
      if (!detail.customName) {
        Taro.showToast({
          title: '请输入客户姓名',
          icon: 'none'
        });
        return;
      }
      if (!detail.phone) {
        Taro.showToast({
          title: '请输入手机号',
          icon: 'none'
        });
        return;
      }
    }
    if (current == 1) {
      if (!detail.companyName) {
        Taro.showToast({
          title: '请输入公司名称',
          icon: 'none'
        });
        return;
      }
      if (!detail.phone) {
        Taro.showToast({
          title: '请输入手机号',
          icon: 'none'
        });
        return;
      }
    }
    if (current == 2) {
      if (!detail.companyName) {
        Taro.showToast({
          title: '请输入公司名称',
          icon: 'none'
        });
        return;
      }
      if (!detail.taxIdentityNo) {
        Taro.showToast({
          title: '请输入纳税识别号',
          icon: 'none'
        });
        return;
      }
      if (!detail.depositBank) {
        Taro.showToast({
          title: '请输入开户银行',
          icon: 'none'
        });
        return;
      }
      if (!detail.bankNo) {
        Taro.showToast({
          title: '请输入银行卡号',
          icon: 'none'
        });
        return;
      }
      if (!detail.address) {
        Taro.showToast({
          title: '请输入地址',
          icon: 'none'
        });
        return;
      }
    }
    postApplyInvoice(detail)
      .then(res=>{
        Taro.showModal({
          title: '发票提交成功',
          content: '发票将在3个工作日之内开具请至开发票页面查看',
          showCancel: false,
          confirmColor: '#4F89F0',
          confirmText: '我知道了'
        });
      });
  }

  return (
    <View
      className='open_view content'
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
      <AtTabs
        current={current}
        tabList={tabList}
        onClick={(e)=>{onChangeTab(e)}}
      >
        <AtTabsPane
          current={current}
          index={0}
        >
          <View className='open_view_main'>
            <View className='open_view_main_item'>
              <View className='open_view_main_item_label'>客户姓名</View>
              <Input
                className='open_view_main_item_value'
                placeholder='请输入'
                placeholderClass='placeholder'
                value={detail?.customName}
                onInput={(e)=>{onChange('customName', e)}}
              />
            </View>
            <View className='open_view_main_item'>
              <View className='open_view_main_item_label'>手机号</View>
              <Input
                className='open_view_main_item_value'
                placeholder='请输入'
                placeholderClass='placeholder'
                value={detail?.phone}
                onInput={(e)=>{onChange('phone', e)}}
              />
            </View>
            <View className='open_view_main_action' onClick={()=>{onSubmit()}}>
              <View className='open_view_main_action_main'>提交</View>
            </View>
          </View>
        </AtTabsPane>
        <AtTabsPane
          current={current}
          index={1}
        >
          <View className='open_view_main'>
            <View className='open_view_main_item'>
              <View className='open_view_main_item_label'>公司名称</View>
              <Input
                className='open_view_main_item_value'
                placeholder='请输入'
                placeholderClass='placeholder'
                value={detail?.companyName}
                onInput={(e)=>{onChange('companyName', e)}}
              />
            </View>
            <View className='open_view_main_item'>
              <View className='open_view_main_item_label'>手机号</View>
              <Input
                className='open_view_main_item_value'
                placeholder='请输入'
                placeholderClass='placeholder'
                value={detail?.phone}
                onInput={(e)=>{onChange('phone', e)}}
              />
            </View>
            <View className='open_view_main_action' onClick={()=>{onSubmit()}}>
              <View className='open_view_main_action_main'>提交</View>
            </View>
          </View>
        </AtTabsPane>
        <AtTabsPane
          current={current}
          index={2}
        >
          <View className='open_view_main'>
            <View className='open_view_main_item'>
              <View className='open_view_main_item_label'>公司名称</View>
              <Input
                className='open_view_main_item_value'
                placeholder='请输入'
                value={detail?.companyName}
                placeholderClass='placeholder'
                onInput={(e)=>{onChange('companyName', e)}}
              />
            </View>
            <View className='open_view_main_item'>
              <View className='open_view_main_item_label'>纳税人识别号</View>
              <Input
                className='open_view_main_item_value'
                placeholder='请输入'
                placeholderClass='placeholder'
                value={detail?.taxIdentityNo}
                onInput={(e)=>{onChange('taxIdentityNo', e)}}
              />
            </View>
            <View className='open_view_main_item'>
              <View className='open_view_main_item_label'>开户银行</View>
              <Input
                className='open_view_main_item_value'
                value={detail?.depositBank}
                placeholder='请输入'
                placeholderClass='placeholder'
                onInput={(e)=>{onChange('depositBank', e)}}
              />
            </View>
            <View className='open_view_main_item'>
              <View className='open_view_main_item_label'>银行卡号</View>
              <Input
                className='open_view_main_item_value'
                value={detail?.bankNo}
                placeholder='请输入'
                placeholderClass='placeholder'
                onInput={(e)=>{onChange('bankNo', e)}}
              />
            </View>
            <View className='open_view_main_item'>
              <View className='open_view_main_item_label'>地址</View>
              <Input
                className='open_view_main_item_value'
                placeholder='请输入'
                value={detail?.address}
                placeholderClass='placeholder'
                onInput={(e)=>{onChange('address', e)}}
              />
            </View>
            <View className='open_view_main_action' onClick={()=>{onSubmit()}}>
              <View className='open_view_main_action_main'>提交</View>
            </View>
          </View>
        </AtTabsPane>
      </AtTabs>
    </View>
  )
}

export default OpenBill;
