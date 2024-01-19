import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import * as Leaflet from 'leaflet';
import { Observable, merge, share } from 'rxjs';
import { domainOrIPValidator } from './domain-or-IP-validator.directive';
import {
  IPAddressTrackerService,
  IPResponse,
} from './services/ip-address-tracker.service';
import { MapService } from './services/map.service';

@Component({
  selector: 'app-ip-address-tracker',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, LeafletModule],
  templateUrl: './ip-address-tracker.component.html',
  styleUrls: ['./ip-address-tracker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IpAddressTrackerComponent {
  public ipAddress$!: Observable<IPResponse>;
  public domain = new FormControl('', [
    Validators.required,
    domainOrIPValidator(),
  ]);

  public map: Leaflet.Map = this.mapService.map;
  public markers: Leaflet.Marker[] = this.mapService.markers;
  public options = {
    layers: [
      Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '...',
      }),
    ],
    zoom: 14,
  };

  constructor(
    private ipAddressTrackerService: IPAddressTrackerService,
    private mapService: MapService
  ) {
    this.ipAddress$ = merge(
      this.ipAddressTrackerService.IPDetails$,
      this.ipAddressTrackerService.getLocalIp()
    ).pipe(share());
  }

  public onMapReady($event: Leaflet.Map) {
    this.mapService.map = $event;
    this.mapService.initMarkers(this.ipAddress$);
  }

  public submitForm(): void {
    if (this.domain.value && this.domain.valid) {
      this.ipAddressTrackerService.getIPDetails(this.domain.value);
    }
  }
}
