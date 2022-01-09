import socketIoClient from "socket.io-client";
import {
  socketEndpoint,
  serverEvents,
  generalApiCalls,
  generalEvents,
  lobbyEvents,
  playgroundEvents,
  playerState,
} from "./socketConfig";
import Cookies from "js-cookie";

const token = Cookies.get(process.env.REACT_APP_TOKEN_COOKIE_NAME);

export const socketInstance = socketIoClient(socketEndpoint, {
  query: {
    token: token || "",
  },
  path: process.env.REACT_APP_WEB_SERVER_SOCKET_PATH,
  reconnectionAttempts: 100,
  // reconnectionDelay: 100,
  reconnection: false,
  transports: ["websocket", "polling"],
});

socketInstance.on("connect", (socket) => {
  // debugger;
  // console.log(`connected with id : ${socketInstance.id}`);
  generalApiCalls.getInfo({ socketInstance });
});

socketInstance.on("disconnect", (error) => {
  // console.log('disconnect')
  // console.log("error");
});
// socketInstance.on(serverEvents.updateYourState, () => {
// 	generalApiCalls.updateState({ socketInstance });
// });
socketInstance.on(serverEvents.errorEvent, console.log);

socketInstance.on(generalEvents.playerInfo, (res) => console.log(res));

socketInstance.on(generalEvents.playerState, ({ State }) => {
  // if (State === 0) {
  // 	apiCallsOfLobby.getTables({ socketInstance });
  // }
  // if(playerState[State] === 'IN_GAME'){
  //   window.location.pathname = '/game'
  // }

  // console.log(
  //   "new Player state has arrived with these details : ",
  //   playerState[State]
  // );
});
socketInstance.on(lobbyEvents.tablesList, (tablesArray) => {
  console.log("current tables : ", tablesArray);
});
// socketInstance.on(lobbyEvents.tableInstance, (newTableInstance) => {
// 	console.log('the new table instance : ' + newTableInstance);
// 	apiCallsOfLobby.getTables({ socketInstance });
// });
// socketInstance.on(lobbyEvents.tableRemoved, (tableInstance) => {
// 	apiCallsOfLobby.getTables({ socketInstance });
// });
// playground's events

// socketInstance.on(playgroundEvents.newStatus, (...params) => {
// 	console.log('new game status is as followed :', params);
// });

socketInstance.on(playgroundEvents.movePlayed, (...params) => {
  // console.log("new move is :", params);
});
socketInstance.on("onload", (attemptNumber) => {
  console.log('reconnect')
  // console.log(
  //   `reconnected with id : ${socketInstance.id} - total number of resets = ${attemptNumber} `
  // );
});

socketInstance.on("connect_error", () => {
  // console.log("Connection Error , Try again");
});
socketInstance.on("connect_timeout", () => {
  // console.log("Connection was timed out , Try again");
});
socketInstance.on("disconnect", () => {
  // console.log("Disconnected , Try again");
});

export const move = (bets, coins) => {
  console.log("CoinSet move move", coins);
  socketInstance.emit(
    playgroundEvents.playMove,
    { Move: bets, Coins: coins },
    (res) => console.log(res)
  );
};

window.socket = socketInstance;
