import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, effect, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CalculatorService } from './calculator.service';

export enum OPERATOR {
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
  public operator = OPERATOR;

  public themeControl = new FormControl(1, { nonNullable: true });
  public selectedTheme = signal<number>(
    JSON.parse(window.localStorage.getItem('calculatorTheme') ?? '1')
  );

  public memory = this.calculatorService.memory;
  public calculationControl = new FormControl<null | string>(null);

  private readonly subscriptions = new Subscription();

  constructor(private calculatorService: CalculatorService) {
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
    const updatedValue = this.calculationControl.value
      ? `${this.calculationControl.value}${number}`
      : number;

    this.calculationControl.setValue(updatedValue);
  }

  public applyOperator(operator: OPERATOR): void {
    const formValue = Number(this.calculationControl.value);

    switch (operator) {
      case OPERATOR.DELETE:
        this.calculatorService.deleteMemories();
        break;
      case OPERATOR.ADD:
        this.calculatorService.operatorClicked(OPERATOR.ADD, formValue);
        break;
      case OPERATOR.SUBSTRACT:
        this.calculatorService.operatorClicked(OPERATOR.SUBSTRACT, formValue);
        break;
      case OPERATOR.DIVIDE:
        this.calculatorService.operatorClicked(OPERATOR.DIVIDE, formValue);
        break;
      case OPERATOR.MULTIPLY:
        this.calculatorService.operatorClicked(OPERATOR.MULTIPLY, formValue);
        break;
      case OPERATOR.EVALUATE:
        this.calculatorService.evaluate(formValue);
        break;
      case OPERATOR.RESET:
        this.calculatorService.deleteMemories();
    }

    const currentInput =
      this.calculatorService.currentInput()?.toString() || null;

    this.calculationControl.setValue(currentInput);
  }

  public get theme() {
    return this.themeControl.value;
  }

  private themeListener(): Subscription {
    return this.themeControl.valueChanges.subscribe((value) =>
      this.selectedTheme.set(value)
    );
  }
}
