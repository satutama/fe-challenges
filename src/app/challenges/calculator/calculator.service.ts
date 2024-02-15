import { Injectable, signal } from '@angular/core';
import { OPERATOR } from './calculator.component';

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  public firstOperand = signal<number | null>(null);
  public secondOperand = signal<number | null>(null);
  public currentInput = signal<number | null>(null);
  public operator = signal<OPERATOR | null>(null);
  public memory = signal<string | null>(null);

  constructor() {}

  public applyOperator(operator: OPERATOR, formInput: number): void {
    switch (operator) {
      case OPERATOR.DELETE:
        this.deleteMemories(formInput);
        break;
      case OPERATOR.ADD:
        this.operatorClicked(OPERATOR.ADD, formInput);
        break;
      case OPERATOR.SUBSTRACT:
        this.operatorClicked(OPERATOR.SUBSTRACT, formInput);
        break;
      case OPERATOR.DIVIDE:
        this.operatorClicked(OPERATOR.DIVIDE, formInput);
        break;
      case OPERATOR.MULTIPLY:
        this.operatorClicked(OPERATOR.MULTIPLY, formInput);
        break;
      case OPERATOR.EVALUATE:
        this.evaluate(formInput);
        break;
      case OPERATOR.RESET:
        this.deleteMemories();
    }
  }

  private operatorClicked(operator: OPERATOR, currentInput?: number | null) {
    // continue here - refactor and DRY
    const firstInput = this.firstOperand();
    const secondInput = this.secondOperand();
    const activeOperator = this.operator();

    /*check if there's an input*/
    if (!!currentInput || currentInput === 0) {
      this.operator.set(operator); // set active operator
      this.secondOperand.set(null); // remove second input

      /*  if there's already second input, set as the first input.
          for now, if there's a second input, first input must be available as well.
          So check on first not needed in this case */
      if (!!secondInput || !firstInput) {
        this.firstOperand.set(Number(currentInput));
        this.memory.set(`${this.firstOperand()} ${operator} `);
        this.currentInput.set(null);
      } else if (!!firstInput) {
        /*  If there's no second input then we check on the first input.
            If it is available then we calculate the current and the first input.
            Then we set the result as the first input. */

        const result = this.calculate(
          firstInput,
          Number(currentInput),
          activeOperator
        );

        this.firstOperand.set(result);
        this.memory.set(`${this.firstOperand()} ${operator} `);
        this.currentInput.set(null);
      }
    }
  }

  private evaluate(currentInput?: number) {
    const firstInput = this.firstOperand() ?? null;
    const secondInput = this.secondOperand() ?? null;

    const operator = this.operator();

    if (operator && !secondInput) {
      if (
        (!!currentInput || currentInput === 0) &&
        (!!firstInput || firstInput === 0)
      ) {
        this.secondOperand.set(currentInput);
        this.memory.set(
          `${this.firstOperand()} ${operator} ${this.secondOperand()}`
        );
        const result = this.calculate(firstInput, currentInput, operator);

        this.currentInput.set(result);
      }
    }
  }

  private deleteMemories(currentInput?: number) {
    this.firstOperand.set(null);
    this.secondOperand.set(null);
    this.operator.set(null);
    this.memory.set(null);

    if (currentInput) {
      this.currentInput.set(currentInput);
    } else {
      this.currentInput.set(null);
    }
  }

  private calculate(
    firstInput: number,
    secondInput: number,
    operator: OPERATOR | null
  ): number {
    switch (operator) {
      case OPERATOR.ADD:
        return firstInput + secondInput;
      case OPERATOR.MULTIPLY:
        return firstInput * secondInput;
      case OPERATOR.DIVIDE:
        return firstInput / secondInput;
      case OPERATOR.SUBSTRACT:
        return firstInput - secondInput;
      default:
        return 0;
    }
  }
}
