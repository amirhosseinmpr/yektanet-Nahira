import React, { useContext } from 'react';
import style from './TableFooter.module.scss';
import context from '../../utils/context/Context';
import Coin from '../coin/Coin';

const TableFooter = ({ coins }) => {
	const addCoin = useContext(context).setCoins;
	const coinType = useContext(context).coinType;

	const onClick = (text) => {
		addCoin((coins) => [...coins, { value: coinType.value, color: coinType.color, betNumber: text }]);
	};

	return (
		<div className={style.mainDiv}>
			<div className={style.mainBlock}>
				<div className={style.upperBlock} onClick={() => onClick('1th 12')}>
					{coins &&
						coins.length > 0 &&
						coins
							.filter((coin) => coin.betNumber === '1th 12')
							.map((coin,index) => (
								<div className={style.coinContainer} key={index}>
									<Coin color={coin.color} value={coin.value} />
								</div>
							))}
					<div>1ST 12</div>
				</div>
				<div className={style.footerBlock}>
					<div className={style.footerChild} onClick={() => onClick('1 to 18')}>
						{coins &&
							coins.length > 0 &&
							coins
								.filter((coin) => coin.betNumber === '1 to 18')
								.map((coin,index) => (
									<div className={style.coinContainer} key={index}>
										<Coin color={coin.color} value={coin.value} />
									</div>
								))}
						<div>1 TO 18</div>
					</div>
					<div className={style.footerChild} onClick={() => onClick('Even')}>
						{coins &&
							coins.length > 0 &&
							coins
								.filter((coin) => coin.betNumber === 'Even')
								.map((coin,index) => (
									<div className={style.coinContainer} key={index}>
										<Coin color={coin.color} value={coin.value} />
									</div>
								))}
						<div>EVEN</div>
					</div>
				</div>
			</div>
			<div className={style.mainBlock}>
				<div className={style.upperBlock} onClick={() => onClick('2th 12')}>
					{coins &&
						coins.length > 0 &&
						coins
							.filter((coin) => coin.betNumber === '2th 12')
							.map((coin,index) => (
								<div className={style.coinContainer} key={index}>
									<Coin color={coin.color} value={coin.value} />
								</div>
							))}
					<div>2ND 12</div>
				</div>
				<div className={style.footerBlock}>
					<div onClick={() => onClick('Red')} className={`${style.redBackground} ${style.footerChild}`}>
						{coins &&
							coins.length > 0 &&
							coins
								.filter((coin) => coin.betNumber === 'Red')
								.map((coin,index) => (
									<div className={style.coinContainer}  key={index}>
										<Coin color={coin.color} value={coin.value} />
									</div>
								))}
						<div></div>
					</div>
					<div className={`${style.blackBackground} ${style.footerChild}`} onClick={() => onClick('Black')}>
						{coins &&
							coins.length > 0 &&
							coins
								.filter((coin) => coin.betNumber === 'Black')
								.map((coin,index) => (
									<div className={style.coinContainer} key={index}>
										<Coin color={coin.color} value={coin.value} />
									</div>
								))}
						<div></div>
					</div>
				</div>
			</div>
			<div className={style.mainBlock}>
				<div className={style.upperBlock} onClick={() => onClick('3th 12')}>
					{coins &&
						coins.length > 0 &&
						coins
							.filter((coin) => coin.betNumber === '3th 12')
							.map((coin,index) => (
								<div className={style.coinContainer} key={index}>
									<Coin color={coin.color} value={coin.value} />
								</div>
							))}
					<div>3RD 12</div>
				</div>
				<div className={style.footerBlock}>
					<div className={style.footerChild} onClick={() => onClick('Odd')}>
						{coins &&
							coins.length > 0 &&
							coins
								.filter((coin) => coin.betNumber === 'Odd')
								.map((coin,index) => (
									<div className={style.coinContainer} key={index}>
										<Coin color={coin.color} value={coin.value} />
									</div>
								))}
						<div>ODD</div>
					</div>
					<div className={style.footerChild} onClick={() => onClick('19 to 36')}>
						{coins &&
							coins.length > 0 &&
							coins
								.filter((coin) => coin.betNumber === '19 to 36')
								.map((coin,index) => (
									<div className={style.coinContainer} key={index}>
										<Coin color={coin.color} value={coin.value} />
									</div>
								))}
						<div>19 TO 36</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TableFooter;
