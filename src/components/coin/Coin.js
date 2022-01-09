import React from 'react';
import style from './Coin.module.scss';
import { creditFormatter } from '../../utils/functions/functions';

const Coin = ({ value, color, size }) => {
	return (
		<div className={`${style.mainDiv} ${style[color]} ${style[size]}`}>
			<div className={style.number}>{creditFormatter(value)}</div>
		</div>
	);
};

export default Coin;
