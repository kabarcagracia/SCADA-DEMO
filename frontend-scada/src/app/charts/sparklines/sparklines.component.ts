import { Component, ViewChild, Input, OnInit } from '@angular/core';
import {
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexChart,
  ApexFill,
  ChartComponent,
  ApexDataLabels,
  ApexStroke
} from "ng-apexcharts";

export type ChartOptions = {
  dataLabels: ApexDataLabels;
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  stroke: ApexStroke;
};
@Component({
  selector: 'app-sparklines',
  templateUrl: './sparklines.component.html',
  styleUrls: ['./sparklines.component.css']
})
export class SparklinesComponent implements OnInit {
  @Input() color: String = "#DCE6EC";
  @Input() dataObject: any[] = [];
  @Input() variable: string = "";
  arregloArray: any[] = [];

  @ViewChild("sparkLineChart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions> | any;
  constructor() {
    this.chartOptions = {
      series: [{
      data: this.arregloArray
    }],
      chart: {
      type: 'area',
      height: 100,
      sparkline: {
        enabled: true
      },
    },
    stroke: {
      curve: 'straight'
    },
    fill: {
      opacity: 0.3,
    },
    yaxis: {
      min: 0
    },
    colors: [this.color],
    title: {
      text: '$235,312',
      offsetX: 0,
      style: {
        fontSize: '24px',
      }
    },
    subtitle: {
      text: 'Expenses',
      offsetX: 0,
      style: {
        fontSize: '14px',
      }
    }
    };
   }
  ngOnChanges(changes: any){
    let dataInit = changes.dataObject.currentValue.data;
    for (let i = 0; i < dataInit.length; i++) {
      const element = dataInit[i];  
      this.arregloArray.push(element.data?.[this.variable]);
    }
  }
  ngOnInit(): void {
  }

}
