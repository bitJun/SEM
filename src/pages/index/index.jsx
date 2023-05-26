import React, { useEffect, useState } from 'react';
import Taro, { useDidShow } from '@tarojs/taro'
import {
  Button,
  View,
  Text,
  Swiper,
  SwiperItem,
  Image,
  ScrollView
} from '@tarojs/components';
import {
  AtFloatLayout
} from 'taro-ui';
import { set as setGlobalData, get as getGlobalData } from '@config/global';
import {
  setStorageSync,
  getStorageSync
} from '@utils/util';
import {
  NavBar
} from '@components';
import {
  baseUrl
} from '@config';
import {
  queryHomePageCourseList,
  queryFindTaskstatus,
  updateNoviceTask
} from '@service/home';
import {
  wxLogin
} from '@service/user';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateNeedLogin
} from '@/stores/actions/user';
import './index.scss';

const Index = () => {
  const { isNeedLogin } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isOpened, setIsOpened] = useState(false);
  const [agree, setAgree] = useState(false);
  const [courseList, setCourseList] = useState([]);
  const [taskEvolve, setTaskEvolve] = useState(0);
  const [tabs] = useState([
    {
      id: 0,
      icon: `${baseUrl}home/icon1.png`,
      name: '学习福利'
    },
    {
      id: 1,
      icon: `${baseUrl}home/icon2.png`,
      name: '资源对接'
    },
    {
      id: 2,
      icon: `${baseUrl}home/icon3.png`,
      name: '最新活动'
    },
    {
      id: 3,
      icon: `${baseUrl}home/icon4.png`,
      name: '热门资讯'
    }
  ]);
  const [stepList] = useState([
    {
      id: 0,
      name: '完善个人名片',
      desc: '更准确完善的信息能帮你更好的与其他4000多位社群成员链接'
    },
    {
      id: 1,
      name: '搜索一名会员',
      desc: '前往会员库，根据你的需要找到一位自己想链接的人'
    },
    {
      id: 2,
      name: '观看一次课程',
      desc: '找到你感兴趣的课程进行学习'
    },
    {
      id: 3,
      name: '查看一次活动',
      desc: '从活动列表选择并查看一期感兴趣的程前朋友圈活动'
    }
  ]);
  
  useDidShow(()=>{
    onLoad();
    onLoadTaskStatus();
  })

  useEffect(()=>{
    if (isOpened) {
      Taro.hideTabBar({})
    } else {
      Taro.showTabBar({})
    }
  }, [isOpened]);

  const onLoad = () => {
    queryHomePageCourseList()
      .then(res=>{
        setCourseList(res);
      })
  }

  const onLoadTaskStatus =()=> {
    queryFindTaskstatus()
      .then(res=>{
        setTaskEvolve(res.taskEvolve);
        if(res.taskEvolve < 5) {
          setIsOpened(true);
        }
      })
  }

  const onGetPhoneNumber = (e) => {
    if (!agree) {
      Taro.showToast({
        title: '请同意协议',
        icon: 'none'
      })
      return
    }
    let params = {};
    let {
      detail
    } = e;
    params.phoneCode = detail.code;
    params.encryptedData = detail.encryptedData;
    params.iv = detail.iv;
    Taro.login().then(loginRes => {
      let {code} = loginRes;
      console.log('loginRes', loginRes);
      params.code = code 
      doLogin(params);
    });
  }

  const doLogin = (request) => {
    wxLogin(request)
      .then(res=>{
        setStorageSync('token', res.token);
        setStorageSync('isMembership', res.isMembership);
        dispatch(updateNeedLogin(false));
        if (!res.isMembership) {
          Taro.navigateTo({
            url: '/pages/landing/index'
          });
        } else {
          onLoad();
          onLoadTaskStatus();
        }
      })
  }

  const onAgree = () => {
    setAgree(!agree);
  }

  const onShowAgree = (event) => {
    event.stopPropagation();
  }

  const onHandleTask = () => {
    switch (taskEvolve) {
      case 1:
        Taro.navigateTo({
          url: '/pages/subpages/user/edit?form=home'
        });
        break;
      case 2:
        Taro.switchTab({
          url: '/pages/member/index?form=home',
          success: function (res) {
            Taro.showTabBar({})
          }
        });
        break;
      case 3:

        break;
      case 4:

        break;
      case 5:
        
        break;
      default:
        break;
    }
  }

  const showMore = () => {
    Taro.navigateTo({
      url: '/pages/subpages/course/index'
    })
  }

  const showDetail = (id) => {
    Taro.navigateTo({
      url: `/pages/subpages/course/detail?id=${id}`
    })
  }

  return (
    <View>
      {/* <NavBar
        showBack={false}
        bgColor="#3E71CC"
      /> */}
      <ScrollView
        className='index_view'
        // style={{
        //   paddingTop: `calc(${systemInfo.safeArea.top}px + ${88 * rate}px)`,
        // }}
        scrollY={true}
      >
        <Swiper className='index_view_swiper'>
          <SwiperItem className='index_view_swiper_item'>
            <Image
              src={`${baseUrl}banner.png`}
              mode='widthFix'
              className='index_view_swiper_item_img'
            />
          </SwiperItem>
        </Swiper>
        <View className='index_view_main'>
          <View className='index_view_main_tab'>
            {
              tabs && tabs.map(item=>
                <View className='index_view_main_tab_item' key={item.id}>
                  <Image
                    src={item.icon}
                    className='index_view_main_tab_item_icon'
                  />
                  <View className='index_view_main_tab_item_text'>{item.name}</View>
                </View>
              )
            }
          </View>
          <View className='index_view_main_live'>
            <View className='index_view_main_live_left'>
              <View className='index_view_main_live_left_item'>
                <Image
                  src={`${baseUrl}home/live1.png`}
                  className='index_view_main_live_left_item_img'
                />
              </View>
              <View className='index_view_main_live_left_item'>
                <Image
                  src={`${baseUrl}home/live2.png`}
                  className='index_view_main_live_left_item_img'
                />
              </View>
            </View>
            <View className='index_view_main_live_right'>
              <View className='index_view_main_live_right_item'>
                <Image
                  src={`${baseUrl}home/live3.png`}
                  className='index_view_main_live_right_item_img'
                />
              </View>
            </View>
          </View>
          <View className='index_view_main_school'>
            <View className='index_view_main_school_title'>
              商学课程
              <View className='index_view_main_school_title_action' onClick={()=>{showMore()}}>
                查看更多 >
              </View>
            </View>
            <View className='index_view_main_school_list'>
              {
                courseList && courseList.map(item=>
                  <View
                    className='index_view_main_school_list_item'
                    key={item?.id}
                    onClick={()=>{showDetail(item?.id)}}
                  >
                    {/* <View className={`index_view_main_school_list_item_tag ${item == 3 ? 'black' : ''}`}>
                      {item == 3 ? '会员' : '限免'}
                    </View> */}
                    <Image
                      src={item?.coursePic}
                      className='index_view_main_school_list_item_img'
                      mode='aspectFit'
                    />
                    <View className='index_view_main_school_list_item_name'>{item?.courseTitle}</View>
                    {/* <View className='index_view_main_school_list_item_info'>
                      <View className={`index_view_main_school_list_item_info_price ${item == 3 ? 'linethrough' : ''}`}>
                        {item == 3 ? '￥199' : '会员免费'}
                      </View>
                      <View className='index_view_main_school_list_item_info_desc'>打卡111</View>
                    </View> */}
                  </View>
                )
              }
            </View>
          </View>
        </View>
      </ScrollView>
      <AtFloatLayout
        isOpened={isOpened}
        title=''
        className='new_task'
      >
        <Image
          src={`${baseUrl}home/newGift.png`}
          className='new_task_icon'
        />
        <View className='new_task_name'>
          新手<Text className='new_task_name_num'>4</Text>任务专项大礼包
        </View>
        <View className='new_task'>
          <View className='new_task_title'>欢迎加入程前朋友圈！为了帮助你更快的熟悉小程序功能，接下来有4个新人小任务，完成后你将获得专属大礼包，开始全新的体验吧！</View>
          <View className='new_task_list'>
            {
              stepList.map(item=>
                <View
                  className={`new_task_list_item ${(item.id+1) == taskEvolve ? 'active' : ''} ${(item.id+1) < taskEvolve ? 'finished' : ''}`}
                  key={item.id}
                  onClick={()=>{onHandleTask()}}
                >
                  <View className='new_task_list_item_main'>
                    <View className='new_task_list_item_main_number'>{item.id + 1}</View>
                    <View className='new_task_list_item_main_content'>
                      <View className='new_task_list_item_main_content_title'>{item.name}</View>
                      <View className='new_task_list_item_main_content_desc'>{item.desc}</View>
                    </View>
                    {
                      (item.id+1) == taskEvolve &&
                      <Image
                        src={`${baseUrl}more.png`}
                        className='new_task_list_item_main_action'
                      />
                    }
                    {
                      (item.id+1) < taskEvolve &&
                      <View className='new_task_list_item_main_status'>
                        <Image
                          src={`${baseUrl}finish.png`}
                          className='new_task_list_item_main_status_icon'
                        />
                        <Text className='new_task_list_item_main_status_text'>已完成</Text>
                      </View>
                    }
                  </View>
                </View>
              )
            }
          </View>
          <View className={`new_task_action ${taskEvolve > 4 ? 'actived' : ''}`}>领取礼包</View>
        </View>
      </AtFloatLayout>
      <AtFloatLayout
        isOpened={isNeedLogin}
        title=''
        className='needlogin_main'
      >
        <View className='wxLogin_view'>
          <View className='wxLogin_view_info'>
            <Image
              src={`${baseUrl}logo.png`}
              className='wxLogin_view_info_logo'
            />
          </View>
          <View className='wxLogin_view_main'>
            <View className='wxLogin_view_main_title'>欢迎加入程前朋友圈</View>
            <View className='wxLogin_view_main_desc'>体验全新会员小程序，抢新人限时福利</View>
            <Button
              className='wxLogin_view_main_action'
              // openType='getUserInfo'
              // onGetUserInfo={(e)=>{onGetUserInfo(e)}}
              openType='getPhoneNumber'
              onGetPhoneNumber={(e)=>{onGetPhoneNumber(e)}}
            >
              微信快捷登录
            </Button>
            <View className='wxLogin_view_main_cancel'>暂且离开</View>
            <View className='wxLogin_view_main_agree' onClick={()=>{onAgree()}}>
              <View className='wxLogin_view_main_agree_action'>
                <Image
                  src={agree ? `${baseUrl}check.png` : `${baseUrl}uncheck.png`}
                  className='wxLogin_view_main_agree_action_icon'
                />
              </View>
              <View className='wxLogin_view_main_agree_value'>
                我已仔细阅读并同意
                <Text className='wxLogin_view_main_agree_value_link' onClick={(e)=>{onShowAgree(e)}}>《小程序服务协议》</Text>
                及
                <Text className='wxLogin_view_main_agree_value_link' onClick={(e)=>{onShowAgree(e)}}>《隐私保护指引》</Text>
              </View>
            </View>
          </View>
        </View>
      </AtFloatLayout>
    </View>
  )
}

export default Index;
