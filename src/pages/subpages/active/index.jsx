import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  Image
} from '@tarojs/components';
import {
  AtTabs,
  AtTabsPane
} from 'taro-ui';
import Taro from '@tarojs/taro';
import {
  NavBar
} from '@components';
import { set as setGlobalData, get as getGlobalData } from '@config/global';
import {
  baseUrl
} from '@config';
import {
  queryOfflineViewMyActivities
} from '@service/active';
import './index.scss';

const Mine = () => {
  let systemInfo = getGlobalData('systemInfo');
  let rate = systemInfo.safeArea.width / 750;

  const [current, setCurrent] = useState(0);
  const [list, setList] = useState([]);
  const pageIndex = useRef(1);

  const tabList = [
    {
      title: '进行中'
    },
    {
      title: '已结束'
    }
  ]

  useEffect(()=>{
    pageIndex.current = 1;
    onLoad();
  }, [current])

  const onLoad = () => {
    let params = {
      status: current,
      pageIndex: pageIndex.current,
      pageSize: 10
    }
    queryOfflineViewMyActivities(params)
      .then(res=>{
        console.log('res', res);
        setList(res.content);
      })
  };

  const onChangeTab = (value) => {
    setCurrent(value)
  }

  const renderItem = (data, key) => {
    return (
      <View className='index_view_main_item' key={key}>
        <View className='index_view_main_item_info'>
          <Image
            src={data?.activityInfo?.activityPic}
            className='index_view_main_item_info_img'
          />
          <View className='index_view_main_item_info_main'>
            <View className='index_view_main_item_info_main_name'>
              {data?.activityInfo?.activityTitle}
            </View>
            <View className='index_view_main_item_info_main_tags'></View>
            <View className='index_view_main_item_info_main_desc'>{data?.activityInfo?.activityGuidelines}</View>
          </View>
        </View>
        <View className='index_view_main_item_title'>{current == 0 ? '活动进度传送门' : '活动回顾传送门'}</View>
        {
          current == 0 ? (
            <View className='index_view_main_item_progress'></View>
          ) : null
        }
        {
          current == 0 ? (
            <View className='index_view_main_item_tags'>
              <View className={`index_view_main_item_tags_item`}>活动同学录</View>
              <View className={`index_view_main_item_tags_item`}>参会指南</View>
              <View className={`index_view_main_item_tags_item`}>现场速照</View>
            </View>
          ) : null
        }
        {
          current == 0 ? (
            <View className='index_view_main_item_orders'>
              {
                data?.orderInfoList.map(item=>
                  <View className='index_view_main_item_orders_item' key={item?.orderSn}>
                    <View className='index_view_main_item_orders_item_detail'>
                      <View className='index_view_main_item_orders_item_detail_orderNo'>订单号 {item?.orderSn}</View>
                      <View className='index_view_main_item_orders_item_detail_Number'>座位号 {item?.deskNo}</View>
                    </View>
                    <View className='index_view_main_item_orders_item_action' onClick={()=>{showActiveCode(item?.orderSn)}}>扫码签到</View>
                  </View>  
                )
              }
            </View>
          ) : null
        }
      </View>
    )
  }

  const showActiveCode = (orderSn) => {
    Taro.navigateTo({
      url: `/pages/subpages/active/code?orderSn=${orderSn}`
    })
  }

  return (
    <View
      className='index_view content'
      style={{
        paddingTop: `calc(${systemInfo.safeArea.top}px + ${88 * rate}px)`,
      }}
    >
      <NavBar
        title='我的活动'
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
          <View className='index_view_main'>
            {
              list.map((item, index)=>{
                return (
                  renderItem(item, index)
                )
              })
            }
          </View> 
        </AtTabsPane>
        <AtTabsPane
          current={current}
          index={1}
        >
          <View className='index_view_main'>
            {
              list.map((item, index)=>{
                return (
                  renderItem(item, index)
                )
              })
            }
          </View> 
        </AtTabsPane>
      </AtTabs>
    </View>
  )
}

export default Mine;
