import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'result-summary' },
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
  { path: '**', redirectTo: 'result-summary' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
