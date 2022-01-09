import React, { useContext } from 'react';
import Coin from '../coin/Coin';
import context from '../../utils/context/Context';
import style from './HorizontalBorder.module.scss';

const HorizontalBorder = ({ numbers, coins }) => {
	const addCoin = useContext(context).setCoins;
	const coinType = useContext(context).coinType;
	const onClick = () => {
		if (numbers && numbers.length > 0) {
			addCoin((coins) => [
				...coins,
				{ value: coinType.value, color: coinType.color, betNumber: numbers, multiple: true },
			]);
		}
	};

	return (
		<div onClick={onClick} className={`${style.mainDiv} ${style[numbers ? 'available' : 'notAvailable']}`}>

			{coins &&
				coins.length > 0 &&
				coins.map((coin, i) => (
					<div key={i} className={style.coinContainer}>
						<Coin color={coin.color} value={coin.value} />
					</div>
				))}
		</div>
	);
};

export default HorizontalBorder;
