import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'app-accordion',
  standalone: true,
  imports: [HttpClientModule, MatButtonModule, AngularSvgIconModule],
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
})
export class AccordionComponent {}
