import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { F1Service } from '../services/f1.service';
import { Sle } from '../interfaces/f1driver';
import { F1constructor } from '../interfaces/f1constructor';

@Component({
  selector: 'app-hall-of-fame',
  templateUrl: './hall-of-fame.component.html',
  styleUrls: ['./hall-of-fame.component.css']
})
export class HallOfFameComponent implements OnInit {

  @ViewChild('chartDiv', { static: true }) chartDiv: ElementRef;

  chart: any
  chartIndicator: any;
  showDrivers: boolean = true;

  constructor(
    protected zone: NgZone,
    private f1service: F1Service
  ) {}

  getFrequenciesFromArray(array) {
    let a = [],
      b = [],
      arr = [...array], 
      prev;

    arr.sort();
    for (let element of arr) {
      if (element !== prev) {
        a.push(element);
        b.push(1);
      }
      else ++b[b.length - 1];
      prev = element;
    }

    return [a, b];
  }

  onValChange(value) {
    this.loadData(this.showDrivers)
  }

  createIndicator(chart) {
    const indicator = chart.tooltipContainer.createChild(am4core.Container);
    let indicatorLabel = indicator.createChild(am4core.Label);
    indicatorLabel.text = "Loading data...";
    indicatorLabel.align = "center";
    indicatorLabel.valign = "middle";
    indicatorLabel.fontSize = 20;
    indicatorLabel.dy = 50;
    let hourglass = indicator.createChild(am4core.Image);
    hourglass.href = "assets/images/f1_logo.svg";
    hourglass.align = "center";
    hourglass.valign = "middle";
    hourglass.horizontalCenter = "middle";
    hourglass.verticalCenter = "middle";
    hourglass.scale = 5;
    indicator.background.fill = am4core.color("#fff");
    indicator.background.fillOpacity = 0.8;
    indicator.width = am4core.percent(100);
    indicator.height = am4core.percent(100);
    return indicator
  }


  ngAfterViewInit(): void {
    am4core.useTheme(am4themes_animated);
  
    let chart = this.zone.runOutsideAngular(() => {
      return am4core.create(this.chartDiv.nativeElement, am4charts.XYChart);
    })
    this.chart = chart;

    this.chart.padding(40, 40, 40, 40);

    let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.dataFields.category = "driver";
    categoryAxis.renderer.minGridDistance = 1;
    categoryAxis.renderer.inversed = true;
    categoryAxis.renderer.grid.template.disabled = true;

    let valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;

    let series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.categoryY = "driver";
    series.dataFields.valueX = "titles";
    series.tooltipText = "{valueX.value}"
    series.columns.template.strokeOpacity = 0;
    series.columns.template.column.cornerRadiusBottomRight = 5;
    series.columns.template.column.cornerRadiusTopRight = 5;

    let labelBullet = series.bullets.push(new am4charts.LabelBullet())
    labelBullet.label.horizontalCenter = "left";
    labelBullet.label.dx = 10;
    labelBullet.label.text = "{values.valueX.workingValue.formatNumber('#.')}";
    labelBullet.locationX = 1;

    // as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
    series.columns.template.adapter.add("fill", function (fill, target) {
      return chart.colors.getIndex(target.dataItem.index);
    });

    categoryAxis.sortBySeries = series;
    chart.preloader.disabled = true;
    this.chartIndicator = this.createIndicator(this.chart);
    this.loadData()
  }


  loadData(drivers: boolean = true) {
    this.showIndicator()
    let d1 = []
    let dd = []
    if (drivers) {
      this.f1service.getDriverHallOfFame()
        .then((ds: Sle[]) => {
          ds.forEach((d) => {
            d1.push(d.DriverStandings[0].Driver.familyName)
          })
          let results = this.getFrequenciesFromArray(d1)
          let r1 = results[0]
          let r2 = results[1]
          for (let i = 0; i < r1.length; i++) {
            dd.push({ driver: r1[i], titles: r2[i] })
          }
          this.chart.data = dd
          this.hideIndicator()
        })
    } else {
      this.f1service.getConstructorHallOfFame()
        .then((ds: F1constructor[]) => {
          ds.forEach((d: any) => {
            //TO-DO: FIx types
            d1.push(d.ConstructorStandings[0].Constructor.name)
          })
          let results = this.getFrequenciesFromArray(d1)
          let r1 = results[0]
          let r2 = results[1]
          for (let i = 0; i < r1.length; i++) {
            dd.push({ driver: r1[i], titles: r2[i] })
          }
          this.chart.data = dd
          this.hideIndicator()
        })
    }

  }

  hideIndicator() {
    this.chartIndicator?.hide()
  }

  showIndicator() {
    this.chartIndicator?.show()
  }

  ngOnDestroy() {
    this.chart?.dispose();
  }

  ngOnInit() {
  }
}



