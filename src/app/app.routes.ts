import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'age-calculator' },
  {
    path: 'qr-code',
    loadComponent: () =>
      import('./challenges/qr-code/qr-code.component').then(
        (mod) => mod.QrCodeComponent
      ),
  },
  {
    path: 'accordion',
    loadComponent: () =>
      import('./challenges/accordion/accordion.component').then(
        (mod) => mod.AccordionComponent
      ),
  },
  {
    path: 'result-summary',
    loadComponent: () =>
      import('./challenges/result-summary/result-summary.component').then(
        (mod) => mod.ResultSummaryComponent
      ),
  },
  {
    path: 'age-calculator',
    loadComponent: () =>
      import('./challenges/age-calculator/age-calculator.component').then(
        (mod) => mod.AgeCalculatorComponent
      ),
  },
  { path: '**', redirectTo: 'age-calculator' },
];
