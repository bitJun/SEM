
import React, { useEffect, useState } from 'react';
import {
  View,
  Input,
  Image,
  Picker,
  ScrollView,
  Textarea
} from '@tarojs/components';
import Taro, { useDidShow, getCurrentInstance } from '@tarojs/taro';
import {
  queryUser,
  putUser,
  queryDictdataList
} from '@service/member';
import {
	getStorageSync,
} from '@utils/util';
import {
  NavBar
} from '@components';
import { set as setGlobalData, get as getGlobalData } from '@config/global';
import {
  baseUrl,
  requestBaseUrl
} from '@config';
import {
  Address,
  PickerList
} from '@components';
import {
  updateNoviceTask
} from '@service/home';
import './edit.scss';

const BusinessEdit = () => {
  let systemInfo = getGlobalData('systemInfo');
  let rate = systemInfo.safeArea.width / 750;
  const [detail, setDetail] = useState({});
  const defaultImage = `${baseUrl}defaultAvatarUrl.png`;
  const [sex, setSex] = useState(0);
  const [industryList, setIndustryList] = useState([]);
  const [positionList, setPositionList] = useState([]);
  const [revenueList, setRevenueList] = useState([]);
  const [businessTypeList, setBusinessTypeList] = useState([]);
  const [appealLabelList, setAppealLabelList] = useState([]);
  const [resourceLabelList, setResourceLabelList] = useState([]);
  const [appealLabel, setAppealLabel] = useState([]);
  const [resource, setResource] = useState([]);
  const [rangeValue, setRangeValue] = useState({
    industry: '',
    position: '',
    revenue: '',
    businessType: ''
  });
  
  useDidShow(()=>{
    onLoadSelfData();
    queryDictData('industry');      // 行业
    queryDictData('position');      // 职位
    queryDictData('revenue');       // 营收规模
    queryDictData('business_type'); // 业务类型
    queryDictData('appeal_label');   // 诉求
    queryDictData('resource_label'); // 优势
  })

  const onLoadSelfData = () => {
    queryUser()
      .then(res=>{
        setDetail(res);
      })
  }

  const onChangeValue = (event, type) => {
    let {
      value
    } = event.detail;
    let params = {...detail}
    params[type] = value;
    setDetail(params);
  }

  const onHandleChangeValue = (type, event) => {
    let value = event.target.value;
    let params = {...detail};
    params[type] = value;
    setDetail(params);
  }

  const onChooseAvatar = () => {
    Taro.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        const tempFilePaths = res.tempFilePaths;
        Taro.showLoading({});
        Taro.uploadFile({
          url: `${requestBaseUrl}/file/upload`,
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            photo: tempFilePaths[0],
          },
          header: {
            'token': getStorageSync('token'),
            "Content-Type": "multipart/form-data"
          },
          success: function (response) {
            let data = JSON.parse(response.data);
            let user = {...detail};
            user['avatarUrl'] = data.data;
            setDetail(user);
            Taro.hideLoading();
          },
          fail: function (res) {
          }
        });
      }
    })
  }

  const onSelectSex = (key) => {
    setSex(key);
  }

  const onSubmit = () => {
    detail.resourceLabel = JSON.stringify(resource);
    detail.appealLabel = JSON.stringify(appealLabel);
    putUser(detail)
      .then(res=>{
        
        if (getCurrentInstance().router.params.form) {
          updateNoviceTask({event: 1})
            .then(response=>{})
        }
        Taro.showToast({
          title: '操作成功',
          icon: 'none',
          success: function() {
            Taro.navigateBack();
          }
        })
      })
  }

  const queryDictData = (value) => {
    queryDictdataList({type: value})
      .then(res=>{
        if (value == 'industry') {
          setIndustryList(res);
        }
        if (value == 'position') {
          setPositionList(res);
        }
        if (value == 'revenue') {
          setRevenueList(res);
        }
        if (value == 'business_type') {
          setBusinessTypeList(res);
        }
        if (value == 'appeal_label') {
          setAppealLabelList(res);
        }
        if (value == 'resource_label') {
          setResourceLabelList(res);
        }
      });
  }

  const onChooseAppeal = (id) => {
    let list = [...appealLabel]
    let index = list.indexOf(id);
    if (index == -1) {
      list.push(id)
    } else {
      list.splice(index, 1);
    }
    setAppealLabel(list)
  }

  const onChooseResource = (id) => {
    let list = [...resource]
    let index = list.indexOf(id);
    if (index == -1) {
      list.push(id)
    } else {
      list.splice(index, 1);
    }
    setResource(list)
  }

  const onChangeAddress = (event) => {
    let params = {...detail};
    let {
      address,
      type
    } = event;
    params[type] = address;
    setDetail(params);
  }

  const onChangePicker = (event) => {
    let {
      result,
      type
    } = event;
    let params = {...detail};
    params[type] = result.id;
    setDetail(params);
    rangeValue[type] = result.dictLabel;
    setRangeValue(rangeValue);
  }

  return (
    <View
      className='edit_view content'
      style={{
        paddingTop: `calc(${systemInfo.safeArea.top}px + ${88 * rate}px)`,
      }}
    >
      <NavBar
        showBack={true}
        title="编辑名片"
        bgColor="transparent"
        color='#000000'
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
        <View className='edit_view_main'>
          <View className='edit_view_main_item userlogo'>
            <View className='edit_view_main_item_label'>照片</View>
            <View className='edit_view_main_item_value' onClick={()=>{onChooseAvatar()}}>
              <Image
                src={detail?.avatarUrl || defaultImage}
                className='edit_view_main_item_value_img'
              />
            </View>
          </View>
          <View className='edit_view_main_item'>
            <View className='edit_view_main_item_label'>姓名</View>
            <View className='flexwidth'>
              <Input
                className='edit_view_main_item_value'
                placeholder='请输入'
                onInput={(e)=>{onHandleChangeValue('platformName', e)}}
              />
              <View className='edit_view_main_item_actions'>
                <View className='edit_view_main_item_actions_item' onClick={()=>{onSelectSex(0)}}>
                  <Image
                    src={sex == 0 ? `${baseUrl}check.png` : `${baseUrl}uncheck.png`}
                    className='edit_view_main_item_actions_item_icon'
                  />
                  男
                </View>
                <View className='edit_view_main_item_actions_item' onClick={()=>{onSelectSex(1)}}>
                  <Image
                    src={sex == 1 ? `${baseUrl}check.png` : `${baseUrl}uncheck.png`}
                    className='edit_view_main_item_actions_item_icon'
                  />
                  女
                </View>
              </View>
            </View>
          </View>
          <View className='edit_view_main_item'>
            <View className='edit_view_main_item_label'>微信</View>
            <View className='flexwidth'>
              <Input
                className='edit_view_main_item_value'
                placeholder='请输入'
                onInput={(e)=>{onHandleChangeValue('wxNo', e)}}
              />
              <View className='edit_view_main_item_action'>
                <View className='edit_view_main_item_action_item'>
                  是
                </View>
                <View className='edit_view_main_item_action_item'>
                  否
                </View>
              </View>
            </View>
          </View>
          <View className='edit_view_main_item'>
            <View className='edit_view_main_item_label'>生日</View>
            <View className="flexwidth">
              <Picker
                mode='date'
                fields='year'
                onChange={(e)=>{onChangeValue(e, 'birthday')}}
              >
                <View className="edit_view_main_item_value">
                  {detail?.birthday || '请选择生日'}
                  <Image
                    src={`${baseUrl}more.png`}
                    className="edit_view_main_item_value_icon"
                  />
                </View>
              </Picker>
            </View>
          </View>
          <View className='edit_view_main_item'>
            <View className='edit_view_main_item_label'>常住地</View>
            <View className='flexwidth'>
              <Address
                value={detail?.area}
                onChangeAddress={(e)=>{onChangeAddress(e)}}
                type='area'
              />
            </View>
          </View>
          <View className='edit_view_main_item'>
            <View className='edit_view_main_item_label'>行业</View>
            <View className='flexwidth'>
              <PickerList 
                list={industryList}
                onChangeList={(e)=>{onChangePicker(e)}}
                type='industry'
                value={rangeValue['industry']}
              />
              {/* <Picker
                mode='selector'
                range={industryList}
                rangeKey="dictLabel"
                onChange={(e)=>{onChangeValue(e, 'industry')}}
              >
                <View className="edit_view_main_item_value">
                  {detail?.industry || '请选择行业'}
                  <Image
                    src={`${baseUrl}more.png`}
                    className="edit_view_main_item_value_icon"
                  />
                </View>
              </Picker> */}
            </View>
          </View>
          <View className='edit_view_main_item'>
            <View className='edit_view_main_item_label'>业务类型</View>
            <View className='flexwidth'>
              <PickerList 
                list={businessTypeList}
                onChangeList={(e)=>{onChangePicker(e)}}
                type='businessType'
                value={rangeValue['businessType']}
              />
              {/* <Picker
                mode='selector'
                range={businessTypeList}
                rangeKey="dictLabel"
                onChange={(e)=>{onChangeValue(e, 'businessType')}}
              >
                <View className="edit_view_main_item_value">
                  {detail?.businessType || '请选择业务类型'}
                  <Image
                    src={`${baseUrl}more.png`}
                    className="edit_view_main_item_value_icon"
                  />
                </View>
              </Picker> */}
            </View>
          </View>
          <View className='edit_view_main_item'>
            <View className='edit_view_main_item_label'>公司</View>
            <View className='flexwidth'>
              <Input
                className='edit_view_main_item_value'
                placeholder='请输入'
                onInput={(e)=>{onHandleChangeValue('company', e)}}
              />
            </View>
          </View>
          <View className='edit_view_main_item'>
            <View className='edit_view_main_item_label'>职位</View>
            <View className='flexwidth'>
              <PickerList 
                list={positionList}
                onChangeList={(e)=>{onChangePicker(e)}}
                type='position'
                value={rangeValue['position']}
              />
              {/* <Picker
                mode='selector'
                range={positionList}
                rangeKey="dictLabel"
                onChange={(e)=>{onChangeValue(e, 'position')}}
              >
                <View className="edit_view_main_item_value">
                  {detail?.position || '请选择职位'}
                  <Image
                    src={`${baseUrl}more.png`}
                    className="edit_view_main_item_value_icon"
                  />
                </View>
              </Picker> */}
            </View>
          </View>
          <View className='edit_view_main_item'>
            <View className='edit_view_main_item_label'>营收规模</View>
            <View className='flexwidth'>
              <PickerList 
                list={revenueList}
                onChangeList={(e)=>{onChangePicker(e)}}
                type='revenue'
                value={rangeValue['revenue']}
              />
              {/* <Picker
                mode='selector'
                range={revenueList}
                rangeKey="dictLabel"
                onChange={(e)=>{onChangeValue(e, 'revenue')}}
              >
                <View className="edit_view_main_item_value">
                  {detail?.revenue || '请选择营收规模'}
                  <Image
                    src={`${baseUrl}more.png`}
                    className="edit_view_main_item_value_icon"
                  />
                </View>
              </Picker> */}
            </View>
          </View>
          <View className='edit_view_main_intro'>
            <View className='edit_view_main_intro_title'>
              业务简介
              <View className='edit_view_main_intro_title_size'>0/200</View>
            </View>
            <Textarea
              className='edit_view_main_intro_value'
              placeholder='例如：通过深度访谈，为企业创作短视频内容，获取脉冲式流量，驱动商业增长。'
              placeholderClass='placeholder'
              maxlength={200}
              value={detail?.businessProfile}
              onInput={(e)=>{onHandleChangeValue('businessProfile', e)}}
            />
          </View>
          <View className='edit_view_main_section'>
            <View className='edit_view_main_section_title'>
              需求
              <View className='edit_view_main_section_title_desc'>最多选择4个标签</View>
            </View>
            <View className='edit_view_main_section_tags'>
              {
                appealLabelList && appealLabelList.map(item=>
                  <View
                    className={`edit_view_main_section_tags_item ${appealLabel.indexOf(item?.id) != -1 ? 'active' : ''}`}
                    key={item?.id}
                    onClick={()=>{onChooseAppeal(item?.id)}}
                  >
                    {item?.dictLabel}
                  </View>  
                )
              }
            </View>
          </View>
          <View className='edit_view_main_section'>
            <View className='edit_view_main_section_title'>
              资源
              <View className='edit_view_main_section_title_desc'>最多选择4个标签</View>
            </View>
            <View className='edit_view_main_section_tags'>
              {
                resourceLabelList && resourceLabelList.map(item=>
                  <View
                    className={`edit_view_main_section_tags_item ${resource.indexOf(item?.id) != -1 ? 'active' : ''}`}
                    key={item?.id}
                    onClick={()=>{onChooseResource(item?.id)}}
                  >
                    {item?.dictLabel}
                  </View>
                )
              }
            </View>
          </View>
          <View className='edit_view_main_footer' onClick={()=>{onSubmit()}}>
            <View className='edit_view_main_footer_action'>保存</View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default BusinessEdit;
