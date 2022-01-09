import numeral from 'numeral';
export const creditFormatter = (number) => {
	if (number >= 1000000) {
		if (number % 1000000 > 0) {
			return (number / 1000000).toFixed(1) + 'M';
		} else {
			return (number / 1000000).toFixed(0) + 'M';
		}
	} else if (number >= 1000) {
		if (number % 1000 > 0) {
			return (number / 1000).toFixed(1) + 'K';
		} else {
			return (number / 1000).toFixed(0) + 'K';
		}
	} else {
		return number;
	}
};
export const commaFormatter  = (number) => {
	return numeral(number).format("0,0");
  };

