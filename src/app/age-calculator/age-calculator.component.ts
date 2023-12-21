import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { dateValidator } from './date-validator.directive';

interface Birthdate {
  day: number | null;
  month: number | null;
  year: number | null;
}

@Component({
  selector: 'app-age-calculator',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './age-calculator.component.html',
  styleUrls: ['./age-calculator.component.scss'],
})
export class AgeCalculatorComponent {
  private basicValidators = [Validators.required, Validators.min(1)];
  public currentYear = new Date().getFullYear();
  public age!: Birthdate;

  public birthdayForm = new FormGroup(
    {
      day: new FormControl('', [...this.basicValidators, Validators.max(31)]),
      month: new FormControl('', [...this.basicValidators, Validators.max(12)]),
      year: new FormControl('', [
        ...this.basicValidators,
        Validators.max(this.currentYear),
      ]),
    },
    { validators: dateValidator }
  );

  public isInvalid(control: AbstractControl) {
    return (
      (control.invalid && (control.dirty || control.touched)) ||
      this.birthdayForm.errors?.['invalidDate']
    );
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

  public get day() {
    return this.birthdayForm.get('day')!;
  }

  public get month() {
    return this.birthdayForm.get('month')!;
  }

  public get year() {
    return this.birthdayForm.get('year')!;
  }
}
