class Calculator {
    constructor(previousOperandDisplay, currentOperandDisplay) {
        this.previousOperandDisplay = previousOperandDisplay;
        this.currentOperandDisplay = currentOperandDisplay;
        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    clearEntry() {
        this.currentOperand = '';
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        if (this.currentOperand.length >= 15) return; // Prevent excessively long numbers
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);

        if (isNaN(prev) || isNaN(current)) {
            this.currentOperand = 'Error: Invalid input';
            this.previousOperand = '';
            this.operation = undefined;
            return;
        }

        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '/':
                if (current === 0) {
                    this.currentOperand = 'Error: Division by zero';
                    this.previousOperand = '';
                    this.operation = undefined;
                    return;
                }
                computation = prev / current;
                break;
            default:
                this.currentOperand = 'Error: Invalid operation';
                this.previousOperand = '';
                this.operation = undefined;
                return;
        }

        if (!isFinite(computation)) {
            this.currentOperand = 'Error: Result too large';
            this.previousOperand = '';
            this.operation = undefined;
            return;
        }

        this.currentOperand = parseFloat(computation.toFixed(10)).toString();
        this.operation = undefined;
        this.previousOperand = '';
    }

    updateDisplay() {
        this.currentOperandDisplay.textContent = this.currentOperand;
        if (this.operation != null && this.previousOperand !== '') {
            this.previousOperandDisplay.textContent = `${this.previousOperand} ${this.operation}`;
        } else {
            this.previousOperandDisplay.textContent = '';
        }

        if (this.currentOperand.startsWith('Error:')) {
            this.currentOperandDisplay.classList.add('error-message');
        } else {
            this.currentOperandDisplay.classList.remove('error-message');
        }
    }
}

export { Calculator }; 