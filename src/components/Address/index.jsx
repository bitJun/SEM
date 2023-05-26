import React, { useEffect, useState } from "react";
import {
  View,
  Picker,
	Image
} from '@tarojs/components';
import {
  arealist
} from '@config/area';
import {
  baseUrl,
} from '@config';
import './index.scss';

const Address = (props) => {
  let {
    value,
    onChangeAddress,
    type
  } = props;
  const [provinceAll, setProvinceAll] = useState([]);
  const [cityAll, setCityAll] = useState([]);
  const [areaAll, setAreaAll] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [districts, setDistricts] = useState([]);
  let [districts_value, setDistrictsValue] = useState([]);

  useEffect(()=>{
    getDistrict();
  }, []);

  const getDistrict = () => {
		let province_all = [],
		city_all = [],
		area_all = [],
		districtlist = [];
		province_all = arealist.filter(item=>{
			if (item.type == 1) {
				item.parentId = '';
			}
			return item.type == 1;
		});
		city_all = arealist.filter(item=>{
			return item.type == 2;
		});
		area_all = arealist.filter(item=>{
			return item.type == 3;
		});
		districtlist.push(province_all);
		let init_city = [],
			init_area = [],
			init_provinceId = province_all[0].code,
			init_cityId = '';
		init_city = city_all.filter(item => {
			return item.parentId == init_provinceId;
		});
		districtlist.push(init_city);
		init_cityId = init_city[0].code;
		init_area = area_all.filter(item => {
			return item.parentId == init_cityId;
		});
		districtlist.push(init_area);
		let district = [];
		district = districtlist.map(item => {
			item = item.map(json => {
				let city = json.city;
				json = city;
				return json;
			})
			return item;
		});
    setProvinceAll(province_all);
    setCityAll(city_all);
    setAreaAll(area_all);
    setDistrictList(districtlist);
    setDistricts(district);
	}
  const onColumnChange = (e) => {
		let column = e.detail.column;
		let row = e.detail.value;
		let init_city = [],
			init_area = [],
			province_Id = null,
			province_name = '',
			city_Id = null,
			city_name = '';
    let ranglist = [];
    ranglist[0] = districts[0];
		switch (column) {
			case 0:
				province_Id = provinceAll[row].code;
				province_name = provinceAll[row].city;
				init_city = cityAll.filter(item=>{
					return item.parentId == province_Id;
				});
				city_Id = init_city[0].code;
				init_city = init_city.map(item => {
					let city = item.city;
					item = city;
					return item;
				});
				init_area = areaAll.filter(item=>{
					return item.parentId == city_Id;
				});
				init_area = init_area.map(item => {
					let city = item.city;
					item = city;
					return item;
				});
				ranglist[1] = init_city;
				ranglist[2] = init_area;
				districts_value[1] = 0;
				districts_value[2] = 0;
        setDistricts(ranglist);
			break;
			case 1:
				districts_value[2] = 0;
				province_Id = provinceAll[districts_value[0]].code;
				init_city = cityAll.filter(item=>{
					return item.parentId == province_Id;
				});
				city_Id = init_city[row].code;
				city_name = init_city[row].city;
				init_area = areaAll.filter(item=>{
					return item.parentId == city_Id;
				});
				init_area = init_area.map(item => {
					let city = item.city;
					item = city;
					return item;
				});
        ranglist[1] = districts[1];
				ranglist[2] = init_area;
        setDistricts(ranglist);
			break;
			case 2:
				break;
			default:
				break;
		}
    console.log('ranglist', ranglist)
		districts_value[column] = row;
    setDistrictsValue(districts_value);
	}
	
	const onChange = (e) => {
		let province = districts[0][districts_value[0] || 0];
		let city = districts[1][districts_value[1] || 0];
		let region = districts[2][districts_value[2] || 0] || '';
    let address = `${province} ${city} ${region}`;
    console.log('address', address)
    onChangeAddress({
      address: address,
      type: type
    });
	}

  return (
    <View>
      <Picker
        mode='multiSelector'
        onChange={onChange}
        onColumnChange={onColumnChange}
        range={districts}
        value={districts_value}
      >
        <View className="edit_view_main_item_value">
          {value || '省市区县、乡镇等'}
					<Image
						src={`${baseUrl}more.png`}
						className="edit_view_main_item_value_icon"
					/>
        </View>
      </Picker>
    </View>
  )
}
export default React.memo(Address);