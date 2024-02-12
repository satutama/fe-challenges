import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, effect, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

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

  public get theme() {
    return this.themeControl.value;
  }

  private themeListener(): Subscription {
    return this.themeControl.valueChanges.subscribe((value) =>
      this.selectedTheme.set(value)
    );
  }
}
