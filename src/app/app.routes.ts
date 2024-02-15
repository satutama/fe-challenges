import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'countries' },
  {
    path: 'qr-code',
    title: 'QR code',
    loadComponent: () =>
      import('./challenges/qr-code/qr-code.component').then(
        (mod) => mod.QrCodeComponent
      ),
  },
  {
    path: 'accordion',
    title: 'Accordion',
    loadComponent: () =>
      import('./challenges/accordion/accordion.component').then(
        (mod) => mod.AccordionComponent
      ),
  },
  {
    path: 'result-summary',
    title: 'Result Summary',
    loadComponent: () =>
      import('./challenges/result-summary/result-summary.component').then(
        (mod) => mod.ResultSummaryComponent
      ),
  },
  {
    path: 'age-calculator',
    title: 'Age Calculator',
    loadComponent: () =>
      import('./challenges/age-calculator/age-calculator.component').then(
        (mod) => mod.AgeCalculatorComponent
      ),
  },
  {
    path: 'ip-address-tracker',
    title: 'IP Address Tracker',
    loadComponent: () =>
      import(
        './challenges/ip-address-tracker/ip-address-tracker.component'
      ).then((mod) => mod.IpAddressTrackerComponent),
  },
  {
    path: 'calculator',
    title: 'Calculator',
    loadComponent: () =>
      import('./challenges/calculator/calculator.component').then(
        (mod) => mod.CalculatorComponent
      ),
  },
  {
    path: 'countries',
    title: 'Countries',
    loadChildren: () =>
      import('./challenges/countries/countries.routes').then(
        (mod) => mod.COUNTRIES_ROUTES
      ),
  },
  { path: '**', redirectTo: 'countries' },
];
