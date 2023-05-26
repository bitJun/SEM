import React from "react";
import {
  View,
  Image
} from "@tarojs/components";
import {
  baseUrl
} from '@config';
import "./index.scss";

const BaseInfo = (props) => {
  let {
    user
  } = props;
  return (
    <View className="baseInfo_tags">
      {
        user?.jg &&
        <View className="baseInfo_tags_item">
          <Image
            src={`${baseUrl}home.png`}
            className="baseInfo_tags_item_icon home"
          />
          {user?.jg}
        </View> 
      }
      {
        user?.sg &&
        <View className="baseInfo_tags_item">
          <Image
            src={`${baseUrl}height.png`}
            className="baseInfo_tags_item_icon height"
          />
          {user?.sg}cm
        </View>
      }
      {
        user?.tz &&
        <View className="baseInfo_tags_item">
          <Image
            src={`${baseUrl}weight.png`}
            className="baseInfo_tags_item_icon weight"
          />
          {user?.tz}kg
        </View>
      }
      {
        user?.xz &&
        <View className="baseInfo_tags_item">
          <Image
            src={`${baseUrl}xingzuo.png`}
            className="baseInfo_tags_item_icon xingzuo"
          />
          {user?.xz}
        </View>
      }
      {
        user?.zy &&
        <View className="baseInfo_tags_item">
          <Image
            src={`${baseUrl}job.png`}
            className="baseInfo_tags_item_icon job"
          />
          {user?.zy}
        </View>
      }
      {
        user?.if_cf &&
        <View className="baseInfo_tags_item">
          <Image
            src={`${baseUrl}car.png`}
            className="baseInfo_tags_item_icon car"
          />
          {user?.if_cf}
        </View>
      }
      {
        user?.if_cf &&
        <View className="baseInfo_tags_item">
          <Image
            src={`${baseUrl}house.png`}
            className="baseInfo_tags_item_icon house"
          />
          {user?.if_cf}
        </View>
      }
      {
        user?.nx &&
        <View className="baseInfo_tags_item">
          <Image
            src={`${baseUrl}fee.png`}
            className="baseInfo_tags_item_icon fee"
          />
          年收入{user?.nx}
        </View>
      }
    </View>
  )
}
export default BaseInfo;