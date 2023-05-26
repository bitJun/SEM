
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image
} from '@tarojs/components';
import Taro, { useDidShow, getCurrentInstance } from '@tarojs/taro';
import {
  NavBar
} from '@components';
import { set as setGlobalData, get as getGlobalData } from '@config/global';
import {
  queryVisitOther,
  queryOtherUser,
  queryUser,
} from '@service/member';
import {
  baseUrl
} from '@config';
import './businessCard.scss';

const BusinessCard = () => {
  let params = getCurrentInstance().router.params;
  let systemInfo = getGlobalData('systemInfo');
  let rate = systemInfo.safeArea.width / 750;
  const [showWechat, setShowWechat] = useState(false);
  const [hasWechat, setHasWechat] = useState(false);
  const defaultImage = `${baseUrl}defaultAvatarUrl.png`;
  const defaultBg = `${baseUrl}bg.png`;
  const [isOwner, setIsOwner] = useState(true);
  const [detail, setDetail] = useState({});

  useDidShow(()=>{
    if (params.id) {
      onLoadData();
      setIsOwner(false)
    } else {
      onLoadSelfData()
      setIsOwner(true)
    }
  });

  const onLoadData = () => {
    queryOtherUser({userId: params.id})
      .then(res=>{
        setDetail(res);
      })
  }

  const onLoadSelfData = () => {
    queryUser()
      .then(res=>{
        setDetail(res);
      })
  }

  const onConcatUser = () => {
    Taro.showModal({
      title: '您正在尝试隐藏微信号',
      content: '隐藏微信号将会影响您和上万用户的链接，是否继续？',
      confirmColor: '#4F89F0',
      confirmText: '确认查看',
      cancelColor: 'rgba(0,0,0,0.9)',
      cancelText: '取消',
      success: function (res) {
        if (res.confirm) {
        } else if (res.cancel) {
        }
      }
    })
  }

  const onChangeWeChatStatus = () => {
    if (showWechat) {
      Taro.showModal({
        title: '您正在尝试隐藏微信号',
        content: '隐藏微信号将会影响您和上万用户的链接，是否继续？',
        confirmColor: '#4F89F0',
        confirmText: '去意已决',
        cancelColor: 'rgba(0,0,0,0.9)',
        cancelText: '放弃',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            setShowWechat(!showWechat)
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else {
      setShowWechat(!showWechat)
    }
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
        backgroundImage: `url(${detail?.avatarUrl || defaultBg})`
      }}
    >
      <View className='blur'></View>
      <NavBar
        showBack={true}
        title="我的名片"
        bgColor="transparent"
        color='#ffffff'
      />
      <View className='mine_view_main'>
        <View className='mine_view_main_user'>
          <Image
            src={detail?.avatarUrl || defaultImage}
            className='mine_view_main_user_logo'
          />
          <View className='mine_view_main_user_info'>
            <View className='mine_view_main_user_info_name'>{detail?.platformName || '-'}</View>
            <View className='mine_view_main_user_info_address'>{detail?.area || '-'}</View>
          </View>
          {
            isOwner ? (
              <View className='mine_view_main_user_action'>
                <View className='mine_view_main_user_action_item' onClick={()=>{goUrl('/pages/subpages/user/edit')}}>
                  <Image
                    src={`${baseUrl}mine/edit.png`}
                    className='mine_view_main_user_action_item_icon'
                  />
                  <Text className='mine_view_main_user_action_item_text'>完善名片</Text>
                </View>
              </View>
            ) : null
          }
        </View>
        {
          isOwner ? (
            <View className='mine_view_main_info'>
              <Image
                src={`${baseUrl}mine/wechat.png`}
                className='mine_view_main_info_wechat'
                mode='heightFix'
              />
              {showWechat ? 'zhangyishan' : '微信号不公开'}
              <View className='mine_view_main_info_action' onClick={()=>{onChangeWeChatStatus()}}>
                <Image
                  src={showWechat ? `${baseUrl}mine/eyeshow.png` : `${baseUrl}mine/eyehide.png`}
                  className='mine_view_main_info_action_icon'
                />
              </View>
            </View>
          ) : (
            <View
              className={`mine_view_main_info ${hasWechat ? '' : 'blue'}`}
              onClick={()=>{onConcatUser()}}
            >
              <Image
                src={hasWechat ? `${baseUrl}mine/wechat.png` : `${baseUrl}mine/eyeshow.png`}
                className='mine_view_main_info_wechat'
                mode='heightFix'
              />
              { hasWechat? '微信号未公开' : '查看联系方式' }
            </View>
          )
        }
        <View className='mine_view_main_detail'>
          <View className='mine_view_main_detail_baseInfo'>
            <View className='mine_view_main_detail_baseInfo_item'>
              <View className='mine_view_main_detail_baseInfo_item_title'>行业</View>
              <View className='mine_view_main_detail_baseInfo_item_value'></View>
            </View>
            <View className='mine_view_main_detail_baseInfo_item'>
              <View className='mine_view_main_detail_baseInfo_item_title'>业务类型</View>
              <View className='mine_view_main_detail_baseInfo_item_value'>{detail?.businessTypeModel?.label}</View>
            </View>
            <View className='mine_view_main_detail_baseInfo_item'>
              <View className='mine_view_main_detail_baseInfo_item_title'>公司</View>
              <View className='mine_view_main_detail_baseInfo_item_value'>{detail?.company || '-'}</View>
            </View>
            <View className='mine_view_main_detail_baseInfo_item'>
              <View className='mine_view_main_detail_baseInfo_item_title'>职位</View>
              <View className='mine_view_main_detail_baseInfo_item_value'>{detail?.positionModel?.label}</View>
            </View>
            <View className='mine_view_main_detail_baseInfo_item'>
              <View className='mine_view_main_detail_baseInfo_item_title'>营收规模</View>
              <View className='mine_view_main_detail_baseInfo_item_value'>{detail?.revenueModel?.label}</View>
            </View>
          </View>
          <View className='mine_view_main_detail_intro'>
            <View className='mine_view_main_detail_intro_title'>简介</View>
            <View className='mine_view_main_detail_intro_value'>
              {detail?.businessProfile || '-'}
            </View>
          </View>
          <View className='mine_view_main_detail_others'>
            <View className='mine_view_main_detail_others_title'>需求</View>
            <View className='mine_view_main_detail_others_tags'>
              {
                detail?.appealModelList && detail?.appealModelList.map(item=>
                  <View className='mine_view_main_detail_others_tags_item' key={item}>
                    {item?.label}
                  </View> 
                )
              }
            </View>
            <View className='mine_view_main_detail_others_title'>资源</View>
            <View className='mine_view_main_detail_others_tags'>
              {
                detail?.resourceModelList && detail?.resourceModelList.map(item=>
                  <View className='mine_view_main_detail_others_tags_item' key={item}>
                    {item?.label}
                  </View> 
                )
              } 
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

export default BusinessCard;
