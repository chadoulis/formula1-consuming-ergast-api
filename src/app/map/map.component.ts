import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { latLng, LayerGroup, tileLayer } from 'leaflet';
declare let L;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {



  constructor(
    public dialogRef: MatDialogRef<MapComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any) { }

  options: L.MapOptions = {
    zoom: 8,
    center: L.latLng(this.data.lat, this.data.long),
    layers: [
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      })
    ]
  };
  map: L.Map;
  markersLayer = new L.LayerGroup();
  sMarkersLayer: LayerGroup;
  zoomLevel = 9;
  iconUrl = "https://cdn0.iconfinder.com/data/icons/mobile-development-svg-icons/60/Map_marker-512.png";
  stations = [
    {
      name: this.data.name,
      lat: this.data.lat,
      lng: this.data.long,
    }
  ];

  createCircuits() {
    this.sMarkersLayer = new L.LayerGroup();
    for (const s of this.stations) {
      let icon;
      icon = new L.DivIcon({
        html: `<img src='${this.iconUrl}'/> <span>${s.name}</span>`
      });
      const marker = L.marker([s.lat, s.lng], { icon });
      this.sMarkersLayer.addLayer(marker);
    }
    this.markersLayer.addLayer(this.sMarkersLayer);
  }

  onMapReady(map: L.Map) {
    setTimeout(() => {
      map.invalidateSize();
      this.map = map;
      map.addLayer(this.markersLayer);
      this.createCircuits();
    }, 200);
  }

  ngOnInit() {}
}