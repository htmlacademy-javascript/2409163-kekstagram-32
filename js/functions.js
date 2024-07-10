// // Функция для проверки длины строки
// function checkStringLength(string, maxLength) {
//   return (string.length <= maxLength);
// }

// checkStringLength('приветт', 1);

// //Функция для проверки, является ли строка палиндромом

// function isPalindrome (string) {
//   const stringRemovedSpaces = string.replaceAll(' ','');
//   const stringFormatted = stringRemovedSpaces.toLowerCase();
//   let convertedString = '';

//   for (let i = stringFormatted.length - 1; i >= 0; i--) {
//     convertedString += stringFormatted[i];
//   }
//   return(stringFormatted === convertedString);
// }

//Функция проверки времени встречи. Вариант 1.
const convertTimeToArray = (time) => {
  const timeArray = time.split(':');
  return [+timeArray[0], +timeArray[1]];
};

const isWithinWorkHours = (startWorkTime, endWorkTime, startMeetingTime, meetingDuration) => {
  //Шаг 1. Преобразовывыем endWorkTime и startMeetingTime в массивы:
  const startWorkTimeArray = convertTimeToArray(startWorkTime);
  const endWorkTimeArray = convertTimeToArray(endWorkTime);
  const startMeetingTimeArray = convertTimeToArray(startMeetingTime);

  //Шаг 2. Рассчитываем время окончания встречи в формате массива
  const endMeetingTimeArray = [startMeetingTimeArray[0], startMeetingTimeArray[1]];
  let meetingLengthRemaining = meetingDuration;
  if (meetingDuration >= 60) {
    for (let i = 60; i <= meetingDuration; i += 60) {
      endMeetingTimeArray[0] += 1;
      meetingLengthRemaining -= 60;
    }
  }
  endMeetingTimeArray[1] = endMeetingTimeArray[1] + meetingLengthRemaining;
  if (endMeetingTimeArray[1] >= 60) {
    endMeetingTimeArray[0] += 1;
    endMeetingTimeArray[1] -= 60;
  }

  //Шаг 3. Сравниваем endMeetingTimeArray c endWorkTimeArray и startWorkTimeArray и выводим true/false
  if (endMeetingTimeArray[0] > endWorkTimeArray[0]) {
    return false;
  }

  if (endMeetingTimeArray[0] === endWorkTimeArray[0]) {
    if(endMeetingTimeArray[1] > endWorkTimeArray[1]) {
      return false;
    }
  }

  if (startMeetingTimeArray[0] < startWorkTimeArray[0]) {
    return false;
  }

  if (startMeetingTimeArray[0] === startWorkTimeArray[0]) {
    if (startMeetingTimeArray[1] < startWorkTimeArray[1]) {
      return false;
    }
  }

  return true;
};

console.log(isWithinWorkHours('08:00', '17:30', '14:00', 90)); // true
console.log(isWithinWorkHours('8:0', '10:0', '8:0', 120)); // true
console.log(isWithinWorkHours('08:00', '14:30', '14:00', 90)); // false
console.log(isWithinWorkHours('14:00', '17:30', '08:0', 90)); // false
console.log(isWithinWorkHours('8:00', '17:30', '08:00', 900)); // false


//Функция проверки времени встречи. Вариант 2.
const convertTimeToMin = (time) => {
  const [hours, minutes] = time.split(':');
  return hours * 60 + parseInt(minutes, 10);
};

const checkDuration = (startWorkTime, endWorkTime, startMeetingTime, meetingDuration) => {
  const startWorkTimeinMin = convertTimeToMin(startWorkTime);
  const endWorkTimeInMin = convertTimeToMin(endWorkTime);
  const startMeetingTimeInMin = convertTimeToMin(startMeetingTime);
  const endMeetingTimeInMin = startMeetingTimeInMin + meetingDuration;

  return startWorkTimeinMin <= startMeetingTimeInMin && endWorkTimeInMin >= endMeetingTimeInMin;
};

console.log(checkDuration('08:00', '17:30', '14:00', 90)); // true
console.log(checkDuration('8:0', '10:0', '8:0', 120)); // true
console.log(checkDuration('08:00', '14:30', '14:00', 90)); // false
console.log(checkDuration('14:00', '17:30', '08:0', 90)); // false
console.log(checkDuration('8:00', '17:30', '08:00', 900)); // false
