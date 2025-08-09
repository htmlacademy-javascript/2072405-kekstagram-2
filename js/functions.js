
// Функция для проверки длины строки
function checkStringLength (string, maxLength) {
  return string.length <= maxLength;
}

checkStringLength('проверяемая строка', 20);
checkStringLength('проверяемая строка', 18);
checkStringLength('проверяемая строка', 10);

// Функция для проверки, является ли строка палиндромом
function isPalindrome(string) {
  const normalizedString = string.replaceAll(' ', '').toLowerCase();
  let reversedString = '';
  for (let i = normalizedString.length - 1; i >= 0; i--) {
    reversedString += normalizedString[i];
  }
  return normalizedString === reversedString;
}

isPalindrome('топот');
isPalindrome('ДовОд');
isPalindrome('Кекс');
isPalindrome('Лёша на полке клопа нашёл ');

// Функция для возврата числа из строки
function getNumber (input) {
  const string = input.toString();
  let result = '';
  for (let i = 0; i < string.length; i++) {
    const number = parseInt(string[i], 10);

    if (!Number.isNaN(number)) {
      result += string[i];
    }
  }
  return result.length ? parseInt(result, 10) : NaN;
}

getNumber(2023);
getNumber('ECMAScript 2022');
getNumber('1 кефир, 0.5 батона');
getNumber(-1);
getNumber(1.5);
getNumber('ыв');
