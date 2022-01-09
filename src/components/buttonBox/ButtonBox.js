import React, { useContext, useState } from "react";
import Sound from "react-sound";
import style from "./ButtonBox.module.scss";
import context from "../../utils/context/Context";
import "../../api/socketManager";
import { move } from "../../api/socketManager";
import removeSound from "../../assets/sounds/remove.mp3";
import { lobbyEvents, playgroundEvents } from "../../api/socketConfig";
import { socketInstance } from "../../api/socketManager";
import { useHistory } from "react-router-dom";

const ButtonBox = ({ setInfo, infoCredit }) => {
  const coins = useContext(context).coins;
  const removeCoins = useContext(context).setCoins;
  const setSound = useContext(context).setSound;
  const sound = useContext(context).sound;

  const [isDisable, setIsDisable] = useState(false);
  const [removePlay, setRemovePlay] = useState(false);
  const history = useHistory();

  let bets = Array.from(coins, (item) => ({
    BetNumbers: item.betNumber,
    Bet: parseInt(item.value),
  }));
  const setOpen = () => {
    move(bets, coins);
    setIsDisable(true);
    const credit = bets.reduce((total, bet) => total + bet.Bet, 0);
	const newCredit = infoCredit - credit;

    if (infoCredit < credit) {
        setIsDisable(false);
        removeCoins([]);
		return
	}
      setInfo((prevSate) => {
        return {
          ...prevSate,
          credit: prevSate.credit - credit,
        };
      });
	console.log('setIsDisable',credit,infoCredit)

    setTimeout(() => {
      if (newCredit > 1000 && newCredit >= credit) {
        setIsDisable(false);
      } else {
        removeCoins([]);
        setIsDisable(false);
      }
    }, 13000);
  };

  const onRemoveCoins = () => {
    if (sound) {
      setRemovePlay(true);
    }
    removeCoins([]);
    setIsDisable(false);
  };

  const onToggleSound = () => {
    setSound((sound) => !sound);
  };

  const onExit = () => {
    // socketInstance.emit('playe', (res) => (window.location.pathname = '/lobby'));
    socketInstance.emit(playgroundEvents.playMove, { leave: true }, (res) => {
      history.push("/rl/lobby");
    });
  };

  return (
    <div className={style.mainDiv}>
      {removePlay && (
        <Sound
          url={removeSound}
          playStatus={Sound.status.PLAYING}
          onFinishedPlaying={() => setRemovePlay(false)}
        />
      )}
      <div className={style.innerMainDiv}>
        <div className={style.buttonContainer}>
          <button onClick={onToggleSound} className={`${style.iconButton}`}>
            {!sound ? (
              <i className="material-icons">volume_off</i>
            ) : (
              <i className="material-icons">volume_up</i>
            )}
          </button>
        </div>
        <div className={style.normalButtonContainer}>
          <button
            className={`${style.button} ${style.redButton}`}
            onClick={onExit}
          >
            <div className={style.buttonText}>خروج</div>
          </button>
        </div>
        <div className={style.normalButtonContainer}>
          <button
            onClick={onRemoveCoins}
            className={`${style.button} ${style.blueButton}`}
          >
            <div className={style.buttonText}>پاک کردن</div>
          </button>
        </div>
        <div className={style.normalButtonContainer}>
          {console.log("isDisable", isDisable, coins)}
          <button
            disabled={isDisable || coins.length <= 0 || (bets && (bets.reduce((total, bet) => total + bet.Bet, 0)) > infoCredit)}
            className={`${style.button} ${style.greenButton} ${
              style[(isDisable || coins.length < 1 || (bets && (bets.reduce((total, bet) => total + bet.Bet, 0)) > infoCredit)) && "disabled"]
            }`}
            onClick={setOpen}
          >
            <div className={style.buttonText}>چرخاندن</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ButtonBox;
