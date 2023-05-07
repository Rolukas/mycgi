// Get an string with the format "L,M,Mi,J,V,S,D" and return an string with the format "L, M, Mi, J, V, S y D"
const formatDays = (days: string): string => {
  const daysArray = days.split(',');
  const daysArrayLength = daysArray.length;
  let daysString = '';
  daysArray.forEach((day, index) => {
    if (index === daysArrayLength - 1) {
      daysString += `y ${day}`;
    } else {
      if (index === daysArrayLength - 2) {
        daysString += `${day} `;
      } else {
        daysString += `${day}, `;
      }
    }
  });
  return daysString;
};

export default formatDays;
