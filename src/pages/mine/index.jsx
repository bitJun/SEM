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
  queryUser
} from '@service/member';
import {
  baseUrl
} from '@config';
import './index.scss';

const Mine = () => {
  let systemInfo = getGlobalData('systemInfo');
  let rate = systemInfo.safeArea.width / 750;
  const defaultImage = `${baseUrl}defaultAvatarUrl.png`;

  const [detail, setDetail] = useState({});

  useDidShow(()=>{
    onLoadData();
  })

  const onLoadData = () => {
    queryUser()
      .then(res=>{
        console.log('res', res);
        setDetail(res);
      })
  }

  const goUrl = (url) => {
    Taro.navigateTo({
      url
    })
  }

  return (
    <View
      className='mine_view'
      style={{
        paddingTop: `calc(${systemInfo.safeArea.top}px + ${88 * rate}px)`,
      }}
    >
      <NavBar
        title='个人主页'
        showBack={false}
        bgColor="transparent"
        color="#000000"
      />
      <View className='mine_view_main'>
        <View className='mine_view_main_info'>
          <View className='mine_view_main_info_section'>
            <Image
              src={detail?.avatarUrl || defaultImage}
              className='mine_view_main_info_section_logo'
            />
            <View className='mine_view_main_info_section_detail'>
              <View className='mine_view_main_info_section_detail_name'>
                {detail?.platformName}
                {
                  detail?.classes ? (
                    <Text className='mine_view_main_info_section_detail_name_class'>{detail?.classes}</Text>
                  ) : null
                }
              </View>
              <View className='mine_view_main_info_section_detail_tags'>
                <View className='mine_view_main_info_section_detail_tags_item'>
                  <Image
                    src={`${baseUrl}mine/sex.png`}
                    className='mine_view_main_info_section_detail_tags_item_icon'
                  />
                  28
                </View>
                <View className='mine_view_main_info_section_detail_tags_item'>天蝎座</View>
                <View className='mine_view_main_info_section_detail_tags_item'>{detail?.area}</View>
              </View>
            </View>
          </View>
          <View className='mine_view_main_info_actions'>
            <View className='mine_view_main_info_actions_item' onClick={()=>{goUrl('/pages/subpages/user/businessCard')}}>
              <Image
                src={`${baseUrl}mine/mingpian.png`}
                className='mine_view_main_info_actions_item_icon mingpian'
              />
              <View className='mine_view_main_info_actions_item_text'>我的名片</View>
            </View>
            <View className='mine_view_main_info_actions_item' onClick={()=>{goUrl('/pages/subpages/rights/index')}}>
              <Image
                src={`${baseUrl}mine/rights.png`}
                className='mine_view_main_info_actions_item_icon rights'
              />
              <View className='mine_view_main_info_actions_item_text'>我的权益</View>
            </View>
            <View className='mine_view_main_info_actions_item' onClick={()=>{goUrl('/pages/subpages/active/index')}}>
              <Image
                src={`${baseUrl}mine/active.png`}
                className='mine_view_main_info_actions_item_icon active'
              />
              <View className='mine_view_main_info_actions_item_text'>我的活动</View>
            </View>
          </View>
        </View>
        <View className='mine_view_main_actions'>
          <View
            className='mine_view_main_actions_item'
            onClick={()=>{goUrl('/pages/subpages/invoice/index')}}
          >
            <Image
              src={`${baseUrl}mine/fapiao.png`}
              className='mine_view_main_actions_item_icon fapiao'
            />
            开发票
            <Image
              src={`${baseUrl}more.png`}
              className='mine_view_main_actions_item_more'
            />
          </View>
          <View
            className='mine_view_main_actions_item'
            // onClick={()=>{goUrl('/pages/subpages/bill/index')}}
          >
            <Image
              src={`${baseUrl}mine/agree.png`}
              className='mine_view_main_actions_item_icon agree'
            />
            平台协议
            <Image
              src={`${baseUrl}more.png`}
              className='mine_view_main_actions_item_more'
            />
          </View>
          <View className='mine_view_main_actions_item'>
            <Image
              src={`${baseUrl}mine/question.png`}
              className='mine_view_main_actions_item_icon question'
            />
            常见问题
            <Image
              src={`${baseUrl}more.png`}
              className='mine_view_main_actions_item_more'
            />
          </View>
          <View className='mine_view_main_actions_item'>
            <Image
              src={`${baseUrl}mine/callback.png`}
              className='mine_view_main_actions_item_icon callback'
            />
            问题反馈
            <Image
              src={`${baseUrl}more.png`}
              className='mine_view_main_actions_item_more'
            />
          </View>
          <View className='mine_view_main_actions_item'>
            <Image
              src={`${baseUrl}mine/callback.png`}
              className='mine_view_main_actions_item_icon callback'
            />
            扫码
            <Image
              src={`${baseUrl}more.png`}
              className='mine_view_main_actions_item_more'
            />
          </View>
        </View>
      </View>
    </View>
  )
}

export default Mine;
