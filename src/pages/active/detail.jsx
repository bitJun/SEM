import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView
} from '@tarojs/components';
import Taro, { useDidShow, getCurrentInstance } from '@tarojs/taro';
import {
  AtFloatLayout
} from 'taro-ui';
import {
  NavBar
} from '@components';
import { set as setGlobalData, get as getGlobalData } from '@config/global';
import {
  baseUrl
} from '@config';
import {
  queryUserRightsList
} from '@service/rights';
import {
  queryOfflineActivityInfo,
  postOfflineActivityEnroll,
  postPaymentSync
} from '@service/active';
import './detail.scss';

const ActiveDetail = () => {
  let params = getCurrentInstance().router.params;
  let systemInfo = getGlobalData('systemInfo');
  let rate = systemInfo.safeArea.width / 750;
  const [detail, setDetail] = useState({});
  const [isOpened, setIsOpened] = useState(false);
  const [orderSn, setOrderSn] = useState('');
  const [list, setList] = useState([]);
  const [payId, setPayId] = useState(null);

  const [bgImage, setBgImage] = useState('http://image.hzymsh.com/mini/images/active_bg.png');

  useDidShow(()=>{
    let activityCode = params.activityCode;
    onInit(activityCode);
    onLoad();
  })

  const onInit = (activityCode) => {
    queryOfflineActivityInfo(activityCode)
      .then(res=>{
        console.log('res', res)
        setDetail(res);
      })
  }

  const onLoad = () => {
    queryUserRightsList()
      .then(res=>{
        setList(res);
      });
  }

  const onApply = () => {
    setIsOpened(true);
  }

  const onEnroll = () => {
    setIsOpened(false);
    let jsondata = {
      activityCode: detail.activityCode
    }
    if (detail?.activityPrice == 0) {
      jsondata.enrollType = 1;
    }
    else {
      if (payId == -1) {
        jsondata.enrollType = 1;
      } else {
        jsondata.enrollType = 2;
        jsondata.voucherId = payId
      }
    }
    postOfflineActivityEnroll(jsondata)
      .then(res=> {
        setOrderSn(res.orderSn);
        let {
          prepayResponse
        } = res;
        Taro.requestPayment({
          'timeStamp': prepayResponse.timeStamp,
          'nonceStr': prepayResponse.nonceStr,
          'package': prepayResponse.packageStr,
          'signType': prepayResponse.signType,
          'paySign': prepayResponse.paySign,
          success: function (json) {
            postPaymentSync({orderSn: res.orderSn})
              .then({})
          },
          fail: function (json) {
          }
        });
      })
  }

  const onPreviewImage = () => {
    Taro.previewImage({
      current: 'https://img95.699pic.com/desgin_photo/40192/3815_detail.jpg%21detail860/fw/820/crop/0x0a0a1309/quality/90',
      urls: ['https://img95.699pic.com/desgin_photo/40192/3815_detail.jpg%21detail860/fw/820/crop/0x0a0a1309/quality/90']
    })
  }

  const choosePayType = (id) => {
    setPayId(id);
  }

  const onCancel = () => {
    setIsOpened(false);
  }

  return (
    <View
      className='active_view content'
      style={{
        backgroundImage: `url(${detail?.activityPic})`,
        paddingTop: `calc(${systemInfo.safeArea.top}px + ${88 * rate}px)`,
      }}
    >
      <View className='blur'></View>
      <NavBar
        title='活动详情'
        showBack={true}
        bgColor="transparent"
        color="#ffffff"
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
        <View className='active_view_main'>
          <View className='active_view_main_info'>
            <Image
              src={detail?.activityPic}
              className='active_view_main_info_banner'
              mode='widthFix'
            />
            <View className='active_view_main_info_name'>
              {detail?.activityTitle}
              <Text className='active_view_main_info_name_tag'>官方</Text>
              <Text className='active_view_main_info_name_tag'>热门</Text>
            </View>
            <View className='active_view_main_info_tags'>
              <View className='active_view_main_info_tags_item'>电子商品</View>
            </View>
            <View className='active_view_main_info_intro'>
              <View className='active_view_main_info_intro_item'>时间：2023年5月13日 13:00-18:00</View>
              <View className='active_view_main_info_intro_item'>地点：陕西省-西安市</View>
              <View className='active_view_main_info_intro_item'>剩余席位：少量</View>
            </View>
            <View className='active_view_main_info_section'>
              <View className='active_view_main_info_section_title'></View>
              <View className='active_view_main_info_section_user'>
                {
                  detail.activityUserList && detail.activityUserList.map(item=>
                    <Image
                      src={item?.avatarUrl}
                      className='active_view_main_info_section_user_item'
                    />  
                  )
                }
              </View>
            </View>
          </View>
          <Image
            src='https://img95.699pic.com/desgin_photo/40192/3815_detail.jpg%21detail860/fw/820/crop/0x0a0a1309/quality/90'
            className='active_view_main_intro'
            mode='widthFix'
            onClick={()=>{onPreviewImage()}}
          />
          <View className='active_view_main_footer'>
            <View className='active_view_main_footer_detail'>
              <View className='active_view_main_footer_detail_desc'>会员独享价</View>
              <View className='active_view_main_footer_detail_price'>￥{detail?.activityPrice / 100}</View>
            </View>
            <View className='active_view_main_footer_action' onClick={()=>{onApply()}}>立即报名</View>
          </View>
        </View>
      </ScrollView>
      <AtFloatLayout
        isOpened={isOpened}
        title=''
        className='rights_view'
      >
        <View className='rights_view_header'>
          <View className='rights_view_title'>报名线下分享会</View>
          <View className='rights_view_desc'>是否消耗1张线下分享会兑换券</View>
        </View>
        <ScrollView
          className='rights_view_list'
          scrollY={true}
        >
          <View
            className={`rights_view_list_item ${payId === -1 ? 'active' : ''}`}
            onClick={()=>{choosePayType(-1)}}
          >
            <Image
              src={`${baseUrl}payIcon.png`}
              className='rights_view_list_item_icon'
            />
            <View className='rights_view_list_item_main'>
              <View className='rights_view_list_item_main_price'>￥{detail?.activityPrice / 100}</View>
              <View className='rights_view_list_item_main_desc'>不使用兑换券，直接付费报名</View>
            </View>
            {
              payId === -1 ? (
                <Image
                  src={`${baseUrl}check.png`}
                  className='rights_view_list_item_choose'
                />
              ) : null
            }
          </View>
          {
            list && list.map(item=>
              <View
                className={`rights_view_list_item ${payId === item?.id ? 'active' : ''}`}
                key={item?.id}
                onClick={()=>{choosePayType(item?.id)}}
              >
                <Image
                  src={`${baseUrl}quanIcon.png`}
                  className='rights_view_list_item_icon'
                />
                <View className='rights_view_list_item_main'>
                  <View className='rights_view_list_item_main_price'>{item?.title}</View>
                  <View className='rights_view_list_item_main_desc'></View>
                </View>
                {
                  payId === item?.id ? (
                    <Image
                      src={`${baseUrl}check.png`}
                      className='rights_view_list_item_choose'
                    />
                  ) : null
                }
              </View>
            )
          }
        </ScrollView>
        <View className='rights_view_footer'>
          <View className='rights_view_footer_item' onClick={()=>{onCancel()}}>取消</View>
          <View className='rights_view_footer_item' onClick={()=>{onEnroll()}}>报名</View>
        </View>
      </AtFloatLayout>
    </View>
  )
}

export default ActiveDetail;
