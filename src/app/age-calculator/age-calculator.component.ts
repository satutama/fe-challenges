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
    this.age = this.birthdate;
  }
}
