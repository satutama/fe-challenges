import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'accordion' },
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
  { path: '**', redirectTo: 'accordion' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
