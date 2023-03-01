// Здесь советую передавать аргументы в эти функции как строки, ...
// ... так как если передавать их как числа, то точность может быть потеряна еще до того как число будет сконвертировано в строку.

// отдельная функция для конвертации E-нотации в строку
function ENotationToString (number) {
	let asString = number.toString();
	// Если нет "е" то возвращаем строку
	if (!asString.includes("e")) {
		return asString;
	}
	// Вычленяем часть числа до "е" и степень
	let beforeE = asString.split("e")[0];
	let power = asString.split((/e\+|e\-/))[1];
	let decimalLength = 0;
	// Если есть точка вычисляем длину десятичной части и соединяем целую и десятичную части
	if (asString.includes(".")) {
		let beforeDot = beforeE.split(".")[0];
		let betweenDotAndE = beforeE.split(".")[1];
		beforeE = beforeDot + betweenDotAndE;
		decimalLength = betweenDotAndE.length;
	}
	// Если степень положительная, нужно в конце добавить нули в размере разницы степени и десятичной части
	if (asString.includes("e+")) {
		return beforeE + "0".repeat(power - decimalLength);
	// Если степень отрицательная, нужно добавить нули между "0." и частью числа до "e", ...
	// ... но при этом у степени нужно отнять 1, так как при объединении целой и десятичной части, точка и так сдвинулась на шаг влево
	} else {
		return "0." + "0".repeat(power - 1) + beforeE;
	}
}

// Функция суммирования 
function sumAnyNumber (numberAsString1, numberAsString2) {
	numberAsString1 = ENotationToString(numberAsString1);
	numberAsString2 = ENotationToString(numberAsString2);
	// Если введенное число было BigInt, то удалим "n"
	numberAsString1 = numberAsString1.replace("n", "");
	numberAsString2 = numberAsString2.replace("n", "");
	// Делим число на часть до и после точки
	let wholePart1 = numberAsString1.split(".")[0];	
	let decimalPart1 = numberAsString1.split(".")[1];
	// Если была точка, то первоначальное число представлено как строка, но без точки
	// если не было точки, то нет изменений
	if (decimalPart1) {
		decimalLength1 = decimalPart1.length;
		fullNumber1 = wholePart1 + decimalPart1;
	}
	else {
		decimalLength1 = 0;
		fullNumber1 = wholePart1;
	}

	// То же самое для второго числа
	let wholePart2 = numberAsString2.split(".")[0];	
	let decimalPart2 = numberAsString2.split(".")[1];
	if (decimalPart2) {
		decimalLength2 = decimalPart2.length;
		fullNumber2 = wholePart2 + decimalPart2;
	}
	else {
		decimalLength2 = 0;
		fullNumber2 = wholePart2;
	}

	// Теперь приводим оба числа к "общему знаменателю", то есть если первое число было 1.02 и стало "102", 
	// ... то если второе число было 1.2, то оно должно должно стать "120", а не "12". Для этого добавляем в конец нужное количество нулей. 
	// Попутно определяем максимальное количество знаков после точки среди этих двух числе. 
	if (decimalLength1 < decimalLength2) {
		maxLength = decimalLength2;
		fullNumber1 = fullNumber1 + "0".repeat(decimalLength2 - decimalLength1);
	}
	else if (decimalLength1 > decimalLength2) {
		maxLength = decimalLength1;
		fullNumber2 = fullNumber2 + "0".repeat(decimalLength1 - decimalLength2);
	}
	else {
		maxLength = decimalLength1;
	}

	// Складываем числа как BigInt, потом превращаем результат в строку
	let bigintWithoutDecimals = BigInt(fullNumber1) + BigInt(fullNumber2);
	let stringWithoutDecimals = bigintWithoutDecimals.toString();
	// Посчитаем количество нулей в конце числа 
	let zeroesAtTheEnd = (stringWithoutDecimals.match(/0+$/)) ? (stringWithoutDecimals.length - stringWithoutDecimals.match(/0+$/).index) : 0;
	// Если изначально в одном из этих чисел была точка, возвращаем ее туда, где она была, если нет - то нет.
	let resultAsString = (maxLength > 0) ? (stringWithoutDecimals.slice(0, -maxLength) + "." + stringWithoutDecimals.slice(-maxLength)) : stringWithoutDecimals;
	// Если возможно вернуть результат как число без потери точности, возвращаем как число
	if (bigintWithoutDecimals <= 9007199254740991 && bigintWithoutDecimals >= -9007199254740991) {
		return Number(resultAsString);	
	// Если получившееся число имеет только нули после запятой, возвращаем его как BigInt без дробной части ... 
	} else if (zeroesAtTheEnd >= maxLength) {
		return BigInt(resultAsString.split(".")[0]);
	// ... в противном случаев возвращаем как строку.
	} else {
		return resultAsString;
	}
};

// Функция умножения
function mulAnyNumber (numberAsString1, numberAsString2) {
	numberAsString1 = ENotationToString(numberAsString1);
	numberAsString2 = ENotationToString(numberAsString2);
	// Если введенное число было BigInt, то удалим "n"
	numberAsString1 = numberAsString1.replace("n", "");
	numberAsString2 = numberAsString2.replace("n", "");
	// Делим число на часть до и после точки
	let wholePart1 = numberAsString1.split(".")[0];	
	let decimalPart1 = numberAsString1.split(".")[1];
	// Если была точка, то первоначальное число представлено как строка, но без точки
	// если не было точки, то нет изменений
	if (decimalPart1) {
		decimalLength1 = decimalPart1.length;
		fullNumber1 = wholePart1 + decimalPart1;
	}
	else {
		decimalLength1 = 0;
		fullNumber1 = wholePart1;
	}

	// То же самое для второго числа
	let wholePart2 = numberAsString2.split(".")[0];	
	let decimalPart2 = numberAsString2.split(".")[1];
	if (decimalPart2) {
		decimalLength2 = decimalPart2.length;
		fullNumber2 = wholePart2 + decimalPart2;
	}
	else {
		decimalLength2 = 0;
		fullNumber2 = wholePart2;
	}
	// Вычисляем суммарное количество знаков после точек в этих двух числах
	combinedLength = decimalLength1 + decimalLength2;

	// Умножаем числа как BigInt, потом превращаем результат в строку 
	let bigintWithoutDecimals = BigInt(fullNumber1) * BigInt(fullNumber2);
	let stringWithoutDecimals = bigintWithoutDecimals.toString();
	// Cчитаем количество нулей в конце числа (куда пока еще не вернули точку)
	let zeroesAtTheEnd = (stringWithoutDecimals.match(/0+$/)) ? stringWithoutDecimals.length - stringWithoutDecimals.match(/0+$/).index : 0;
	// Если изначально в этих числах были точки, ставим точку так, ...
	// ... чтобы количество знаков после точки было суммой количества знаков после точки в первоначальных числах.
	let resultAsString = (combinedLength > 0) ? (stringWithoutDecimals.slice(0, -combinedLength) + "." + stringWithoutDecimals.slice(-combinedLength)) : stringWithoutDecimals;
	// Если возможно вернуть результат как число без потери точности, возвращаем как число
	if (bigintWithoutDecimals <= 9007199254740991 && bigintWithoutDecimals >= -9007199254740991) {
		return Number(resultAsString);
	}
	// Если получившееся число имеет только нули после запятой, возвращаем его как BigInt без дробной части ... 
	// ... в противном случаев возвращаем как строку.
	else if (zeroesAtTheEnd >= combinedLength) {
		return BigInt(resultAsString.split(".")[0]);
	}
	else {
		return resultAsString;
	}
};

// Функция вычитания
function subAnyNumber (numberAsString1, numberAsString2) {	
	numberAsString1 = ENotationToString(numberAsString1);
	numberAsString2 = ENotationToString(numberAsString2);
	// Если введенное число было BigInt, то удалим "n"
	numberAsString1 = numberAsString1.replace("n", "");
	numberAsString2 = numberAsString2.replace("n", "");
	// Делим число на часть до и после точки
	let wholePart1 = numberAsString1.split(".")[0];	
	let decimalPart1 = numberAsString1.split(".")[1];
	// Если была точка, то первоначальное число представлено как строка, но без точки
	// если не было точки, то нет изменений
	if (decimalPart1) {
		decimalLength1 = decimalPart1.length;
		fullNumber1 = wholePart1 + decimalPart1;
	}
	else {
		decimalLength1 = 0;
		fullNumber1 = wholePart1;
	}

	// То же самое для второго числа
	let wholePart2 = numberAsString2.split(".")[0];	
	let decimalPart2 = numberAsString2.split(".")[1];
	if (decimalPart2) {
		decimalLength2 = decimalPart2.length;
		fullNumber2 = wholePart2 + decimalPart2;
	}
	else {
		decimalLength2 = 0;
		fullNumber2 = wholePart2;
	}

	// Теперь приводим оба числа к "общему знаменателю", то есть если первое число было 1.02 и стало "102", 
	// ... то если второе число было 1.2, то оно должно должно стать "120", а не "12". Для этого добавляем в конец нужное количество нулей. 
	// Попутно определяем максимальное количество знаков после точки среди этих двух числе. 
	if (decimalLength1 < decimalLength2) {
		maxLength = decimalLength2;
		fullNumber1 = fullNumber1 + "0".repeat(decimalLength2 - decimalLength1);
	}
	else if (decimalLength1 > decimalLength2) {
		maxLength = decimalLength1;
		fullNumber2 = fullNumber2 + "0".repeat(decimalLength1 - decimalLength2);
	}
	else {
		maxLength = decimalLength1;
	}

	// Вычитаем числа как BigInt, потом превращаем результат в строку
	let bigintWithoutDecimals = BigInt(fullNumber1) - BigInt(fullNumber2);
	let stringWithoutDecimals = bigintWithoutDecimals.toString();
	// Посчитаем количество нулей в конце числа (куда пока еще не вернули точку)
	let zeroesAtTheEnd = (stringWithoutDecimals.match(/0+$/)) ? stringWithoutDecimals.length - stringWithoutDecimals.match(/0+$/).index : 0;
	// Если изначально в одном из этих чисел была точка, возвращаем ее туда, где она была, если нет - то нет.
	let resultAsString = (maxLength > 0) ? (stringWithoutDecimals.slice(0, -maxLength) + "." + stringWithoutDecimals.slice(-maxLength)) : stringWithoutDecimals;
	// Если возможно вернуть результат как число без потери точности, возвращаем как число
	if (bigintWithoutDecimals <= 9007199254740991 && bigintWithoutDecimals >= -9007199254740991) {
		return Number(resultAsString);
	}
	// Если получившееся число имеет только нули после запятой, возвращаем его как BigInt без дробной части ... 
	// ... в противном случаев возвращаем как строку.
	else if (zeroesAtTheEnd >= maxLength) {
		return BigInt(resultAsString.split(".")[0]);
	}
	else {
		return resultAsString;
	}
};

// Функция деления
function divAnyNumber (numberAsString1, numberAsString2, decimalPrecision) {
	decimalPrecision = decimalPrecision || 15;
	numberAsString1 = ENotationToString(numberAsString1);
	numberAsString2 = ENotationToString(numberAsString2);
	// Если введенное число было BigInt, то удалим "n"
	numberAsString1 = numberAsString1.replace("n", "");
	numberAsString2 = numberAsString2.replace("n", "");
	// Делим число на часть до и после точки
	let wholePart1 = numberAsString1.split(".")[0];	
	let decimalPart1 = numberAsString1.split(".")[1];
	// Если была точка, то первоначальное число представлено как строка, но без точки
	// если не было точки, то нет изменений
	if (decimalPart1) {
		decimalLength1 = decimalPart1.length;
		fullNumber1 = wholePart1 + decimalPart1;
	}
	else {
		decimalLength1 = 0;
		fullNumber1 = wholePart1;
	}

	// То же самое для второго числа
	let wholePart2 = numberAsString2.split(".")[0];	
	let decimalPart2 = numberAsString2.split(".")[1];
	if (decimalPart2) {
		decimalLength2 = decimalPart2.length;
		fullNumber2 = wholePart2 + decimalPart2;
	}
	else {
		decimalLength2 = 0;
		fullNumber2 = wholePart2;
	}
	// Вычисляем разницу в количестве знаков после точек в этих двух числах
	let decimalDelta = decimalLength1 - decimalLength2;
	// Чтобы сохранить определенную точности при делении сделаем так, чтобы первое число было примерно равно второму...
	// ... если первое число больше или равно второму, то специальную переменную делаем равной 0, ...
	// ... если первое число меньше второго, то эту переменную делаем равной отрицательной разнице в их длине, ...
	// ... т.е. насколько первая переменная меньше второй.
	let fullLengthDelta = (fullNumber1.length < fullNumber2.length) ? -(fullNumber1.length - fullNumber2.length) : 0;
	// Перед тем как делить числа, умножаем первое число на заданный decimalPrecision и на отрицательную разницу в размерах.
	// Далее производим деление, превращаем результат в строку. 
	let bigintWithoutDecimals = (BigInt(fullNumber1) * 10n**BigInt(decimalPrecision) * 10n**BigInt(fullLengthDelta)) / BigInt(fullNumber2);
	let stringWithoutDecimals = bigintWithoutDecimals.toString();
	// Cчитаем количество нулей в конце числа 
	let zeroesAtTheEnd = (stringWithoutDecimals.match(/0+$/)) ? stringWithoutDecimals.length - stringWithoutDecimals.match(/0+$/).index : 0;
	// Сколько знаков после запятой нужно вернуть
	let decimalDebt = decimalPrecision + fullLengthDelta + decimalDelta;
	let resultAsString; 
	// Если дробную часть не нужно увеличивать, то число готово
	if (decimalDebt === 0) {
		resultAsString = stringWithoutDecimals;
	// Если decimalDebt меньше нуля это значит, что вместо того, чтобы увеличивать дробную часть нам нужно в конец числа добавить дополнительные нули
	} else if (decimalDebt < 0) {
		resultAsString = stringWithoutDecimals + "0".repeat(-decimalDebt);
	// Если нужно вставить больше дробных знаков чем длина слова, то сначала нужно вставить "0.", потом нужное колечество нулей, потом число
	} else if (decimalDebt >= stringWithoutDecimals.length) {
		resultAsString = "0." + "0".repeat(decimalDebt - stringWithoutDecimals.length) + stringWithoutDecimals;
	// Если нужно сделать меньше дробных знаков, чем длина слова, то вставляем "." по индексу
	} else {
		resultAsString = stringWithoutDecimals.slice(0, -decimalDebt) + "." + stringWithoutDecimals.slice(-decimalDebt);	
	}
	// Если возможно вернуть результат как число без потери точности, возвращаем как число
	if (bigintWithoutDecimals <= 9007199254740991 && bigintWithoutDecimals >= -9007199254740991) {
		return Number(resultAsString);
	// Если получившееся число имеет только нули после запятой, возвращаем его как BigInt без дробной части ... 
	} else if (zeroesAtTheEnd >= decimalDebt) {
		return BigInt(resultAsString.split(".")[0]);
	// ... в противном случаев возвращаем как строку.
	} else {
		return resultAsString;
	}
};


export {sumAnyNumber, mulAnyNumber, subAnyNumber, divAnyNumber};
