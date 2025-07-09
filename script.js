import { Calculator } from './calculator.js';

// DOM elements
const currentOperandDisplay = document.querySelector('.current-operand');
const previousOperandDisplay = document.querySelector('.previous-operand');

const calculator = new Calculator(previousOperandDisplay, currentOperandDisplay);

const numberButtons = document.querySelectorAll('.number');
const decimalButton = document.querySelector('.decimal');
const operationButtons = document.querySelectorAll('.operation');
const equalsButton = document.querySelector('.equals');
const clearButton = document.querySelector('.clear[data-clear="all"]');
const clearEntryButton = document.querySelector('.clear-entry[data-clear="entry"]');

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.dataset.value);
    calculator.updateDisplay();
  });
});

decimalButton.addEventListener('click', () => {
  calculator.appendNumber(decimalButton.dataset.value);
  calculator.updateDisplay();
});

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.dataset.operation);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
});

clearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
});

clearEntryButton.addEventListener('click', () => {
    calculator.clearEntry();
    calculator.updateDisplay();
});

// Keyboard support
document.addEventListener('keydown', e => {
    if (/^[0-9]$/.test(e.key)) {
        e.preventDefault();
        calculator.appendNumber(e.key);
    } else if (['+', '-', '*', '/'].includes(e.key)) {
        e.preventDefault();
        calculator.chooseOperation(e.key);
    } else if (e.key === '.' || e.key === ',') {
        e.preventDefault();
        calculator.appendNumber('.');
    } else if (e.key === '=' || e.key === 'Enter') {
        e.preventDefault();
        calculator.compute();
    } else if (e.key === 'Escape') {
        e.preventDefault();
        calculator.clear();
    } else if (e.key === 'Backspace') {
        e.preventDefault();
        // Backspace logic needs to be added to the Calculator class or handled here by manipulating currentOperand directly
        if (calculator.currentOperand.length > 0) {
            calculator.currentOperand = calculator.currentOperand.slice(0, -1);
        }
    } else if (e.key === 'Delete') { // Clear Entry on Delete key
        e.preventDefault();
        calculator.clearEntry();
    }
    calculator.updateDisplay();
});

// Export for testing
// export { Calculator }; 