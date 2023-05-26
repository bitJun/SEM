import React, { useEffect, useState } from 'react';
import {
  View,
  Input,
  Image,
  ScrollView,
  Text
} from '@tarojs/components';
import {
  NavBar
} from '@components';
import {
  baseUrl
} from '@config';
import './index.scss';

const Index = () => {
  const [keyword, setKeyword] = useState('');

  const onChange = (event) => {
    setKeyword(event.target.value);
  }
  return (
    <View className='index'>
      <NavBar
        showBack={false}
        bgColor="transparent"
      />
      <ScrollView
        style={{
          height: '100%',
        }}
        className='member_view'
        scrollY={true}
      >
        <Image
          src='data:image/jpeg;base64,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'
          mode='widthFix'
          className='index_img'
        />
        <View className='member_view_filter'>
          <View className='member_view_filter_search'>
            <Image
              src={`${baseUrl}searchIcon.png`}
              className='member_view_filter_search_icon'
            />
            <Input
              className='member_view_filter_search_value'
              placeholderClass='placeholder'
              placeholder='搜索会员'
              value={keyword}
              onInput={(e)=>{onChange(e)}}
            />
            {
              keyword ? (
                <Image
                  src={`${baseUrl}clear.png`}
                  className='member_view_filter_search_clear'
                />
              ) : null
            }
          </View>
          <View className='member_view_filter_action'>
            <Image
              src={`${baseUrl}filterIcon.png`}
              className='member_view_filter_action_icon'
            />
            筛选
          </View>
        </View>
        <View className='member_view_section'>
          <View className='member_view_section_title'>所有会员</View>
          <View className='member_view_list'>
            {
              [1,2,3,4,5,6,7,8,9,10].map(item=>
                <View className='member_view_list_item' key={item}>
                  <View className='member_view_list_item_user'>
                    <Image
                      src='https://gimg3.baidu.com/search/src=http%3A%2F%2Fpics0.baidu.com%2Ffeed%2F5243fbf2b2119313400bdfec2fb21adb90238dbc.jpeg%40f_auto%3Ftoken%3D818022a6f5cf52ffde05df3915e74abb&refer=http%3A%2F%2Fwww.baidu.com&app=2021&size=f360,240&n=0&g=0n&q=75&fmt=auto?sec=1683392400&t=188b1f87bb97923d00302bacbbf739ab'
                      className='member_view_list_item_user_image'
                    />
                    <View className='member_view_list_item_user_info'>
                      <View className='member_view_list_item_user_info_name'>
                        苟富贵
                        <Text className='member_view_list_item_user_info_name_desc'>广东.深圳</Text>
                      </View>
                      <View className='member_view_list_item_user_info_tag'>新式茶饮·创始人</View>
                    </View>
                  </View>
                  <View className='member_view_list_item_intro'>80后，前阿里P9，多次创业者。这是一段文字说明，这是一段文字说明，这是一段文字说明，这是一段文字说明，这是一段文字说明，这是一段文字说明。</View>
                  <View className='member_view_list_item_advantage'>
                    <View className='member_view_list_item_advantage_tag'>诉求</View>
                    破圈，找到新的增长空间
                  </View>
                  <View className='member_view_list_item_advantage'>
                    <View className='member_view_list_item_advantage_tag'>优势</View>
                    整合广告上下游产业链，全方位提供服务
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

export default Index;
