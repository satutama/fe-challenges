import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

interface Birthdate {
  day: number | null;
  month: number | null;
  year: number | null;
}

@Component({
  selector: 'app-age-calculator',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './age-calculator.component.html',
  styleUrls: ['./age-calculator.component.scss'],
})
export class AgeCalculatorComponent {
  private basicValidators = [Validators.required, Validators.min(1)];
  public currentYear = new Date().getFullYear();

  public age: Birthdate | undefined;

  public birthdayForm = new FormGroup({
    day: new FormControl('', [...this.basicValidators, Validators.max(31)]),
    month: new FormControl('', [...this.basicValidators, Validators.max(12)]),
    year: new FormControl('', [
      ...this.basicValidators,
      Validators.max(this.currentYear),
    ]),
  });

  public get day() {
    return this.birthdayForm.get('day')!;
  }

  public get month() {
    return this.birthdayForm.get('month')!;
  }

  public get year() {
    return this.birthdayForm.get('year')!;
  }

  public calculateAge() {
    if (!this.birthdayForm.valid) {
      this.birthdayForm.markAllAsTouched();

      return;
    }

    const daysPerYear = 365.25; // account for leap years
    const daysPerMonth = 30.44; // on average
    const millisecondsInADay = 1000 * 60 * 60 * 24;

    const parsedBirthDate = new Date(
      `${this.year.value}-${this.month.value}-${this.day.value}`
    );

    const timeDiff = Math.abs(Date.now() - parsedBirthDate.getTime());

    const year = Math.floor(timeDiff / (millisecondsInADay * daysPerYear));

    const month = Math.floor(
      (timeDiff % (millisecondsInADay * daysPerYear)) /
        (millisecondsInADay * daysPerMonth)
    );

    const day = Math.floor(
      (timeDiff % (millisecondsInADay * daysPerMonth)) / millisecondsInADay
    );

    this.age = { year, month, day };
  }
}
