import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
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
