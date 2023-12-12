import { Component, ViewChild } from '@angular/core';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { NgClass } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [
        MatToolbarModule,
        MatButtonModule,
        NgClass,
        MatIconModule,
        MatSidenavModule,
        MatListModule,
        RouterLink,
        RouterLinkActive,
        RouterOutlet,
    ],
})
export class AppComponent {
  @ViewChild('sidenav') sidenav!: MatDrawer;

  public title = 'test-gh';
  public opened = false;

  public sidenavToggle() {
    this.sidenav.toggle();
    this.opened = !this.opened;
  }
}
