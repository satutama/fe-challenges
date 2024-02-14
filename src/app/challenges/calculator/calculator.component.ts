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
    const firstInputAvailable = !!this.firstInput();
    switch (operator) {
      case OPERATOR.DELETE:
        this.calculationControl.setValue(null);
        break;
      case OPERATOR.ADD:
        this.operatorClicked();
        break;
      case OPERATOR.SUBSTRACT:
        if (firstInputAvailable) {
          this.evaluate();
        }
        this.calculationOperator.set(OPERATOR.SUBSTRACT);
        this.firstInput.set(Number(this.calculationControl.value));
        this.memory.set(`${this.firstInput()} - `);
        this.calculationControl.setValue(null);
        break;
      case OPERATOR.DIVIDE:
        if (firstInputAvailable) {
          console.log(this.firstInput());

          this.evaluate();
        }
        this.calculationOperator.set(OPERATOR.DIVIDE);
        this.firstInput.set(Number(this.calculationControl.value));
        this.memory.set(`${this.firstInput()} / `);
        this.calculationControl.setValue(null);
        break;
      case OPERATOR.MULTIPLY:
        if (firstInputAvailable) {
          this.evaluate();
        }
        this.calculationOperator.set(OPERATOR.MULTIPLY);
        this.firstInput.set(Number(this.calculationControl.value));
        this.memory.set(`${this.firstInput()} * `);
        this.calculationControl.setValue(null);
        break;
      case OPERATOR.EVALUATE:
        this.evaluate();
        break;
      case OPERATOR.RESET:
        this.firstInput.set(null);
        this.secondInput.set(null);
        this.calculationOperator.set(null);
        this.calculationControl.setValue(null);
        this.memory.set(null);
    }
  }

  public get theme() {
    return this.themeControl.value;
  }

  private calculate(
    firstInput: number,
    secondInput: number,
    operator: OPERATOR
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

  private operatorClicked() {
    // continue here - refactor and DRY
    const firstInput = this.firstInput();
    const secondInput = this.secondInput();
    const currentInput = this.calculationControl.value;

    if (!!currentInput) {
      if (!!secondInput) {
        this.calculationOperator.set(OPERATOR.ADD);
        this.firstInput.set(Number(currentInput));
        this.memory.set(`${this.firstInput()} + `);
        this.calculationControl.setValue(null);
      } else if (!!firstInput) {
        const result = firstInput + Number(currentInput);
        this.firstInput.set(result);
        this.secondInput.set(null);
        this.memory.set(`${this.firstInput()} + `);
        this.calculationControl.setValue(null);
        console.log(this.firstInput());
      } else {
        this.calculationOperator.set(OPERATOR.ADD);
        this.firstInput.set(Number(this.calculationControl.value));
        this.memory.set(`${this.firstInput()} + `);
        this.calculationControl.setValue(null);
      }
    } else {
      return;
    }
  }

  private evaluate() {
    const current = this.calculationControl.value;
    if (current) {
      this.secondInput.set(Number(this.calculationControl.value));
    }
    const firstInput = this.firstInput() ?? null;
    const secondInput = this.secondInput() ?? null;
    const calculationOperator = this.calculationOperator() ?? null;

    if (firstInput && secondInput && calculationOperator) {
      this.memory.set(
        `${this.firstInput()} ${calculationOperator} ${this.secondInput()}`
      );
      const result = this.calculate(
        firstInput,
        secondInput,
        calculationOperator
      );
      this.calculationControl.setValue(`${result}`);
    }
  }
  private themeListener(): Subscription {
    return this.themeControl.valueChanges.subscribe((value) =>
      this.selectedTheme.set(value)
    );
  }
}
