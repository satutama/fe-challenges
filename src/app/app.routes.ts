import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'age-calculator' },
  {
    path: 'qr-code',
    loadComponent: () =>
      import('./qr-code/qr-code.component').then((mod) => mod.QrCodeComponent),
  },
  {
    path: 'accordion',
    loadComponent: () =>
      import('./accordion/accordion.component').then(
        (mod) => mod.AccordionComponent
      ),
  },
  {
    path: 'result-summary',
    loadComponent: () =>
      import('./result-summary/result-summary.component').then(
        (mod) => mod.ResultSummaryComponent
      ),
  },
  {
    path: 'age-calculator',
    loadComponent: () =>
      import('./age-calculator/age-calculator.component').then(
        (mod) => mod.AgeCalculatorComponent
      ),
  },
  { path: '**', redirectTo: 'age-calculator' },
];
