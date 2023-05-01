const formatDays = (days: string) => {
  const splitDays = days.split('');
  const formattedDays = splitDays.map(char => {
    if (char === ',') {
      return ', ';
    } else {
      return char;
    }
  });
  return formattedDays.join('');
};

export default formatDays;
