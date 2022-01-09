import React, { useState, useEffect, useContext } from 'react';
import Sound from 'react-sound';
import style from './Spinner.module.scss';
import { Wheel } from 'react-custom-roulette';
import { playgroundEvents } from '../../api/socketConfig';
import { socketInstance } from '../../api/socketManager';
import context from '../../utils/context/Context';
import { data as wheelData, alternateNumbers } from '../../utils/wheelData';
import spinnerSound from '../../assets/sounds/spinner.mp3';
import winSound from '../../assets/sounds/win.mp3';
import Snackbar from '@material-ui/core/Snackbar';
import { commaFormatter } from '../../utils/functions/functions';
import { data } from '../../utils/wheelData';

const Spinner = () => {
	const sound = useContext(context).sound;

	const [spin, setSpin] = useState(false);
	const [result, setResult] = useState();
	const [resultInfo, setResultInfo] = useState({ flag: 'برد', credit: 22530 });
	const [resultModal, setResultModal] = useState(false);
	const [isFinished, setIsFinished] = useState(false);
	const [showResult, setShowResult] = useState(false);
	const [spinnerPlay, setSpinnerPlay] = useState(false);
	const [winPlay, setWinPlay] = useState(false);
	const [color, setColor] = useState('red');

	const colorNames = {
		red: 'قرمز',
		black: 'مشکی',
		green: 'سبز',
	};

	const [key, setKey] = useState(1);

	const onFinished = () => {
		setIsFinished(true);
		setSpin(false);
	};

	const figureColor = (number) => {
		if(isNaN(number)) return;
		let color = data?.find((item) => item?.option === String(number))?.style?.backgroundColor;
		if (number === 0) color = 'green'
		setColor(color);
	};

	useEffect(() => {
		socketInstance.on(playgroundEvents.newStatus, (...params) => {
			console.log('newStatus window',params)
	
			if (params[0]?.isPlayerMove === true && params[0].Result) {
				if (!spin ) {
					setResult(params[0]?.RouletteResult);
					setKey((key) => key + 1);
					setSpin(true);
					if (sound) {
						setSpinnerPlay(true);
					}
					figureColor(params[0]?.RouletteResult);
					setResultInfo({ flag: params[0]?.Won ? 'برد' : 'باخت', credit: params[0].PlayerWon });
					if(params[0].PlayerWon > 0){
						setShowResult(false);
						setTimeout(() => {
								if (sound) {
									setWinPlay(true);
								}
								setShowResult(true);
								setResultModal(true);
						}, 13000);
					}
				}
			}
		});
	}, [socketInstance]);

	return (
		<div className={style.mainDiv}>
			<Snackbar
				open={resultModal}
				onClose={() => setResultModal(false)}
				autoHideDuration={2000}
				style={{ top: '40vh' , backgroundColor:'red !important;'}}
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
				message={`${commaFormatter(resultInfo.credit)} جم ${resultInfo.flag}ید`}
			/>
			{spinnerPlay && sound && (
				<Sound
					url={spinnerSound}
					playStatus={Sound.status.PLAYING}
					onFinishedPlaying={() => setSpinnerPlay(false)}
				/>
			)}
			{winPlay && sound && (
				<Sound url={winSound} playStatus={Sound.status.PLAYING} onFinishedPlaying={() => setWinPlay(false)} />
			)}
			{showResult && (
				<div className={style.scoreContainer}>
					<div className={style.scoreWrapper}>
						<div className={`${style.scoreComponent} ${style[color + 'Score']}`}>
							<div>{showResult ? result : ' '}</div>
							<div className={style.colorName}>{colorNames[color]}</div>
						</div>
					</div>
				</div>
			)}

			<div>
				<Wheel
					key={key}
					mustStartSpinning={spin}
					onStopSpinning={onFinished}
					prizeNumber={alternateNumbers[result]}
					data={wheelData}
					backgroundColors={['#3e3e3e', '#df3428']}
					textColors={['#ffffff']}
					outerBorderColor="black"
					outerBorderWidth={10}
					innerRadius={40}
					innerBorderColor="black"
					innerBorderWidth={40}
					radiusLineColor="#ffff99"
					radiusLineWidth={2}
					perpendicularText={true}
					textDistance={80}
				/>
			</div>
		</div>
	);
};

export default Spinner;
