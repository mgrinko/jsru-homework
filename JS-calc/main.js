'use strict';

class Calculator {
    constructor() {
        this.result = 0;
        this.operand = '';
        this.previousOperand = '';
        this.curOperation = '';
        this.specialOperations = {
            'sqrt': Math.sqrt,
            'divideBy': (value) => {
                return 1 / value
            },
            '+/-': (value) => {
                return -value
            }
        };

        this.input = document.getElementById('input-field');
        this.calculation = document.getElementById('calculation');
        let numButtons = document.querySelectorAll('button');

        for (let i = 0; i < numButtons.length; i++) {
            numButtons[i].addEventListener('click', this.numButtonClick.bind(this));
        }
    }

    numButtonClick(e) {
        this.checkValue(e.target.value)
    }

    checkValue(value) {
        if (value === 'C') {
            this.result = 0;
            this.operand = '';
            this.previousOperand = '';
            this.curOperation = '';
            this.input.value = 0;
            this.calculation.innerHTML = '';

        } else if (this.result === 0 && value === '0' || this.operand === '0' && value === '0') {
            return;
        }
        else if (value >= '0' && value <= '9') {
            this.operand += +value;
            this.showResult(this.operand);
        } else {
            this.operatorClicked(value);
        }
    }

    operatorClicked(operator) {
        if (this.specialOperations[operator] !== undefined) {
            let specialOperator = this.specialOperations[operator];

            if (this.operand !== '') {
                this.result = specialOperator(this.operand);
            } else {
                this.result = specialOperator(this.result);
            }
        } else {
            if (this.operand !== '') {
                switch (this.curOperation) {
                    case '':
                        this.result = +this.operand;
                        break;
                    case '+':
                        this.result += +this.operand;
                        break;
                    case '-':
                        this.result -= +this.operand;
                        break;
                    case '*':
                        this.result *= +this.operand;
                        break;
                    case '/':
                        this.result /= +this.operand;
                        break;
                }
            }
        }
        this.showResult(this.result);
        this.showCalculation(this.operand, operator);
        this.curOperation = operator;
        this.operand = '';
    }

    showResult(result) {
        this.input.value = result;
    }

    showCalculation(operand, operator) {
        let text = this.calculation.innerHTML;

        if (this.operand !== '') {
            this.calculation.innerHTML += operand + ' ' + operator + ' ';
        } else {
            this.calculation.innerHTML = text.slice(0, text.length - 2) + operator + ' ';
        }
    }

}

let calc1 = new Calculator();