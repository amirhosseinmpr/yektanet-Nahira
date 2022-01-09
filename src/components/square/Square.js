import React, { useContext } from 'react';
import Coin from '../coin/Coin';
import context from '../../utils/context/Context';
import style from './Square.module.scss';

const Square = ({ number, background, coins, text }) => {
	const addCoin = useContext(context).setCoins;
	const coinType = useContext(context).coinType;

	const onClick = () => {
		addCoin((coins) => [...coins, { value: coinType.value, color: coinType.color, betNumber: number }]);
	};
	return (
		<div onClick={onClick} className={`${style.mainDiv}`}>
			{coins &&
				coins.length > 0 &&
				coins.map((coin, i) => (
					<div className={style.coinContainer} key={i}>
						<Coin color={coin.color} value={coin.value} />
					</div>
				))}
			<div className={style.numberContainer}>
				<div className={`${style.number} ${style[background]}`}>{text ? text : number[0]}</div>
			</div>
		</div>
	);
};

export default Square;
