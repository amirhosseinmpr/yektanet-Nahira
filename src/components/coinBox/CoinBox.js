import React, { useContext, useState } from 'react';
import Sound from 'react-sound';
import Coin from '../coin/Coin';
import style from './CoinBox.module.scss';
import context from '../../utils/context/Context';
import coinSound from '../../assets/sounds/coin.mp3';

const CoinBox = ({ coinTypes, coinType: slectedCoinType }) => {
	const coinValues = useContext(context).coinValues;
	const changeCoinType = useContext(context).setCoinType;
	const changeCoinValues = useContext(context).setCoinValues;
	const sound = useContext(context).sound;

	const [play, setPlay] = useState(false);

	const onCoinClick = ({ color, value }) => {
		if (sound) {
			setPlay(true);
		}
		changeCoinType({ color, value });
	};

	const onIncreaseCoinValues = () => {
		if (coinValues[4].value <= 1000000) {
			let newValues = coinValues.map((item) => {
				return { ...item, value: item.value * 10 };
			});
			changeCoinValues(newValues);
		}
	};

	const onDecreaseCoinValues = () => {
		if (coinValues[0].value >= 50) {
			let newValues = coinValues.map((item) => {
				return { ...item, value: item.value / 10 };
			});
			changeCoinValues(newValues);
		}
	};

	return (
		<div className={style.mainDiv}>
			{play && (
				<Sound url={coinSound} playStatus={Sound.status.PLAYING} onFinishedPlaying={() => setPlay(false)} />
			)}
			{/* <div className={style.arrowContainer} onClick={onDecreaseCoinValues}>
				<i className="material-icons">keyboard_arrow_left</i>
			</div> */}
			<div className={style.coinsWrapper}>
				<div className={style.coinsContainer}>
					{coinTypes &&
						coinTypes.map((coinType) => (
							<div
								onClick={() => onCoinClick({ ...coinType })}
								className={`${style.coinDiv} ${
									style[slectedCoinType.value === coinType.value && 'selected']
								}`}
								key={coinType.value}
							>
								<Coin size="big" color={coinType.color} value={coinType.value} />{' '}
							</div>
						))}
				</div>
			</div>
			{/* <div className={style.arrowContainer} onClick={onIncreaseCoinValues}>
				<i className="material-icons">keyboard_arrow_right</i>
			</div> */}
		</div>
	);
};

export default CoinBox;
