// import { socketInstance } from "./SocketManager";

export const serverEvents = {
  updateYourState: "updateYourState",
  errorEvent: "errorEvent",
};
export const generalEvents = {
  updateState: "updateState",
  playerState: "playerState",
  getInfo: "getInfo",
  playerInfo: "playerInfo",
};
export const lobbyEvents = {
  getTables: "getTables",
  tableInstance: "tableInstance",
  createTable: "createTable",
  joinTable: "joinTable",
  leaveTable: "leaveTable",
  // gameStatus: "gameStatus",
  playCard: "playCard",
  checkMove: "checkMove",
  tablesList: "tablesList",
  tableRemoved: "tableRemoved",
};
export const playgroundEvents = {
  getStatus: "getStatus",
  movePlayed: "movePlayed",
  newStatus: "newStatus",
  playMove: "playMove",
  surrender: "surrender",
  getOpponents: "getOpponents",
  opponentsList: "opponentsList",
  doubleRequest: "doubleRequest",
  doubleRequested: "doubleRequested",
  doubleAccepted: "doubleAccepted",
  doubleRejected: "doubleRejected",
  sendMessage: "sendMessage",
  newMessage: "newMessage",
  getMessages: "getMessages",
  messagesList: "messagesList",
};
export const playerState = {
  0: "LOBBY",
  1: "WAITING",
  2: "IN_GAME",
};

export const socketEndpoint = process.env.REACT_APP_SOCKET_API_URL;


// event callers
// NOTE : the details may change based on the actual info of the apis in the future
export const generalApiCalls = {
  updateState({ socketInstance }) {
    socketInstance.emit(generalEvents.updateState);
  },
  getInfo({ socketInstance }) {
    socketInstance.emit(generalEvents.getInfo);
  },
};
export const apiCallsOfLobby = {
  getTables({ socketInstance }) {
    socketInstance.emit(lobbyEvents.getTables, (tableInstances) => {
      tableInstances.map(({ TableId, CreditNeeded, GameType }) => null);
    });
  },
  createTable({ socketInstance }) {
    socketInstance.emit(lobbyEvents.createTable);
  },
  joinTable({ socketInstance, TableId }) {
    socketInstance.emit(lobbyEvents.joinTable, { TableId });
  },
  leaveTable({ socketInstance }) {
    socketInstance.emit(lobbyEvents.leaveTable);
  },
};
export const apiCallsOfPlayground = {
  getStatus({ socketInstance }) {
    socketInstance.emit(playgroundEvents.getStatus);
  },
  playMove({ socketInstance, Move }) {
    // NOTE: for Jack cards , the ClearedCards parameter is not required
    socketInstance.emit(playgroundEvents.playMove, {
      Move,
    });
  },
  checkMove({ socketInstance, PlayedCard, ClearedCards }) {
    //
    // NOTE: for Jack cards , the ClearedCards parameter is not required
    socketInstance.emit(
      lobbyEvents.checkMove,
      JSON.stringify({ PlayedCard, ClearedCards }),
      ({ isValid }) => {}
    );
  },
  getOpponents({ socketInstance }) {
    socketInstance.emit(playgroundEvents.getOpponents);
  },
  doubleRequest({ socketInstance, RequestAccepted, Notify }) {
    socketInstance.emit(
      playgroundEvents.doubleRequest,
      Notify ? { Notify, RequestAccepted } : { RequestAccepted }
    );
  },
  surrender({ socketInstance }) {
    socketInstance.emit(playgroundEvents.surrender);
  },
  getMessages({ socketInstance }) {
    socketInstance.emit(playgroundEvents.getMessages);
  },
  sendMessage({ socketInstance, Text }) {
    socketInstance.emit(playgroundEvents.sendMessage, { Text });
  },
};
