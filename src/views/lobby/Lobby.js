import React, { useContext , useEffect, useState, useRef,useCallback } from 'react';
import { useHistory , Red } from 'react-router-dom';
import style from './Lobby.module.scss';
import { lobbyEvents, generalEvents, playerState, generalApiCalls } from '../../api/socketConfig';
import { disconnect1, socketInstance } from '../../api/socketManager';
import homeImage from '../../assets/images/home.svg';
import plusImage from '../../assets/images/plus.svg';
import coinsImage from '../../assets/images/coins.svg';
import manImage from '../../assets/images/man.svg';
import ErrorPage from '../../components/error/Error';
import LoadingPage from '../../components/loading/Loading';
import numeral from "numeral";
import context from '../../utils/context/Context';


export const defaultNumberFormatter = (number) => {
  return numeral(number).format("0,0");
};
const Lobby = () => {
	const {
		statePlayer, 
		setStatePlayer
	} = useContext(context);
	const [error, setError] = useState({connection:false,network:false,disconnect:false});
	const [loading, setLoading] = useState(true);
	const [loadingTimer, setLoadingTimer] = useState(0);
	const [playerInfo, setPlayerInf] = useState({ name: '', level: 0, credit: 0 ,image:''});
	const history = useHistory();

	let interval = useRef(null);

	useEffect(() => {
		clearInterval(interval.current);
		interval.current = setInterval(() => {
			if (loadingTimer < 100) {
				setLoadingTimer((loadingTimer) => loadingTimer + 10);
			}
		}, 500);
	}, [,]);

	useEffect(() => {
		socketInstance.on(generalEvents.playerInfo, (res) => {
			console.log('playerInfo')
			setLoading(false);
		});
	}, [setLoading]);

	useEffect(() => {
		socketInstance.on('closeConnections', () => {
			setError({connection:true,network:false});
		});
	}, [setError]);


	useEffect(() => {
		if (loadingTimer === 100) {
			clearInterval(interval.current);
		}
	}, [loadingTimer]);

	const goToGame = () => {
		if(playerInfo?.credit >= 1000){
			socketInstance.emit(lobbyEvents.createTable);
			generalApiCalls.getInfo({ socketInstance });
		}
	};

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
		socketInstance.on(generalEvents.playerState, ({ State }) => {
			setStatePlayer(State)
		});
	}, [socketInstance]);

	useEffect(() => {
		// console.log('LOBBY',window.location.pathname)
		if(playerState[statePlayer] === 'IN_GAME'){
			// history.push('/rl/game');
			history.push('/rl/game');
			// setTimeout(() => {
			// }, 1000);
			// window.location.href = "/rl" ;
		}else{
			history.push('/rl/lobby');
			// setTimeout(() => {
			// }, 1000);
		}
		generalApiCalls.getInfo({ socketInstance });
		
	}, [statePlayer]);

	useEffect(() => {
		socketInstance.on(generalEvents.playerInfo, (res) => {
			setPlayerInf({ ...playerInfo, name: res.Nickname, level: res.Level, credit: res.Credit ,image:res.Avatar});
		});
	}, []);
	const errorPageLoader = useCallback((props) => {
		if(props) history.push('/rl/error');
		else history.push({
			pathname:'/rl/error',
			state: { errorToken: true }
		});
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
	// 	return <ErrorPage />;
	// }
	setTimeout(() => {
		if (loading && loadingTimer === 100) return errorPageLoader(false);
	}, 2000);

	if (!loading && loadingTimer === 100) {
		return (
			<div className={style.mainDiv}>
				<div className={style.backgroundHover}>
					<div className={style.upperPart}>
						<div className={style.innerUpperPart}>
							<div className={style.leftPart}>
								<div className={style.iconContainer}>
									<img className={style.homeImage} src={homeImage} />
								</div>
								<div className={style.iconContainer,style.pannelLeft} >
									<img className={style.plusImage} src={plusImage} 
									onClick={()=>(window.location.href = `http://${window.location.host}/dashboard/account/charging`)} 
									/>
									<p> {' '} : افزایش موجودی </p>
								</div>
								<div className={style.itemContainer} style={{
									paddingLeft: "0.5rem"
								}}>
									<div className={style["marLeft"]}>
										<span className={style["mar-left"]} style={{
											paddingRight:"0.5rem",
											fontWeight:"bold"
										}}>موجودی</span> : {defaultNumberFormatter(playerInfo.credit)} جم
									</div>
								</div>
								<div className={style.iconContainer} >
									<img className={`${style.coinsImage} ${style["marLeft"]}`} src={coinsImage} />
								</div>
							</div>
							<div className={style.rightPart}>
								<div className={`${style.itemContainer} ${style.rightSentenceContainer} ${style.pannelRight}`}>
									<div>
										
										<div className={style.lvl_player}>
											سطح بازیکن : <span>{playerInfo.level}</span>
										</div>
										<div style={{
											fontWeight:"bold"
										}}>{playerInfo.name}</div>
									</div>
								</div>
								<div className={`${style.iconContainer} profile-pic`}>
									<img className={style.manImage} src={playerInfo.image} alt={playerInfo.name}/>
								</div>
							</div>
						</div>
					</div>
					<div className={style.buttonContainer}>
						{
							(playerInfo?.credit >= 1000) ? (
								<button className={style.button} onClick={goToGame}>
									بازی کن
								</button>	
							): (
								<div className={style.NoCredit}>
									<div>اعتبار کافی برای بازی ندارید , لطفا از منوی بالا نسبت به افزایش موجودی اقدام کنید</div>
								</div>
							)
						}
					</div>
				</div>
			</div>
		);
	}
	return <LoadingPage percent={loadingTimer} />;
};

export default Lobby;
