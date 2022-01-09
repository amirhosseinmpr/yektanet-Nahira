import React , { useEffect } from 'react';
import HorizontalBorder from '../borders/HorizontalBorder';
import Angle from '../angle/Angle';
import { firstHorizontalRow, secondHorizontalRow, thirdHorizontalRow } from '../../utils/horizontalBorders';
import style from './HorizontalLine.module.scss';

const HorizontalLine = ({ rank, coins ,borderZero }) => {

	let dataRow = firstHorizontalRow;
	if (rank === 1) {
		dataRow = firstHorizontalRow;
	} else if (rank === 2) {
		dataRow = secondHorizontalRow;
	} else if (rank === 3) {
		dataRow = thirdHorizontalRow;
	}
	// useEffect(() => {
	// 	console.log('dataRow',coins)
	// 	const maka = coins &&
	// 	dataRow.forEach((item, i) => {
	// 		console.log('dataRow Item',i,item)
	// 		console.log('dataRow filter filter',i,coins.filter(coin =>coin.multiple && borderZero && coin.betNumber.join('_') === borderZero.join('_')))
	// 		console.log('dataRow HorizontalBorder',i,coins.filter((coin) => coin.multiple && item.line && coin.betNumber.join('_') === item.line.join('_')))
	// 		console.log('dataRow Angle',i,coins.filter((coin) =>coin.multiple && item.angle && coin.betNumber.join('_') === item.angle.join('_')))
			
	// 	})
	// }, [coins])
	const notAvailable = rank === 0;
	// return 1
	return (
		<div className={style.mainDiv}>
			<Angle
				coins={
					coins &&
					coins.filter(
						(coin) =>
							coin.multiple && borderZero && coin.betNumber.join('_') === borderZero.join('_')
					)
				}
				numbers={borderZero}
			/>
			{dataRow.map((item, i) => (
				<React.Fragment key={i}>
					<HorizontalBorder
						numbers={item.line}
						coins={
							coins &&
							coins.filter(
								(coin) => coin.multiple && item.line && coin.betNumber.join('_') === item.line.join('_')
							)
						}
						notAvailable={item.notAvailable || rank === 0}
					/>
					<Angle
						coins={
							coins &&
							coins.filter(
								(coin) =>
									coin.multiple && item.angle && coin.betNumber.join('_') === item.angle.join('_')
							)
						}
						numbers={item.angle}
						notAvailable={item.notAvailable || rank === 0}
					/>
				</React.Fragment>
			))}
			{/**<HorizontalBorder numbers={dataRow[0].line} notAvailable={notAvailable} />
			<Angle numbers={dataRow[0].angle} notAvailable={notAvailable} />
			<HorizontalBorder numbers={dataRow[1].line} notAvailable={notAvailable} />
			<Angle numbers={dataRow[1].angle} notAvailable={notAvailable} />
			<HorizontalBorder numbers={dataRow[2].line} notAvailable={notAvailable} />
			<Angle numbers={dataRow[2].angle} notAvailable={notAvailable} />
			<HorizontalBorder numbers={dataRow[3].line} notAvailable={notAvailable} />
			<Angle numbers={dataRow[3].angle} notAvailable={notAvailable} />
			<HorizontalBorder numbers={dataRow[4].line} notAvailable={notAvailable} />
			<Angle numbers={dataRow[4].angle} notAvailable={notAvailable} />
			<HorizontalBorder numbers={dataRow[5].line} notAvailable={notAvailable} />
			<Angle numbers={dataRow[5].angle} notAvailable={notAvailable} />
			<HorizontalBorder numbers={dataRow[6].line} notAvailable={notAvailable} />
			<Angle numbers={dataRow[6].angle} notAvailable={notAvailable} />
			<HorizontalBorder numbers={dataRow[7].line} notAvailable={notAvailable} />
			<Angle numbers={dataRow[7].angle} notAvailable={notAvailable} />
			<HorizontalBorder numbers={dataRow[8].line} notAvailable={notAvailable} />
			<Angle numbers={dataRow[8].angle} notAvailable={notAvailable} />
			<HorizontalBorder numbers={dataRow[9].line} notAvailable={notAvailable} />
			<Angle numbers={dataRow[9].angle} notAvailable={notAvailable} />
			<HorizontalBorder numbers={dataRow[10].line} notAvailable={notAvailable} />
			<Angle numbers={dataRow[10].angle} notAvailable={notAvailable} />
			<HorizontalBorder numbers={dataRow[11].line} notAvailable={notAvailable} />
	<Angle notAvailable={true} /> **/}
		</div>
	);
};

export default HorizontalLine;
