import { Injectable } from '@angular/core';
import * as Leaflet from 'leaflet';
import { Observable } from 'rxjs';
import { IPResponse } from './ip-address-tracker.service';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  public markers: Leaflet.Marker[] = [];
  public map!: Leaflet.Map;
  constructor() {}

  public initMarkers(ipAddress$: Observable<IPResponse>) {
    ipAddress$.subscribe((ipAddress) => {
      this.clearAllMarkers();

      const data = {
        position: { lat: ipAddress.location.lat, lng: ipAddress.location.lng },
      };

      const icon = {
        icon: Leaflet.icon({
          iconSize: [35, 45],
          iconUrl: './assets/icons/icon-location.svg',
        }),
      };

      const marker = Leaflet.marker(data.position, icon);
      marker
        .addTo(this.map)
        .bindPopup(`<b>${data.position.lat},  ${data.position.lng}</b>`);
      this.map.panTo(data.position);
      this.markers.push(marker);
    });
  }

  private clearAllMarkers() {
    if (this.markers.length) {
      for (var id in this.markers) {
        this.map.removeLayer(this.markers[id]);
      }

      this.markers = [];
    }
  }
}
