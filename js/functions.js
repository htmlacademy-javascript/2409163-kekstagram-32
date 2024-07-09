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

//Функция проверки времени встречи

const isWithinWorkHours = (startWorkTime, endWorkTime, startMeetingTime, meetingLength) => {
  //Шаг 1. Преобразовывыем endWorkTime и startMeetingTime в массивы и приводим строки в числа:
  let endWorkTimeArray = endWorkTime.split(':');
  endWorkTimeArray = [+endWorkTimeArray[0], +endWorkTimeArray[1]];
  let startMeetingTimeArray = startMeetingTime.split(':');
  startMeetingTimeArray = [+startMeetingTimeArray[0], +startMeetingTimeArray[1]];

  //Шаг 2. Рассчитываем время окончания встречи в формате массива
  const endMeetingTimeArray = [startMeetingTimeArray[0], startMeetingTimeArray[1]];
  let meetingLengthRemaining = meetingLength;
  if (meetingLength >= 60) {
    for (let i = 60; i <= meetingLength; i += 60) {
      endMeetingTimeArray[0] += 1;
      meetingLengthRemaining -= 60;
    }
  }
  endMeetingTimeArray[1] = endMeetingTimeArray[1] + meetingLengthRemaining;
  if (endMeetingTimeArray[1] >= 60) {
    endMeetingTimeArray[0] += 1;
    endMeetingTimeArray[1] -= 60;
  }

  //Шаг 3. Выводим в консоль время окончани рабочего дня и всремя окончания встречи для провреки кода
  console.log(
    `Время окончания рабочего дня: ${endWorkTimeArray.join(':')}. Время окончания встречи: ${endMeetingTimeArray.join(':')}
  `);

  //Шаг 4. Сравниваем endMeetingTimeArray и endWorkTimeArray и выводим true/false
  if (endMeetingTimeArray[0] > endWorkTimeArray[0]) {
    return false;
  } else if (endMeetingTimeArray[0] === endWorkTimeArray[0]) {
    if(endMeetingTimeArray[1] > endWorkTimeArray[1]) {
      return false;
    }
  }
  return true;
};

console.log(isWithinWorkHours('8:00', '10:00', '09:00', 75));
