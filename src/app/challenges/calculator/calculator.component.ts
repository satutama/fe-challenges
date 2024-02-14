import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, effect, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

enum OPERATOR {
  DELETE = 'delete',
  ADD = '+',
  SUBSTRACT = '-',
  MULTIPLY = '*',
  DIVIDE = '/',
  EVALUATE = '=',
  RESET = 'reset',
}

@Component({
  selector: 'app-calculator',
  standalone: true,
  styleUrls: ['./calculator.component.scss'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './calculator.component.html',
})
export class CalculatorComponent implements OnInit, OnDestroy {
  public themeControl = new FormControl(1, { nonNullable: true });
  public selectedTheme = signal<number>(
    JSON.parse(window.localStorage.getItem('calculatorTheme') ?? '1')
  );

  public firstInput = signal<number | null>(null);
  public secondInput = signal<number | null>(null);
  public calculationOperator = signal<OPERATOR | null>(null);
  public memory = signal<string | null>(null);

  public calculationControl = new FormControl<null | string>(null);

  public operator = OPERATOR;
  private readonly subscriptions = new Subscription();

  constructor() {
    effect(() => {
      window.localStorage.setItem(
        'calculatorTheme',
        JSON.stringify(this.selectedTheme())
      );
    });
  }

  public ngOnInit(): void {
    this.themeControl.setValue(this.selectedTheme());
    this.subscriptions.add(this.themeListener());
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public appendNumber(number: string): void {
    let updatedValue;

    if (this.calculationControl.value) {
      updatedValue = `${this.calculationControl.value}${number}`;
    } else {
      updatedValue = `${number}`;
    }

    this.calculationControl.setValue(updatedValue);
  }

  public applyOperator(operator: OPERATOR): void {
    switch (operator) {
      case OPERATOR.DELETE:
        this.deleteMemories();
        break;
      case OPERATOR.ADD:
        this.operatorClicked(OPERATOR.ADD);
        break;
      case OPERATOR.SUBSTRACT:
        this.operatorClicked(OPERATOR.SUBSTRACT);
        break;
      case OPERATOR.DIVIDE:
        this.operatorClicked(OPERATOR.DIVIDE);
        break;
      case OPERATOR.MULTIPLY:
        this.operatorClicked(OPERATOR.MULTIPLY);
        break;
      case OPERATOR.EVALUATE:
        const calculationOperator = this.calculationOperator();
        this.evaluate(calculationOperator);
        break;
      case OPERATOR.RESET:
        this.deleteMemories();
        this.calculationControl.setValue(null);
    }
  }

  public get theme() {
    return this.themeControl.value;
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

  private operatorClicked(operator: OPERATOR) {
    // continue here - refactor and DRY
    const firstInput = this.firstInput();
    const secondInput = this.secondInput();
    const currentInput = this.calculationControl.value;
    const activeOperator = this.calculationOperator();

    /*check if there's an input*/
    if (!!currentInput) {
      this.calculationOperator.set(operator); // set active operator
      this.secondInput.set(null); // remove second input

      /*  if there's already second input, set as the first input.
          for now, if there's a second input, first input must be available as well.
          So check on first not needed in this case */
      if (!!secondInput || !firstInput) {
        this.firstInput.set(Number(currentInput));
        this.memory.set(`${this.firstInput()} ${operator} `);
        this.calculationControl.setValue(null);
      } else if (!!firstInput) {
        /*  If there's no second input then we check on the first input.
            If it is available then we calculate the current and the first input.
            Then we set the result as the first input. */

        const result = this.calculate(
          firstInput,
          Number(currentInput),
          activeOperator
        );

        this.firstInput.set(result);
        this.memory.set(`${this.firstInput()} ${operator} `);
        this.calculationControl.setValue(null);
      }
    }
  }

  private evaluate(operator: OPERATOR | null) {
    const firstInput = this.firstInput() ?? null;
    const secondInput = this.secondInput() ?? null;
    const current = this.calculationControl.value;

    if (operator && !secondInput) {
      if (!!current && !!firstInput) {
        this.secondInput.set(Number(current));
        this.memory.set(
          `${this.firstInput()} ${operator} ${this.secondInput()}`
        );
        const result = this.calculate(firstInput, Number(current), operator);

        this.calculationControl.setValue(`${result}`);
      }
    }
  }

  private deleteMemories() {
    this.firstInput.set(null);
    this.secondInput.set(null);
    this.calculationOperator.set(null);
    this.memory.set(null);
  }
  private themeListener(): Subscription {
    return this.themeControl.valueChanges.subscribe((value) =>
      this.selectedTheme.set(value)
    );
  }
}
