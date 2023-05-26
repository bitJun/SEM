import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Button,
  Image
} from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useSelector } from 'react-redux';
import './index.scss';

const TabBar = (props) => {
  const {
    active
  } = props;
  const { UserInfo } = useSelector((state) => state.user);
  const [tabs] = useState([
    {
      pagePath: '/pages/index/index',
      text: '推荐',
      iconPath: require('@images/home_icon.png'),
      selectedIconPath: require('@images/home_icon_active.png'),
      className: 'index_icon',
      key: 'recommond'
    },
    {
      pagePath: '/pages/match/index',
      text: '配对',
      iconPath: require('@images/match_icon.png'),
      selectedIconPath: require('@images/match_icon_active.png'),
      className: 'match_icon',
      key: 'match'
    },
    // {
    //   pagePath: '/pages/square/index',
    //   text: '广场',
    //   iconPath: require('@images/square_icon.png'),
    //   selectedIconPath: require('@images/square_icon.png'),
    //   className: 'square',
    //   key: 'square'
    // },
    {
      pagePath: '/pages/message/index',
      text: '消息',
      iconPath: require('@images/message_icon.png'),
      selectedIconPath: require('@images/message_icon.png'),
      className: 'messag_icone',
      key: 'message'
    },
    {
      pagePath: '/pages/mine/index',
      text: '我的',
      iconPath: require('@images/my_icon.png'),
      selectedIconPath: require('@images/my_icon_active.png'),
      className: 'mine_icon',
      key: 'mine'
    }
  ]);
  
  const doNavigateTo = (url) => {
    Taro.switchTab({
      url
    })
  }
  
  return (
    <View className="tabbar_view">
      {
        tabs.map((item, index)=>
          <View
            className={`tabbar_view_item ${item.key == active ? 'active' : ''}`}
            key={item.className}
            onClick={()=>{doNavigateTo(item.pagePath)}}
          >
            <View className="tabbar_view_item_main">
              <View className="tabbar_view_item_img">
                <Image
                  src={item.key == active ? item.selectedIconPath : item.iconPath}
                  className={`tabbar_view_item_img_icon ${item.className}`}
                  mode="widthFix"
                />
                {
                  (item.className ==  'match' && UserInfo.befocus) ? (
                    <View className="tabbar_view_item_img_num">{UserInfo.befocus}</View>
                  ) : null
                }
              </View>
            </View>
            <View className={`tabbar_view_item_text ${item.key == active ? 'active' : ''}`}>
              {item.text}
            </View>
          </View>  
        )
      }
    </View>
  )
}
export default React.memo(TabBar);