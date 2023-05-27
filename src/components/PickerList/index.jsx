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
	const [values, setValues] = useState([0,0,0]);

  useEffect(()=>{
		handleList()
  }, [props.list]);
	
	// useEffect(()=>{
	// 	console.log('range', range)
  // }, [range]);

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
			let firstId = first[0].id;
			let SecondColumn = [];
			SecondColumn = second.filter(item=>{
				return item.parentId == firstId;
			})
			let ThirdColumn = [];
			ThirdColumn = third.filter(item=>{
				return item.parentId == SecondColumn[0].id;
			})
			setRange([first, SecondColumn, ThirdColumn]);
		} else {
			setMode('selector');
			setRange(first);
		}
	}

  const onColumnChange = (e) => {
		let column = e.detail.column;
		let row = e.detail.value;
		let columnValue = [...values];
		columnValue[column] = row;
		setValues(columnValue)
		if (column == 0) {
			let firstId = firstList[row].id;
			let SecondColumn = [];
			SecondColumn = secondList.filter(item=>{
				return item.parentId == firstId;
			});
			let ThirdColumn = [];
			ThirdColumn = thirdList.filter(item=>{
				return item.parentId == SecondColumn[0].id;
			});
			setRange([firstList, SecondColumn, ThirdColumn]);
		}
		if (column == 1) {
			let rangeList = [...range];
			let ThirdColumn = [];
			ThirdColumn = thirdList.filter(item=>{
				return item.parentId == rangeList[1][row].id;
			});
			setRange([rangeList[0], rangeList[1], ThirdColumn]);
		}
	}
	
	const onChange = (e) => {
		let value = e.detail.value;
		let result = null;
		if (mode == 'selector') {
			result = range[value];
		} else {
			result = [range[0][value[0]], range[1][value[1]], range[2][value[2]]]
		}
		onChangeList({
			result: result,
			type: type,
			mode
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