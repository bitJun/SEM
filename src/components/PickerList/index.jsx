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
		list,
		onChangeList,
    type,
		value
  } = props;
	const [mode, setMode] = useState('');
	const [firstList, setFirstList] = useState([]);
	const [secondList, setSecongList] = useState([]);
	const [thirdList, setThirdList] = useState([]);
	const [range, setRange] = useState([]);
	const [values, setValues] = useState([]);

  useEffect(()=>{
		handleList()
  }, [props.list]);

	const handleList = () => {
		let first = [];
		let second = [];
		let third = [];
		list.forEach(item=>{
			first.push(item);
			if (item.childList.length > 0) {
				second = second.concat(item.childList)
				item.childList.forEach(json=>{
					if (json.childList) {
						third = third.concat(json.childList);
					}
				});
			}
		});
		setFirstList(first);
		setSecongList(second);
		setThirdList(third);
		if (second.length > 0) {
			setMode('multiSelector');
			setRange([first, second, third]);
		} else {
			setMode('selector');
			setRange(first);
		}
	}

  const onColumnChange = (e) => {
		let column = e.detail.column;
		let row = e.detail.value;
		console.log('column', column)
		console.log('row', row)
	}
	
	const onChange = (e) => {
		let value = e.detail.value;
		let result = null;
		if (mode == 'selector') {
			result = range[value];
		}
		onChangeList({
			result: result,
			type: type
		})
	}

  return (
    <View>
      <Picker
        mode={mode}
        onChange={onChange}
        onColumnChange={onColumnChange}
        range={range}
				value={values}
				rangeKey={'dictLabel'}
      >
        <View className="edit_view_main_item_value">
					{value ? value : '请选择'}
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