import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image
} from '@tarojs/components';
import Taro, { useDidShow } from '@tarojs/taro';
import {
  NavBar
} from '@components';
import { set as setGlobalData, get as getGlobalData } from '@config/global';
import {
  queryUser,
} from '@service/member';
import {
  queryUserRightsList
} from '@service/rights';
import dayjs from 'dayjs';
import {
  baseUrl
} from '@config';
import './index.scss';

const Rights = () => {
  let systemInfo = getGlobalData('systemInfo');
  let rate = systemInfo.safeArea.width / 750;
  const [list, setList] = useState([]);
  const [detail, setDetail] = useState({});
  const [rightLabel] = useState({
    1: '会员库权益',
    2: '分享会权益',
    3: '课程权益'
  })

  useDidShow(()=>{
    onLoad();
  })

  const onLoad = () => {
    queryUser()
      .then(res=>{
        setDetail(res);
      })
    queryUserRightsList()
      .then(res=>{
        setList(res);
      });
  }

  return (
    <View
      className='rights_view content'
      style={{
        paddingTop: `calc(${systemInfo.safeArea.top}px + ${88 * rate}px)`,
      }}
    >
      <NavBar
        title='我的权益'
        showBack={true}
        bgColor="transparent"
        color="#000000"
      />
      <ScrollView
        style={{
          height: '100%',
          position: 'fixed',
          left: 0,
          top: `calc(${systemInfo.safeArea.top}px + ${88 * rate}px)`,
          width: '100%',
          zIndex: 999
        }}
        scrollY={true}
      >
        <View className='rights_view_main'>
          <View className='rights_view_main_info'>
            <View className='rights_view_main_info_title'>程前朋友圈·会员卡</View>
            <View className='rights_view_main_info_time'>
              有效期 {dayjs(detail?.startDate).format('YYYY.MM.DD')} - {dayjs(detail?.expireDate).format('YYYY.MM.DD')}  |  剩余{dayjs(detail?.expireDate).diff(dayjs(detail?.startDate), 'days') }天
            </View>
            <View className='rights_view_main_info_action'>续费</View>
          </View>
          <View className='rights_view_main_list'>
            {
              list && list.map(item=>
                <View className='rights_view_main_list_item' key={item}>
                  {
                    item?.type == 3 ? (
                      <View className='rights_view_main_list_item_info'>
                        <View className='rights_view_main_list_item_info_tip'>市场价值</View>
                        <View className='rights_view_main_list_item_info_values'>
                          <Text className='rights_view_main_list_item_info_values_unit'>￥</Text>
                          {item?.markPrice / 100}
                        </View>
                        <View className='rights_view_main_list_item_info_descs'>{rightLabel[item?.label]}</View>
                      </View>
                    ) : (
                      <View className='rights_view_main_list_item_info'>
                        <View className='rights_view_main_list_item_info_value'>
                          {item?.type == 1 ? `${item?.initialTimes}年` : `${item?.initialTimes}次`}
                          <Text className='rights_view_main_list_item_info_value_unit'>{item?.type == 1 ? '免费' : '/周'}</Text>
                        </View>
                        <View className='rights_view_main_list_item_info_desc'>{rightLabel[item?.label]}</View>
                      </View>
                    )
                  }
                  <View className='rights_view_main_list_item_detail'>
                    <View className='rights_view_main_list_item_detail_title'>{item?.title}</View>
                    <View className='rights_view_main_list_item_detail_time'>{dayjs(item?.startDate).format('YYYY.MM.DD')} - {dayjs(item?.expireDate).format('YYYY.MM.DD')}</View>
                    <View className='rights_view_main_list_item_detail_action'>去使用</View>
                  </View>
                </View>
              )
            }
          </View>
        </View>
      </ScrollView>
    </View>
  )
}
export default Rights;
