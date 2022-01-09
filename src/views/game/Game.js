import React, { useContext, useState, useEffect, useRef ,useCallback} from 'react';
import Sound from 'react-sound';
import Row from '../../components/row/Row';
import HorizontalLine from '../../components/horizontalBorder/HorizontalLine';
import CoinBox from '../../components/coinBox/CoinBox';
import style from './Game.module.scss';
import TableFooter from '../../components/tableFooter/TableFooter';
import Spinner from '../../components/spinner/Spinner';
import context from '../../utils/context/Context';
import Coin from '../../components/coin/Coin';
import PlayerInfo from '../../components/playerInfo/PlayerInfo';
import ButtonBox from '../../components/buttonBox/ButtonBox';
import addSound from '../../assets/sounds/tap.mp3';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import ErrorPage from '../../components/error/Error';
import { generalEvents, playerState, generalApiCalls, apiCallsOfPlayground, playgroundEvents } from '../../api/socketConfig';
import { socketInstance } from '../../api/socketManager';
import LoadingPage from '../../components/loading/Loading';
import { commaFormatter } from '../../utils/functions/functions';
import { useHistory } from 'react-router-dom';

function TransitionRight(props) {
	return <Slide {...props} direction="right" />;
}

const Game = (props) => {
	const {
		statePlayer, 
		setStatePlayer,
	} = useContext(context);
	const coins = useContext(context).coins;
	const coinTypes = useContext(context).coinValues;
	const coinType = useContext(context).coinType;
	const addCoin = useContext(context).setCoins;
	const sound = useContext(context).sound;



	const [error, setError] = useState({connection:false,network:false,disconnect:false});
	const [loading, setLoading] = useState(true);
	const [broadcastModal, setBroadcastModal] = useState(false);
	const [loadingTimer, setLoadingTimer] = useState(0);
	const [broadcastInfo, setBroadcastInfo] = useState({ name: '', credit: 0 });
	const [info, setInfo] = useState({ name: '', level: 0, credit: 0 });
	const [betValue, setBetValue] = useState(0);
	const [errorModal, setErrorModal] = useState({show:false,content:""});
	const history = useHistory();
	
	// generalApiCalls.getInfo({ socketInstance });

	const [addPlay, setAddPlay] = useState(false);

	useEffect(() => {
		if (coins.length > 0) {
			let values = 0;
			coins.map((item) => (values = values + item.value));
			setBetValue(values);
		} else {
			setBetValue(0);
		}
	}, [coins]);
	useEffect(() => {
		socketInstance.on('closeConnections', () => {
			setError({connection:true,network:false});
		});
	}, [setError]);
	useEffect(() => {
		socketInstance.on('playerWon', (res) => {
			setBroadcastInfo({ name: res.PlayerName, credit: res.Credit });
			setBroadcastModal(true);
		});
	}, []);

	useEffect(() => {
		socketInstance.on(playgroundEvents.newStatus, ({PreCoin}) => {
			console.log('newStatus,CoinSet');
			addCoin(PreCoin)

			// addCoin((coins) => {
			// 	// const newCoin = coins.filter(c=> c.multiple !== true);
			// 	// console.log('[CoinSet]',[...res.PreCoin,...newCoin],newCoin)
			// 	return [...res.PreCoin]
			// });

			setTimeout(() => {
				generalApiCalls.getInfo({ socketInstance });
			}, 13000);
		});
	}, [socketInstance]);
	useEffect(() => {
		socketInstance.on('errorEvent', (res) => {
			setErrorModal({show:true,content:res})
		});
	}, []);
	let interval = useRef(null);

	useEffect(() => {
		interval.current = setInterval(() => {
			if (loadingTimer < 100) {
				setLoadingTimer((loadingTimer) => loadingTimer + 20);
			}
		}, 1000);
	}, [,]);

	useEffect(() => {
		if (loadingTimer === 100) {
			clearInterval(interval.current);
		}
	}, [loadingTimer]);

	useEffect(() => {
		apiCallsOfPlayground.getStatus({socketInstance})
		console.log('newStatus CALL')
	}, [socketInstance]);

	useEffect(() => {
		socketInstance.on('CoinSet', (Coins) => {
			console.log('CoinSet Game',Coins)
			// addCoin(Coins || []);
			addCoin(Coins)

		});
	}, [socketInstance]);

	useEffect(() => {
		socketInstance.on(generalEvents.playerState, ({ State }) => {
			setStatePlayer(State)

		});
	}, [socketInstance]);

	useEffect(() => {
		if(playerState[statePlayer] === 'LOBBY'){
			history.push('/rl/lobby');

		}else{
			history.push('/rl/game');
			// window.location.replace("/rl/game");
		}
		generalApiCalls.getInfo({ socketInstance });
	}, [statePlayer]);


	useEffect(() => {
		socketInstance.on('connect_error', () => {
			setError({connection:false,network:true,disconnect:false});
		});
		socketInstance.on('connect_timeout', () => {
			setError({connection:false,network:true,disconnect:false});
		});
		socketInstance.on('disconnect', () => {
			setError({connection:false,network:false,disconnect:true});
		});

	}, [setError]);

	useEffect(() => {
		socketInstance.on(generalEvents.playerInfo, (res) => {
			setLoading(false);
			setInfo({ ...info, name: res.Nickname, level: res.Level, credit: res.Credit });
		});
	}, [setLoading,setInfo]);

	const onClick = (text) => {
		addCoin((coins) => [...coins, { value: coinType.value, color: coinType.color, betNumber: text }]);
	};

	useEffect(() => {
		if (coins.length > 0 && sound) {
			setAddPlay(true);
		}
	}, [coins]);
	const errorPageLoader = useCallback(() => {
		history.push('/rl/error');
	  }, [history]);
	useEffect(() => {
	socketInstance.on("connect_error", () => {
		errorPageLoader();
	});
	socketInstance.on("connect_timeout", () => {
		errorPageLoader();
	});
	socketInstance.on("disconnect", () => {
		errorPageLoader();
	});
	}, [errorPageLoader]);
	// if (error.disconnect) {
	// 	return <ErrorPage disconnect={true}/>;
	// }
	// if (error.connection) {
	// 	return <ErrorPage closeConnections={true}/>;
	// }
	// if (error.network) {
	// 	return <ErrorPage closeConnections={false}/>;
	// }

	setTimeout(() => {
		if (loading && loadingTimer === 100) {
			return <ErrorPage />;
		}
	}, 1000);
	// if (!loading && loadingTimer === 100) {
		return (
			<div className={style.mainDiv}>
				<Snackbar
					open={errorModal.show}
					onClose={() => setErrorModal({show:false,content:""})}
					autoHideDuration={2000}
					style={{ top: '40vh' , backgroundColor:'red !important;'}}
					anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
					message={errorModal.content}
				/>
				<Snackbar
					open={broadcastModal}
					onClose={() => setBroadcastModal(false)}
					autoHideDuration={2000}
					TransitionComponent={TransitionRight}
					anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
					message={`${broadcastInfo.name} ${commaFormatter(broadcastInfo.credit)} جم برد`}
				/>
				{addPlay && (
					<Sound
						url={addSound}
						playStatus={Sound.status.PLAYING}
						onFinishedPlaying={() => setAddPlay(false)}
					/>
				)}
				<div>
					<div className={style.header}>Roulette</div>
					<div className={style.playerInfoContainer}>
						<PlayerInfo info={info} />
					</div>
				</div>
				<div className={style.middleContainer}>
					<div className={style.subMiddleContainer}>
						<div>
							<Spinner />
						</div>
						<div className={style.tableContainer}>
							<div className={style.upperTableWrapper}>
								<div className={style.zeroContainer} onClick={() => onClick('0')}>

									{coins &&
										coins.length > 0 &&
										coins
											.filter((coin) => coin.betNumber === '0')
											.map((coin,index) => {
												return(
													<div key={coin.betNumber} className={style.coinContainer} key={index}>
														<Coin color={coin.color} value={coin.value} />
													</div>)
											})}
									<div className={style.zeroWrapper}>
										<div className={style.zeroNumber}>0</div>
									</div>
								</div>
								<div className={style.middleTableContainer}>
								
									<HorizontalLine rank={0} />
									<Row coins={coins} rank={1} borderZero={[0,3]}/>
									<HorizontalLine rank={1} coins={coins} borderZero={[0,2,3]} />
									<Row coins={coins} rank={2} borderZero={[0,2]}/>
									<HorizontalLine rank={2} coins={coins} borderZero={[0,1,2]}/>
									<Row coins={coins} rank={3} borderZero={[0,1]}/>
									<HorizontalLine rank={3} coins={coins} />
								</div>
							</div>
							<div>
								<TableFooter coins={coins} />
							</div>
							<div className={style.betValueContainer}>
								<div>مبلغ شرط &nbsp; {commaFormatter(betValue)} &nbsp; جم</div>
							</div>
						</div>
					</div>
				</div>
				<div className={style.footerContainer}>
					<div className={style.footerSubContainer}>
						<CoinBox coinType={coinType} coinTypes={coinTypes} />
						<ButtonBox setInfo={setInfo} infoCredit={info.credit}/>
					</div>
				</div>
			</div>
		);
	// }

	// return <LoadingPage percent={loadingTimer} />;
};

export default Game;
