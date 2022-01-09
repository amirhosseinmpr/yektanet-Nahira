import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Game from '../views/game/Game';
import Lobby from '../views/lobby/Lobby'
import Error from '../components/error/Error';

const Router = () => {
	return (
		<div>
			<BrowserRouter>
				<Switch>
                    <Route exact={true} path="/rl/game" component={Game} />
                    <Route exact={true} path="/rl/lobby" component={Lobby} />
					<Route exact path="/rl/error" component={Error} />
					<Route exact path={`/dashboard/account/charging`}/>
					<Redirect from="/" to="/rl/lobby"/>
				</Switch>
			</BrowserRouter>
		</div>
	);
};

export default Router;
