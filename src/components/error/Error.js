import React from 'react';
import style from './Error.module.scss';
import { useHistory } from 'react-router-dom';

const Error = ({closeConnections,disconnect,location}) => {
	const onPageReload = () => {
		window.location.href = '/rl';
	};
	if(location?.state?.errorToken === true || disconnect === true){
		return (
			<div className={style.errorMainDiv}>
				<div className={style.backgroundHover}>
					<div className={style.errorContainer}>
						<div className={style.title} style={{
							color:"#fff",
							fontSize:'2.5em'
						}}>توکن شما اشتباه است</div>
						<div className={style.subtitle} style={{
							color:"#fff",
							fontSize:'2.5em'
						}}>لطفا توکن خود را بررسی کنید</div>
					</div>
				</div>
			</div>
		);
	}else if(closeConnections === true){
		return (
			<div className={style.errorMainDiv}>
				<div className={style.backgroundHover}>
					<div className={style.errorContainer}>
						<div className={style.title} style={{
							color:"#fff",
							fontSize:'4em'
						}}>شما خارج شدید</div>
						<div className={style.subtitle} style={{
							color:"#fff",
							fontSize:'4em'
						}}>شما فقط میتوانید در یک دستگاه به بازی ادامه دهید</div>
					</div>
				</div>
			</div>
		);
	}else{
		return (
			<div className={style.errorMainDiv}>
				<div className={style.backgroundHover}>
					<div className={style.errorContainer}>
						<div className={style.title}>خطا در اتصال به شبکه</div>
						<div className={style.subtitle}>لطفا دوباره امتحان کنید</div>
						<div>
							<button className={style.errorButton} onClick={onPageReload}>
								تلاش مجدد
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}

};

export default Error;
