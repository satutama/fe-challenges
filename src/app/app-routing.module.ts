import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccordionComponent } from './accordion/accordion.component';
import { QrCodeComponent } from './qr-code/qr-code.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'qr-code' },
  { path: 'qr-code', component: QrCodeComponent },
  { path: 'accordion', component: AccordionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
