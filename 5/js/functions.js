// Функция для проверки длины строки
function checkStringLength(string, maxLength) {
  return (string.length <= maxLength);
}

checkStringLength('приветт', 1);

//Функция для проверки, является ли строка палиндромом

function isPalindrome (string) {
  const stringRemovedSpaces = string.replaceAll(' ','');
  const stringFormatted = stringRemovedSpaces.toLowerCase();
  let convertedString = '';

  for (let i = stringFormatted.length - 1; i >= 0; i--) {
    convertedString += stringFormatted[i];
  }
  return(stringFormatted === convertedString);
}

// console.log(isPalindrome('Лёша на полке клопа нашёл '));
