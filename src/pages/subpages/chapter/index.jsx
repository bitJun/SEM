import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  Input,
  Video
} from '@tarojs/components';
import Taro, { useDidShow, getCurrentInstance } from '@tarojs/taro';
import {
  NavBar
} from '@components';
import { set as setGlobalData, get as getGlobalData } from '@config/global';
import {
  baseUrl
} from '@config';
import {
  queryCoruseChapterDetailById
} from '@service/course';
import './index.scss';

const CoruseDetail = () => {
  let systemInfo = getGlobalData('systemInfo');
  let rate = systemInfo.safeArea.width / 750;
  let params = getCurrentInstance().router.params;
  let defaultBg = `${baseUrl}bg.png`;

  const [detail, setDetail] = useState({});

  useDidShow(()=>{
    onLoad();
  });

  const onLoad = () => {
    let id = params.id;
    queryCoruseChapterDetailById(id)
      .then(res=>{
        setDetail(res);
      })
  }

  return (
    <View
      className='chapter_view content'
      style={{
        paddingTop: `calc(${systemInfo.safeArea.top}px + ${88 * rate}px)`,
        backgroundImage: `url(${detail?.coursePic || defaultBg})`
      }}
    >
      <NavBar
        title='课程详情'
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
        className='chapter_main'
      >
        <Video
          src={detail?.courseMediaUrl}
          className='chapter_main_media'
        />
        <View className='chapter_main_detail'>
          <View className='chapter_main_detail_title'>{detail?.courseChapterTitle}</View>
          <View className='chapter_main_detail_desc'>
            {detail?.createTime}
            <View className='chapter_main_detail_desc_view'>
              <Image
                src={`${baseUrl}pageView.png`}
                className='chapter_main_detail_desc_view_icon'
                mode='widthFix'
              />
              {detail?.views}
            </View>
          </View>
          {
            detail?.lecturerInfo ? (
              <View className='chapter_main_detail_user'>
                <Image
                  src={detail?.lecturerInfo?.avatarUrl}
                  className='chapter_main_detail_user_logo'
                />
                <View className='chapter_main_detail_user_info'>
                  <View className='chapter_main_detail_user_info_name'>
                    {detail?.lecturerInfo?.name}
                    <Text className='chapter_main_detail_user_info_name_tag'>{detail?.lecturerInfo?.classes}</Text>
                  </View>
                  <View className='chapter_main_detail_user_info_desc'>{detail?.lecturerInfo?.lectureProfile}</View>
                </View>
              </View>
            ) : null
          }
          <View className='chapter_main_detail_section'>
            <View className='chapter_main_detail_section_title'>内容导读</View>
            <View className='chapter_main_detail_section_desc'></View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default CoruseDetail;
