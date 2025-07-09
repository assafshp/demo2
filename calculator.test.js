import { Calculator } from './calculator.js';

describe('Calculator', () => {
    let calculator;
    let mockPreviousDisplay;
    let mockCurrentDisplay;

    beforeEach(() => {
        // Mock the DOM elements that Calculator interacts with
        mockPreviousDisplay = { textContent: '' };
        mockCurrentDisplay = {
            textContent: '',
            classList: {
                add: jest.fn(),
                remove: jest.fn()
            }
        };
        calculator = new Calculator(mockPreviousDisplay, mockCurrentDisplay);
    });

    // Test clear method
    test('should clear all values', () => {
        calculator.currentOperand = '123';
        calculator.previousOperand = '456';
        calculator.operation = '+';
        calculator.clear();
        expect(calculator.currentOperand).toBe('');
        expect(calculator.previousOperand).toBe('');
        expect(calculator.operation).toBe(undefined);
    });

    // Test clearEntry method
    test('should clear the current operand only', () => {
        calculator.currentOperand = '123';
        calculator.previousOperand = '456';
        calculator.operation = '+';
        calculator.clearEntry();
        expect(calculator.currentOperand).toBe('');
        expect(calculator.previousOperand).toBe('456');
        expect(calculator.operation).toBe('+');
    });

    // Test appendNumber method
    test('should append a number to the current operand', () => {
        calculator.appendNumber('1');
        calculator.appendNumber('2');
        expect(calculator.currentOperand).toBe('12');
    });

    test('should not append multiple decimals', () => {
        calculator.appendNumber('1');
        calculator.appendNumber('.');
        calculator.appendNumber('2');
        calculator.appendNumber('.');
        expect(calculator.currentOperand).toBe('1.2');
    });

    test('should limit input length', () => {
        calculator.currentOperand = '123456789012345'; // 15 chars
        calculator.appendNumber('6'); // 16th char
        expect(calculator.currentOperand).toBe('123456789012345');
    });

    // Test chooseOperation method
    test('should set the operation and move current to previous operand', () => {
        calculator.appendNumber('10');
        calculator.chooseOperation('+');
        expect(calculator.previousOperand).toBe('10');
        expect(calculator.currentOperand).toBe('');
        expect(calculator.operation).toBe('+');
    });

    test('should compute when choosing new operation if previous operation exists', () => {
        calculator.appendNumber('5');
        calculator.chooseOperation('+');
        calculator.appendNumber('3');
        calculator.chooseOperation('-');
        expect(calculator.previousOperand).toBe('8'); // 5 + 3 = 8
        expect(calculator.currentOperand).toBe('');
        expect(calculator.operation).toBe('-');
    });

    test('should not choose operation if current operand is empty', () => {
        calculator.chooseOperation('+');
        expect(calculator.previousOperand).toBe('');
        expect(calculator.currentOperand).toBe('');
        expect(calculator.operation).toBe(undefined);
    });

    // Test compute method - basic operations
    test('should correctly add numbers', () => {
        calculator.previousOperand = '5';
        calculator.currentOperand = '3';
        calculator.operation = '+';
        calculator.compute();
        expect(calculator.currentOperand).toBe('8');
    });

    test('should correctly subtract numbers', () => {
        calculator.previousOperand = '10';
        calculator.currentOperand = '4';
        calculator.operation = '-';
        calculator.compute();
        expect(calculator.currentOperand).toBe('6');
    });

    test('should correctly multiply numbers', () => {
        calculator.previousOperand = '6';
        calculator.currentOperand = '7';
        calculator.operation = '*';
        calculator.compute();
        expect(calculator.currentOperand).toBe('42');
    });

    test('should correctly divide numbers', () => {
        calculator.previousOperand = '100';
        calculator.currentOperand = '10';
        calculator.operation = '/';
        calculator.compute();
        expect(calculator.currentOperand).toBe('10');
    });

    test('should handle decimal results', () => {
        calculator.previousOperand = '1';
        calculator.currentOperand = '3';
        calculator.operation = '/';
        calculator.compute();
        expect(calculator.currentOperand).toBe(parseFloat((1/3).toFixed(10)).toString());
    });

    // Test compute method - error handling
    test('should handle division by zero', () => {
        calculator.previousOperand = '5';
        calculator.currentOperand = '0';
        calculator.operation = '/';
        calculator.compute();
        expect(calculator.currentOperand).toBe('Error: Division by zero');
        expect(calculator.previousOperand).toBe('');
        expect(calculator.operation).toBe(undefined);
    });

    test('should handle invalid input', () => {
        calculator.previousOperand = 'abc';
        calculator.currentOperand = '3';
        calculator.operation = '+';
        calculator.compute();
        expect(calculator.currentOperand).toBe('Error: Invalid input');
        expect(calculator.previousOperand).toBe('');
        expect(calculator.operation).toBe(undefined);
    });

    test('should handle result too large (overflow)', () => {
        calculator.previousOperand = Number.MAX_VALUE.toString();
        calculator.currentOperand = '2';
        calculator.operation = '*';
        calculator.compute();
        expect(calculator.currentOperand).toBe('Error: Result too large');
        expect(calculator.previousOperand).toBe('');
        expect(calculator.operation).toBe(undefined);
    });

    test('should handle invalid operation', () => {
        calculator.previousOperand = '5';
        calculator.currentOperand = '3';
        calculator.operation = '%'; // Invalid operation
        calculator.compute();
        expect(calculator.currentOperand).toBe('Error: Invalid operation');
        expect(calculator.previousOperand).toBe('');
        expect(calculator.operation).toBe(undefined);
    });

    // Test updateDisplay method
    test('should update current display', () => {
        calculator.currentOperand = '123';
        calculator.updateDisplay();
        expect(mockCurrentDisplay.textContent).toBe('123');
    });

    test('should update previous and current display with operation', () => {
        calculator.previousOperand = '10';
        calculator.operation = '+';
        calculator.currentOperand = '5';
        calculator.updateDisplay();
        expect(mockPreviousDisplay.textContent).toBe('10 +');
        expect(mockCurrentDisplay.textContent).toBe('5');
    });

    test('should apply error-message class on error', () => {
        calculator.currentOperand = 'Error: Something';
        calculator.updateDisplay();
        expect(mockCurrentDisplay.classList.add).toHaveBeenCalledWith('error-message');
        expect(mockCurrentDisplay.classList.remove).not.toHaveBeenCalledWith('error-message');
    });

    test('should remove error-message class when no error', () => {
        // First set an error, then clear it to test removal
        calculator.currentOperand = 'Error: Something';
        calculator.updateDisplay();
        calculator.currentOperand = '123';
        calculator.updateDisplay();
        expect(mockCurrentDisplay.classList.remove).toHaveBeenCalledWith('error-message');
    });

    test('should handle empty previous operand when operation is not null', () => {
        calculator.previousOperand = '';
        calculator.currentOperand = '5';
        calculator.operation = '+';
        calculator.updateDisplay();
        expect(mockPreviousDisplay.textContent).toBe('');
        expect(mockCurrentDisplay.textContent).toBe('5');
    });
}); 