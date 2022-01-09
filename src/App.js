import React from 'react';
import Router from './router/Router'
import Provider from './utils/context/Provider';
import style from './App.module.scss';
import './assets/fonts/style.css'
// import { generalEvents, playerState } from './api/socketConfig';
// import { socketInstance } from './api/socketManager';

console.log = function () {};

function App() {
	return (
		<Provider>
			<div>
				<Router />
			</div>
			<div className={style.rotateDiv}>
				<div>
					<i className="fa fa-rotate-right"></i> برای عملکرد بهتر صفحه را بچرخانید
				</div>
			</div>
		</Provider>
	);
}

export default App;
