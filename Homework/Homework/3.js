// Мое решение наверное не оптимальное, ну хоть что-то...
// Я не использовал eval() из-за потенциальных угроз безопасности.

class Product {
    constructor(name, price, quantity, description) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.description = description;
    }
};

const bread = new Product("Bread", 40, 100, "Borodino");
const butter = new Product("Butter", 40, 100, "Krestyanskoe");
const milk = new Product("Milk", 60, 100, "Belaya Reka");

let products = [bread, butter, milk];

products.filterCustom = function (parameters) {
    parameters = parameters.split("&");
    for (let i in parameters) {
        parameters[i] = parameters[i].replace(/([><=])([^<>=]*)$/, '$1-$2');
        parameters[i] = parameters[i].split("-");
    }
    let matchingObjects = [];
    for (let product of products) {
        let misses = 0;
        for (let condition of parameters) {
            switch (condition[1]) {
                case 'contains':
                    if (!product[condition[0]].includes(condition[2])) {
                        misses += 1;
                    }
                    break;
                case 'ends':
                    if (!product[condition[0]].endsWith(condition[2])) {
                        misses += 1;
                    }
                    break;
                case 'starts':
                    if (!product[condition[0]].startsWith(condition[2])) {
                        misses += 1;
                    }
                    break;
                default:
                    if (!compare(product[condition[0]], condition[2], condition[1]))
                        misses +=1;
                    break;
            }

        }
        if (misses == 0) {
            matchingObjects.push(product);
        }
    }
    return matchingObjects;

    function compare (firstNumber, secondNumber, operator) {
        switch (operator) {
            case '<':
                if (firstNumber < secondNumber) {
                    return true;
                }
                break;
            case '>':
                if (firstNumber > secondNumber) {
                    return true;
                }
                break;
            case '=':
                if (firstNumber == secondNumber) {
                    return true;
                }
                break;
            case '<=':
                if (firstNumber <= secondNumber) {
                    return true;
                }
                break;
            case '>=':
                if (firstNumber >= secondNumber) {
                    return true;
                }
                break;
        }

    }
};

let answer = products.filterCustom("name-contains-re&price-=40&quantity->=5&description-ends-no");
console.log(answer);


answer = products.filterCustom("name-starts-Mi&quantity-=100");
console.log(answer);