import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import * as Leaflet from 'leaflet';
import { Observable, merge } from 'rxjs';
import {
  IPAddressTrackerService,
  IPResponse,
} from './ip-address-tracker.service';

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
  public domain = new FormControl('');

  public map!: Leaflet.Map;
  public markers: Leaflet.Marker[] = [];
  public options = {
    layers: [
      Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '...',
      }),
    ],
    zoom: 14,
  };

  constructor(private ipAddressTrackerService: IPAddressTrackerService) {
    this.ipAddress$ = merge(
      this.ipAddressTrackerService.IPDetails$,
      this.ipAddressTrackerService.getLocalIp()
    );
  }

  public onMapReady($event: Leaflet.Map) {
    this.map = $event;
    this.initMarkers();
  }

  public submitForm(): void {
    const domain = this.domain.value ?? undefined;

    this.ipAddressTrackerService.getIPDetails(domain);
  }

  private initMarkers() {
    this.ipAddress$.subscribe((ipAddress) => {
      const data = {
        position: { lat: ipAddress.location.lat, lng: ipAddress.location.lng },
      };
      const marker = Leaflet.marker(data.position);

      marker
        .addTo(this.map)
        .bindPopup(`<b>${data.position.lat},  ${data.position.lng}</b>`);
      this.map.panTo(data.position);
      this.markers.push(marker);
    });
  }
}
