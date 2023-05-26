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
  baseUrl
} from '@config';
import {
  queryInvoiceFindInvoiceStatus
} from '@service/invoice';
import './detail.scss';

const Mine = () => {
  let systemInfo = getGlobalData('systemInfo');
  let rate = systemInfo.safeArea.width / 750;
  const [detail, setDetail] = useState({});

  useDidShow(()=>{
    let params = {
      invoiceId: getCurrentInstance().router.params.invoiceId
    }
    queryInvoiceFindInvoiceStatus(params)
      .then(res=>{
        setDetail(res);
      })
  })

  const downLoadFile = () => {
    Taro.getSetting({
      success: res => {
        if(!res.authSetting['scope.writePhotosAlbum']) {
          Taro.authorize({
            scope: 'scope.writePhotosAlbum',
            success: () => {
              doSaveImg()
            },
            fail: () => {
              openConfirm()
            }
          })
        } else {
          doSaveImg()
        }
      }
    });
  }

  const openConfirm =()=> {
    Taro.showModal({
      content: '检测到您没有打开小程序相册权限，是否取设置打开？',
      showCancel: true,
      success: res => {
        if(res.confirm) {
          // 打开权限
          Taro.openSetting({
            success: function(res) {
              doSaveImg()
            }
          })
        }
      }
    })
  }

  const doSaveImg = () => {
    Taro.downloadFile({
      url: detail.imgUrl,
      success: res => {
        Taro.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: () => {
            Taro.showToast({
              title: '已保存到相册',
              icon: 'success'
            })
          },
          fail: () => {
            Taro.showToast({
              title: '保存失败',
              icon: 'none'
            })
          }
        })
      }
    })
  }

  return (
    <View
      className='bill_view content'
      style={{
        paddingTop: `calc(${systemInfo.safeArea.top}px + ${88 * rate}px)`,
      }}
    >
      <NavBar
        title='查看发票'
        showBack={true}
        bgColor="transparent"
        color="#000000"
      />
      <View className='bill_view_main'>
        <Image
          src={detail.imgUrl}
          className='bill_view_main_img'
        />
        <View className='bill_view_main_action'>
          <View className='bill_view_main_action_btn' onClick={()=>{downLoadFile()}}>下载</View>
        </View>
      </View>
    </View>
  )
}

export default Mine;
