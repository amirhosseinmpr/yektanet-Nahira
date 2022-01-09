import React, { useContext ,useState ,Fragment} from 'react';
import Square from '../square/Square';
import VerticalBorder from '../borders/VerticalBorder';
import style from './Row.module.scss';
import { firstRowNumbers, secondRowNumbers, thirdRowNumbers } from './../../utils/rows';
import context from '../../utils/context/Context';

const Row = ({ rank, coins , borderZero}) => {

	let rowNumbers = firstRowNumbers;
	if (rank === 1) {
		rowNumbers = firstRowNumbers;
	} else if (rank === 2) {
		rowNumbers = secondRowNumbers;
	} else if (rank === 3) {
		rowNumbers = thirdRowNumbers;
	}
	const getCoins = (item)=>{

		let newCoin = coins.filter((coin) => {
			if(typeof coin.betNumber === 'string'){
				return coin.betNumber === item.number
			}
			return coin.betNumber.join("_") === item.number.join("_")
		});
		return newCoin
	}
	return (
		<div className={style.mainDiv}>
			
			<VerticalBorder
				numbers={borderZero}
				coins={coins.filter(
					(coin) => coin.multiple && borderZero && coin.betNumber.join('_') === borderZero.join('_')
				)}
			/>
			{rowNumbers.map((item, index) => (
				<React.Fragment key={index}>
					<Square
						coins={getCoins(item)}
						number={item.number}
						text={item.text}
						background={item.color}
					/>
					<VerticalBorder
						numbers={item.line}
						coins={coins.filter(
							(coin) => coin.multiple && item.line && coin.betNumber.join('_') === item.line.join('_')
						)}
					/>
				</React.Fragment>
			))}
			
			{/** <Square
				coins={coins.filter((coin) => coin.betNumber == rowNumbers[0].number)}
				number={rowNumbers[0].number}
				background={rowNumbers[0].color}
			/>
			<VerticalBorder />
			<Square
				coins={coins.filter((coin) => coin.betNumber == rowNumbers[1].number)}
				number={rowNumbers[1].number}
				background={rowNumbers[1].color}
			/>
			<VerticalBorder />
			<Square
				coins={coins.filter((coin) => coin.betNumber == rowNumbers[2].number)}
				hasCoin={true}
				number={rowNumbers[2].number}
				background={rowNumbers[2].color}
			/>
			<VerticalBorder />
			<Square
				coins={coins.filter((coin) => coin.betNumber == rowNumbers[3].number)}
				number={rowNumbers[3].number}
				background={rowNumbers[3].color}
			/>
			<VerticalBorder />
			<Square
				coins={coins.filter((coin) => coin.betNumber == rowNumbers[4].number)}
				number={rowNumbers[4].number}
				background={rowNumbers[4].color}
			/>
			<VerticalBorder />
			<Square
				coins={coins.filter((coin) => coin.betNumber == rowNumbers[5].number)}
				number={rowNumbers[5].number}
				background={rowNumbers[5].color}
			/>
			<VerticalBorder />
			<Square
				coins={coins.filter((coin) => coin.betNumber == rowNumbers[6].number)}
				number={rowNumbers[6].number}
				background={rowNumbers[6].color}
			/>
			<VerticalBorder />
			<Square
				coins={coins.filter((coin) => coin.betNumber == rowNumbers[7].number)}
				number={rowNumbers[7].number}
				background={rowNumbers[7].color}
			/>
			<VerticalBorder />
			<Square
				coins={coins.filter((coin) => coin.betNumber == rowNumbers[8].number)}
				number={rowNumbers[8].number}
				background={rowNumbers[8].color}
			/>
			<VerticalBorder />
			<Square
				coins={coins.filter((coin) => coin.betNumber == rowNumbers[9].number)}
				number={rowNumbers[9].number}
				background={rowNumbers[9].color}
			/>
			<VerticalBorder />
			<Square
				coins={coins.filter((coin) => coin.betNumber == rowNumbers[10].number)}
				number={rowNumbers[10].number}
				background={rowNumbers[10].color}
			/>
			<VerticalBorder />
			<Square
				coins={coins.filter((coin) => coin.betNumber == rowNumbers[11].number)}
				number={rowNumbers[11].number}
				background={rowNumbers[11].color}
			/>
			<VerticalBorder /> **/}
		</div>
	);
};

export default Row;
