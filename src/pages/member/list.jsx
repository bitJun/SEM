import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image
} from '@tarojs/components';
import Taro from '@tarojs/taro';
import {
  NavBar
} from '@components';
import { set as setGlobalData, get as getGlobalData } from '@config/global';
import {
  baseUrl
} from '@config';
import './list.scss';

const Mine = () => {
  let systemInfo = getGlobalData('systemInfo');
  let rate = systemInfo.safeArea.width / 750;

  const showBusinessCard = () => {
    Taro.navigateTo({
      url: '/pages/subpages/user/businessCard'
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
        title='会员查找结果'
        showBack={true}
        bgColor="transparent"
        color="#000000"
      />
      <View className='index_view_list'>
        <View className='index_view_list_title'>找到4位会员</View>
        {
          [1,2,3,4,5,6,7,8,9,10].map(item=>
            <View
              className='index_view_list_item'
              key={item}
            >
              <View className='index_view_list_item_info'>
                <Image
                  src='data:image/jpeg;base64,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'
                  className='index_view_list_item_info_logo'
                />
                <View className='index_view_list_item_info_main'>
                  <View className='index_view_list_item_info_main_name'>Angelina</View>
                  <View className='index_view_list_item_info_main_desc'>
                    <Image
                      src={`${baseUrl}sex.png`}
                      className='index_view_list_item_info_main_desc_icon'
                    />
                    河北·石家庄 | 互联网·合伙人
                  </View>
                </View>
              </View>
              <View className='index_view_list_item_tags'>
                {
                  [1,2,3,4].map(item=> 
                    <View className='index_view_list_item_tags_item' key={item}>
                      新产品研发
                    </View>
                  )
                }
              </View>
            </View>  
          )
        }
      </View>
    </View>
  )
}

export default Mine;
