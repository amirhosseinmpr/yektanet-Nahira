import React, { useState , useEffect } from 'react';
import context from './Context';

const Provider = (props) => {
	const [coins, setCoins] = useState([]);
	const [statePlayer, setStatePlayer] = useState(1);
	const [sound, setSound] = useState(true);
	const [coinValues, setCoinValues] = useState([
		{ color: 'yellow', value: 1000, selected: true },
		{ color: 'red', value: 10000, selected: false },
		{ color: 'purple', value: 50000, selected: false },
		{ color: 'red', value: 100000, selected: false },
		{ color: 'yellow', value: 200000, selected: false },
	]);
	const [coinType, setCoinType] = useState(coinValues[0]);
	const num = 5;

	return (
		<context.Provider
			value={{ coins , setCoins, num, coinValues, setCoinValues, coinType, setCoinType, sound, setSound, statePlayer, setStatePlayer }}
		>
			{props.children}
		</context.Provider>
	);
};

export default Provider;
