import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  Video,
  ScrollView
} from '@tarojs/components';
import Taro, { useDidShow, getCurrentInstance } from '@tarojs/taro';
import { set as setGlobalData, get as getGlobalData } from '@config/global';
import {
  NavBar
} from '@components';
import {
  baseUrl
} from '@config';
import {
  postPayToMember
} from '@service/member';
import {
  postPaymentSync
} from '@service/active';
import './index.scss';

const Landing = () => {
  let params = getCurrentInstance().router.params;
  let systemInfo = getGlobalData('systemInfo');
  let rate = systemInfo.safeArea.width / 750;
  
  const onJoinMember = () => {
    let params = {
      productId: 1,
      salesPerson: ''
    }
    postPayToMember(params)
      .then(res=>{
        console.log('res', res);
        Taro.requestPayment({
          'timeStamp': res.timeStamp,
          'nonceStr': res.nonceStr,
          'package': res.packageStr,
          'signType': res.signType,
          'paySign': res.paySign,
          success: function (json) {
            console.log('json', json)
            postPaymentSync({orderSn: res.orderSn}).then({})
          },
          fail: function (json) {
            // self.setState({
            //   canPay: true
            // });
            // if (json.errMsg !== "requestPayment:fail cancel") {
            //   Taro.redirectTo({
            //     url: `/pages/order/pay/fail?orderNo=${orderNo}`
            //   });
            // }
            // if (json.errMsg == "requestPayment:fail cancel") {
            //   Taro.redirectTo({
            //     url: `/pages/order/detail/index?orderNo=${orderNo}`
            //   });
            // }
          }
        });
      });
  }

  return (
    <View>
      <NavBar
        showBack={false}
        bgColor="#3E71CC"
      />
      <ScrollView
        className='landing_view'
        style={{
          paddingTop: `calc(${systemInfo.safeArea.top}px + ${88 * rate}px)`,
        }}
        scrollY={true}
      >
        <Video
          className='landing_view_video'
          src='https://jvod.300hu.com/vod/product/bbeee199-341e-4b53-b7e5-bfeb4229df54/c4ea208d42d9482fb0581ac5071fd6f3.mp4?source=2&h265=h265/113074/e2febcdde3f34b259b997e41e6ec7350.mp4'
        />
        <View className='landing_view_info'>
          <View className='landing_view_info_intro'>
            <Text className='landing_view_info_intro_label'>“</Text>
            <View className='landing_view_info_intro_title'>这是一个</View>
            <View className='landing_view_info_intro_title'>什么样的社群？</View>
            <View className='landing_view_info_intro_desc mt18'>程前朋友圈  高质量创业者社群</View>
            <View className='landing_view_info_intro_desc'>获取商业前沿信息，结交志同道合友人，</View>
            <View className='landing_view_info_intro_desc'>实现资源高效链接，创造商业的无限可能！</View>
          </View>
        </View>
        <View className='landing_view_section'>
          <View className='landing_view_introduce'>
            <View className='landing_view_introduce_title'>
              <View className='landing_view_introduce_title_tip'>“</View>
              你将获得什么?
            </View>
            <Image
              src={`${baseUrl}landing/landingImg1.png`}
              className='landing_view_introduce_img'
              mode='widthFix'
            />
            <View className='landing_view_introduce_detail'>
              <View className='landing_view_introduce_detail_label'>
                <Text className='landing_view_introduce_detail_label_text'>1年12场</Text>
                <Text className='landing_view_introduce_detail_label_text'>私密直播</Text>
              </View>
              <View className='landing_view_introduce_detail_value'>
                <Text className='landing_view_introduce_detail_value_text'>拓展认知边界 击穿信息屏障</Text>
                <Text className='landing_view_introduce_detail_value_text'>从商业 经营战略 落地实战等多维度</Text>
                <Text className='landing_view_introduce_detail_value_text'>请各行业拿过大结果的创业者实战分享</Text>
              </View>
            </View>
            <Image
              src={`${baseUrl}landing/landingImg2.png`}
              className='landing_view_introduce_img'
              mode='widthFix'
            />
            <View className='landing_view_introduce_detail'>
              <View className='landing_view_introduce_detail_label'>
                <Text className='landing_view_introduce_detail_label_text'>门票2张</Text>
                <Text className='landing_view_introduce_detail_label_text'>面 对 面</Text>
              </View>
              <View className='landing_view_introduce_detail_value'>
                <Text className='landing_view_introduce_detail_value_text'>深度链接 同频沟通</Text>
                <Text className='landing_view_introduce_detail_value_text'>程前不定期亲临现场</Text>
              </View>
            </View>
            <Image
              src={`${baseUrl}landing/landingImg3.png`}
              className='landing_view_introduce_img'
              mode='widthFix'
            />
            <View className='landing_view_introduce_detail'>
              <View className='landing_view_introduce_detail_label'>
                <Text className='landing_view_introduce_detail_label_text'>十期课程</Text>
                <Text className='landing_view_introduce_detail_label_text'>首度公开</Text>
              </View>
              <View className='landing_view_introduce_detail_value'>
                <Text className='landing_view_introduce_detail_value_text'>程前的内容方法论 首度公开</Text>
                <Text className='landing_view_introduce_detail_value_text'>10期程前个人IP创作课</Text>
              </View>
            </View>
          </View>
          <View className='landing_view_box'>
            <View className='landing_view_box_title'><Text>+ </Text>延展权益</View>
            <View className='landing_view_box_list'>
              <View className='landing_view_box_list_item'>优先参与等贤高净值社群</View>
              <View className='landing_view_box_list_item'>优先入选破壁者大会&访谈嘉宾</View>
              <View className='landing_view_box_list_item'>加入专属会员群，1V1服务，实时跟进需求</View>
            </View>
          </View>
          <View className='landing_view_box'>
            <View className='landing_view_box_title'>
            <Text className='landing_view_box_title_label'>+ </Text>
              入会标准
            </View>
            <View className='landing_view_box_content'>
              <View className='landing_view_box_content_title'>
                <Image
                  src={`${baseUrl}check.png`}
                  className='landing_view_box_content_title_icon'
                />
                谁适合加入
              </View>
              <View className='landing_view_box_content_list'>
                <View className='landing_view_box_content_list_item'>创始人&CEO</View>
                <View className='landing_view_box_content_list_item'>合伙人&高管</View>
                <View className='landing_view_box_content_list_item'>准创业者</View>
              </View>
              <View className='landing_view_box_content_title'>
                <Image
                  src={`${baseUrl}landing/error.png`}
                  className='landing_view_box_content_title_icon'
                />
                谁不适合加入
              </View>
              <View className='landing_view_box_content_list'>
                <View className='landing_view_box_content_list_item linethrough'>纯粹为了加人、爆粉、销售的乙方服务商</View>
                <View className='landing_view_box_content_list_item linethrough'>单纯为了学习、加入的圈外人</View>
                <View className='landing_view_box_content_list_item linethrough'>入行三年以内的基础业务岗</View>
                <View className='landing_view_box_content_list_item linethrough'>无法输出行业认知、经验、资源</View>
              </View>
            </View>
          </View>
          <View className='landing_view_box'>
            <View className='landing_view_box_title'>
              <Text className='landing_view_box_title_label'>+ </Text>
              付费须知
            </View>
            <View className='landing_view_box_lists'>
              <View className='landing_view_box_lists_item'>付费后，你可以在程前朋友圈小程序查看会员内容。有效期1年，付费后立即生效。</View>
              <View className='landing_view_box_lists_item'>我们将尽力为用户提供提供安全、及时、准确、高质量的服务，但不保证一定能满足用户的要求和期望，加入前请确认风险，社群平台不提供相关保证。若发现违法行为，请及时寻求法律保护。</View>
            </View>
          </View>
        </View>
        <View className='landing_view_footer'>
          <View className='landing_view_footer_price'>
            <View className='landing_view_footer_pirce_market'>
              市场价值
              <Text className='landing_view_footer_pirce_market_line'>￥5980</Text>
            </View>
            <View className='landing_view_footer_pirce_fee'>
              ￥2980
            </View>
          </View>
          <View className='landing_view_footer_action' onClick={()=>{onJoinMember()}}>
            加入会员
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default Landing;
