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

  public calculationControl = new FormControl<null | number>(null);

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

  public appendNumber(number: number): void {
    let updatedValue;

    if (this.calculationControl.value) {
      updatedValue = Number(`${this.calculationControl.value}${number}`);
    } else {
      updatedValue = Number(`${number}`);
    }

    this.calculationControl.setValue(updatedValue);
  }

  public applyOperator(operator: OPERATOR): void {
    switch (operator) {
      case OPERATOR.DELETE:
        this.calculationControl.setValue(null);
        break;
      case OPERATOR.ADD:
        this.calculationOperator.set(OPERATOR.ADD);
        this.firstInput.set(this.calculationControl.value);
        this.memory.set(`${this.firstInput()} + `);
        this.calculationControl.setValue(null);
        break;
      case OPERATOR.SUBSTRACT:
        this.calculationOperator.set(OPERATOR.SUBSTRACT);
        this.firstInput.set(this.calculationControl.value);
        this.memory.set(`${this.firstInput()} - `);
        this.calculationControl.setValue(null);
        break;
      case OPERATOR.DIVIDE:
        this.calculationOperator.set(OPERATOR.DIVIDE);
        this.firstInput.set(this.calculationControl.value);
        this.memory.set(`${this.firstInput()} / `);
        this.calculationControl.setValue(null);
        break;
      case OPERATOR.MULTIPLY:
        this.calculationOperator.set(OPERATOR.MULTIPLY);
        this.firstInput.set(this.calculationControl.value);
        this.memory.set(`${this.firstInput()} * `);
        this.calculationControl.setValue(null);
        break;
      case OPERATOR.EVALUATE:
        const firstInput = this.firstInput() ?? null;
        const secondInput = this.calculationControl.value ?? null;
        const calculationOperator = this.calculationOperator() ?? null;

        if (firstInput && secondInput && calculationOperator) {
          this.secondInput.set(this.calculationControl.value);
          this.memory.set(
            `${this.firstInput()} ${calculationOperator} ${
              this.calculationControl.value
            }`
          );
          const result = this.calculate(
            firstInput,
            secondInput,
            calculationOperator
          );
          console.log(firstInput, secondInput, operator, result);

          this.calculationControl.setValue(result);
        }
        break;
      case OPERATOR.RESET:
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
  private themeListener(): Subscription {
    return this.themeControl.valueChanges.subscribe((value) =>
      this.selectedTheme.set(value)
    );
  }
}
