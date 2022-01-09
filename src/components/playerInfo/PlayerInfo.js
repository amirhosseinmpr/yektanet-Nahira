import React, { useEffect, useState } from 'react';
import { generalEvents } from '../../api/socketConfig';
import { socketInstance } from '../../api/socketManager';
import style from './PlayerInfo.module.scss';
import { commaFormatter } from '../../utils/functions/functions';

const PlayerInfo = ({ info }) => {
	return (
		<div className={style.mainDiv}>
			<div className={style.levelContainer}>
				{' '}
				سطح <span>{info.level}</span>
			</div>
			<div className={style.nameContainer}>{info.name}</div>
			<div className={style.creditContainer}>{commaFormatter(info.credit)} جم</div>
		</div>
	);
};

export default PlayerInfo;
