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
  queryCourseClassificationList
} from '@service/course';
import {
  baseUrl
} from '@config';
import './index.scss';

const Mine = () => {
  let systemInfo = getGlobalData('systemInfo');
  let rate = systemInfo.safeArea.width / 750;
  const [list, setList] = useState([]);

  useEffect(()=>{
    onLoadData();
  }, [])

  const onLoadData = () => {
    queryCourseClassificationList()
      .then(res=>{
        setList(res);
      })
  }

  const showDetail = (id) => {
    Taro.navigateTo({
      url: `/pages/subpages/course/detail?id=${id}`
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
        title='线上课程'
        showBack={true}
        bgColor="transparent"
        color="#000000"
      />
      <View className='index_view_bg'></View>
      <View className='index_view_main'>
        <Image
          src={`${baseUrl}course_banner.png`}
          className='index_view_main_banner'
        />
        {
          list && list.map(item=>
            <View key={item?.sort}>
              <View className='index_view_main_title'>{item?.courseClassificationName}</View>
              <View className='index_view_main_list'>
                {
                  item?.courseInfoList.map(json=>
                    <View
                      className='index_view_main_list_item'
                      key={json?.id}
                      onClick={()=>{showDetail(json.id)}}
                    >
                      <Image
                        src={json?.coursePic}
                        className='index_view_main_list_item_img'
                        mode='aspectFit'
                      />
                      <View className='index_view_main_list_item_name'>{json?.courseTitle}</View>
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
