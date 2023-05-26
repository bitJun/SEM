import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  Input,
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
  querySearch
} from '@service/member';
import './index.scss';

const Member = () => {
  let systemInfo = getGlobalData('systemInfo');
  let rate = systemInfo.safeArea.width / 750;
  const [keyword, setKeyword] = useState('');
  const pageIndex = useRef(1);
  const pageSize = useRef(10);
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useDidShow(()=>{
    onLoad();
  });

  const onLoad = () => {
    let params = {
      pageIndex: pageIndex.current,
      pageSize: pageSize.current,
    }
    querySearch(params)
      .then(res=>{
        console.log('res', res);
        setTotal(res.totalRecords);
        setList(res.content);
      })
  }

  const onChange = (event) => {
    let value = event.target.value;
    setKeyword(value)
  }

  const showMember = (id) => {
    Taro.navigateTo({
      url: `/pages/subpages/user/businessCard?id=${id}`
    });
  }

  return (
    <View
      className='member_view'
      style={{
        paddingTop: `calc(${systemInfo.safeArea.top}px + ${88 * rate}px)`,
      }}
    >
      <NavBar
        title='会员库'
        showBack={false}
        bgColor="transparent"
        color="#000000"
      />
      <View className='member_view_search'>
        <Image
          src={`${baseUrl}search.png`}
          className='member_view_search_icon'
          mode='widthFix'
        />
        <Input
          value={keyword}
          onInput={(e)=>{onChange(e)}}
          className='member_view_search_value'
          placeholder='想链接的关键词'
          placeholderClass='placeholder'
        />
      </View>
      {/* <View className='member_view_selects'>
        <View className={`member_view_selects_item`}>
          不限行业
          <Image
            src={`${baseUrl}down.png`}
            className='member_view_selects_item_icon'
            mode='widthFix'
          />
        </View>
        <View className={`member_view_selects_item`}>
          不限地区
          <Image
            src={`${baseUrl}down.png`}
            className='member_view_selects_item_icon'
            mode='widthFix'
          />
        </View>
        <View className={`member_view_selects_item`}>
          不限营收
          <Image
            src={`${baseUrl}down.png`}
            className='member_view_selects_item_icon'
            mode='widthFix'
          />
        </View>
        <View className={`member_view_selects_item active`}>
          不限职级
          <Image
            src={`${baseUrl}down.png`}
            className='member_view_selects_item_icon'
            mode='widthFix'
          />
        </View>
      </View>
      <View className='member_view_section'>
        <View className='member_view_section_title'>TA有以下资源</View>
        <View className='member_view_section_list'>
          {
            [1,2,3,4,5,6,7,9,8].map(item=>
              <View className={`member_view_section_list_item ${item == 4 ? 'active' : ''}`}>电子商务</View>  
            )
          }
        </View>
        <View className='member_view_section_title'>TA有以下需求</View>
        <View className='member_view_section_list'>
          {
            [1,2,3,4,5,6,7,9,8].map(item=>
              <View className={`member_view_section_list_item ${item == 4 ? 'active' : ''}`}>电子商务</View>  
            )
          }
        </View>
      </View>
      <View className='member_view_action'>
        <View className='member_view_action_item'>清空</View>
        <View className='member_view_action_item active'>搜索</View>
      </View> */}
      <View className='member_view_list'>
        <View className='member_view_list_title'>找到{total}位会员</View>
        {
          list && list.map(item=>
            <View
              className='member_view_list_item'
              key={item?.id}
              onClick={()=>{showMember(item?.id)}}
            >
              <View className='member_view_list_item_info'>
                <Image
                  src={item?.avatarUrl}
                  className='member_view_list_item_info_logo'
                />
                <View className='member_view_list_item_info_main'>
                  <View className='member_view_list_item_info_main_name'>{item?.platformName}</View>
                  <View className='member_view_list_item_info_main_desc'>
                    <Image
                      src={`${baseUrl}sex.png`}
                      className='member_view_list_item_info_main_desc_icon'
                    />
                    {item?.area} | {item?.industry}·{item?.position}
                  </View>
                </View>
              </View>
              <View className='member_view_list_item_tags'>
                {
                  [1,2,3,4].map(item=> 
                    <View className='member_view_list_item_tags_item' key={item}>
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

export default Member;
