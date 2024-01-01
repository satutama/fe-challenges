import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

const DATA = [
  {
    category: 'Reaction',
    score: 80,
    icon: './assets/fonts/icon-reaction.svg',
  },
  {
    category: 'Memory',
    score: 92,
    icon: './assets/fonts/icon-memory.svg',
  },
  {
    category: 'Verbal',
    score: 61,
    icon: './assets/fonts/icon-verbal.svg',
  },
  {
    category: 'Visual',
    score: 72,
    icon: './assets/fonts/icon-visual.svg',
  },
];

@Component({
  selector: 'app-result-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './result-summary.component.html',
  styleUrls: ['./result-summary.component.scss'],
})
export class ResultSummaryComponent {
  public data = DATA;
}
