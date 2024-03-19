import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, effect, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
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

  public themeControl = new FormGroup({
    theme: new FormControl(1, { nonNullable: true }),
  });
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
    this.themeControl.controls.theme.setValue(this.selectedTheme());
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
    this.calculatorService.applyOperator(operator, formValue);

    const currentInput =
      this.calculatorService.currentInput()?.toString() || null;

    this.calculationControl.setValue(currentInput);
  }

  private themeListener(): Subscription {
    return this.themeControl.controls.theme.valueChanges.subscribe((value) =>
      this.selectedTheme.set(value)
    );
  }
}
