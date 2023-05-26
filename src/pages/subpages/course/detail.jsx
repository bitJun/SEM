import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  Input
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
  queryCoruseDetailById,
  postCourseChapterList
} from '@service/course';
import './detail.scss';

const CoruseDetail = () => {
  let systemInfo = getGlobalData('systemInfo');
  let rate = systemInfo.safeArea.width / 750;
  let params = getCurrentInstance().router.params;
  let defaultBg = `${baseUrl}bg.png`;

  const [detail, setDetail] = useState({});
  const [title, setTitle] = useState('');
  const [list, setList] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const pageIndex = useRef(1);

  useDidShow(()=>{
    onLoad();
    queryList();
  });

  const onLoad = () => {
    let id = params.id;
    queryCoruseDetailById(id)
      .then(res=>{
        setDetail(res);
      })
  }

  const queryList = () => {
    let jsonData = {
      title,
      courseId: params.id,
      pageSize: 10,
      pageIndex: pageIndex.current
    }
    postCourseChapterList(jsonData)
      .then(res=>{
        console.log('res', res)
        setList(res.content)
      })
  }

  const onShowDetail = (id) => {
    Taro.navigateTo({
      url: `/pages/subpages/chapter/index?id=${id}`
    })
  }

  const ChapterRender = (data, key) => {
    return (
      <View
        key={data?.id}
        className='coruse_view_main_list_chapter'
        onClick={()=>{onShowDetail(data?.id)}}
      >
        <View className='coruse_view_main_list_chapter_title'>
          <View className='coruse_view_main_list_chapter_title_num'>
            {key + 1}
          </View>
          {data?.courseChapterTitle}
        </View>
        <View className='coruse_view_main_list_chapter_other'>
          {data?.createTime}
          <View className='coruse_view_main_list_chapter_other_view'>
            <Image
              src={`${baseUrl}pageView.png`}
              className='coruse_view_main_list_chapter_other_view_icon'
              mode='widthFix'
            />
            {data?.views}
          </View>
        </View>
      </View>
    )
  }

  const SegmentationRender = (data, key) => {
    return (
      <View
        key={data?.id}
        className='coruse_view_main_list_segmentation'
        onClick={()=>{onShowDetail(data?.id)}}
      >
        <View className='coruse_view_main_list_segmentation_title'>
          <View className='coruse_view_main_list_segmentation_title_num'>{key + 1}</View>
          {data?.courseChapterTitle}
        </View>
        <View className='coruse_view_main_list_segmentation_info'>
          {data?.createTime}
          <View className='coruse_view_main_list_segmentation_info_detail'>
            <Image
              src={`${baseUrl}pageView.png`}
              className='coruse_view_main_list_segmentation_info_detail_icon'
            />
            {data?.views}
          </View>
        </View>
        {
          data?.lecturerInfo ? (
            <View className='coruse_view_main_list_segmentation_person'>
              <View className='coruse_view_main_list_segmentation_person_info'>
                <Image
                  className='coruse_view_main_list_segmentation_person_info_logo'
                  src={data?.lecturerInfo?.avatarUrl}
                  mode='aspectFill'
                />
                <View className='coruse_view_main_list_segmentation_person_info_main'>
                  <View className='coruse_view_main_list_segmentation_person_info_main_name'>
                    {data?.lecturerInfo?.name}
                    <View className='coruse_view_main_list_segmentation_person_info_main_name_class'>{detail?.lecturerInfo?.classes}</View>
                  </View>
                  <View className='coruse_view_main_list_segmentation_person_info_main_desc'>
                    {data?.lecturerInfo?.lectureProfile}
                  </View>
                </View>
              </View>
            </View>
          ) : null
        }
      </View>
    )
  }

  return (
    <View
      className='coruse_view'
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
          top: 0,
          paddingTop: `calc(${systemInfo.safeArea.top}px + ${88 * rate}px)`,
          boxSizing: 'border-box',
          width: '100%',
          zIndex: 999
        }}
        scrollY={true}
        className='container'
      >
        <View className='coruse_view_main'>
          <View className='coruse_view_main_info'>
            <Image
              src={detail?.coursePic}
              className='coruse_view_main_info_img'
              mode='aspectFit'
            />
            <View className='coruse_view_main_info_detail'>
              <View className='coruse_view_main_info_detail_title'>
                {detail?.courseName}
                {/* <View className='coruse_view_main_info_detail_title_tag'></View> */}
              </View>
              <View className='coruse_view_main_info_detail_desc'>{detail?.description}</View>
              <View className='coruse_view_main_info_detail_tags'>
                <View className='coruse_view_main_info_detail_tags_item'>
                  <View className='coruse_view_main_info_detail_tags_item_type'>最新更新</View>
                  <View className='coruse_view_main_info_detail_tags_item_value'>{detail?.chapterUpdateTime}</View>
                </View>
                <View className='coruse_view_main_info_detail_tags_item'>
                  <View className='coruse_view_main_info_detail_tags_item_type'>总打卡</View>
                  <View className='coruse_view_main_info_detail_tags_item_value'>{detail?.clockedQuantity}</View>
                </View>
              </View>
            </View>
          </View>
          {
            detail?.courseType == 0 && detail?.lecturerInfo ? (
              <View className='coruse_view_main_person'>
                <View className='coruse_view_main_person_info'>
                  <Image
                    className='coruse_view_main_person_info_logo'
                    src={detail?.lecturerInfo?.avatarUrl}
                    mode='aspectFill'
                  />
                  <View className='coruse_view_main_person_info_main'>
                    <View className='coruse_view_main_person_info_main_name'>
                      {detail?.lecturerInfo?.name}
                      <View className='coruse_view_main_person_info_main_name_class'>{detail?.lecturerInfo?.classes}</View>
                    </View>
                    <View className='coruse_view_main_person_info_main_desc'>
                      {detail?.lecturerInfo?.lectureProfile}
                    </View>
                  </View>
                </View>
              </View>
            ) : null
          }
          <View className='coruse_view_main_search'>
            <Input
              placeholder='搜索内容'
              className='coruse_view_main_search_value'
            />
          </View>
          <View className='coruse_view_main_sort'>
            <Image
              src={`${baseUrl}sort.png`}
              className='coruse_view_main_sort_icon'
            />
            从旧到新
            <View className='coruse_view_main_sort_num'>共{detail?.chapterInfoList?.length || 0}章</View>
          </View>
          <View className='coruse_view_main_list'>
            {
              list.map((item, index)=>{
                if (detail?.courseType == 0) {
                  return (
                    ChapterRender(item, index)
                  )
                } else {
                  return (
                    SegmentationRender(item, index)
                  )
                }
              })
            }
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default CoruseDetail;
