import React, { useContext , useState } from 'react';
import Coin from '../coin/Coin';
import style from './VerticalBorder.module.scss';
import context from '../../utils/context/Context';

const VerticalBorder = ({ numbers, coins }) => {
	// const {state,setState}=useState(true)
	// if (coins && coins.length > 0) {
	// 	console.log(coins);
	// }
	const addCoin = useContext(context).setCoins;
	const coinType = useContext(context).coinType;

	const onClick = () => {
		if (numbers && numbers.length > 0) {
			addCoin((coins) => [...coins, { value: coinType.value, color: coinType.color, betNumber: numbers, multiple: true }]);
		}
	};

	return (
		<div
			onClick={onClick}
			className={`${style.mainDiv} ${style[numbers && numbers.length > 0 ? 'available' : 'notAvailable']}`}
		>
			{coins &&
				coins.length > 0 &&
				coins.map((coin, i) => {
					return (
						<div key={i} className={style.coinContainer}>
							{' '}
							<Coin color={coin.color} value={coin.value} />
							{' '}
						</div>
					)
				})
				}
		</div>
	);
};

export default VerticalBorder;
