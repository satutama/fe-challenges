import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Birthdate {
  day: number | null;
  month: number | null;
  year: number | null;
}

@Component({
  selector: 'app-age-calculator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './age-calculator.component.html',
  styleUrls: ['./age-calculator.component.scss'],
})
export class AgeCalculatorComponent {
  public requiredError = 'This field is required';
  public birthdate: Birthdate = {
    day: null,
    month: null,
    year: null,
  };

  public age: Birthdate | undefined;

  public calculateAge() {
    const daysPerYear = 365.25; // account for leap years
    const daysPerMonth = 30.44; // on average
    const millisecondsInADay = 1000 * 60 * 60 * 24;

    const parsedBirthDate = new Date(
      `${this.birthdate.year}-${this.birthdate.month}-${this.birthdate.day}`
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
