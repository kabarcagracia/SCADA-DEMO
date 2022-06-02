import { Component, ViewChild, Input, OnInit, OnChanges } from '@angular/core';
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
  selector: 'app-gauge-sparkline',
  templateUrl: './gauge-sparkline.component.html',
  styleUrls: ['./gauge-sparkline.component.css']
})
export class GaugeSparklineComponent implements OnInit {
  private _valueData: number = 0;
    
  @Input('valueData') set valueData(value: number) {
     this._valueData = value;
  }
  
  get valueData(): number {
      return this._valueData;
  }
  @Input() dataNew: number = 0;
  @ViewChild("gaugeChart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions> | any;
  data: number = 0;
  constructor() { 
    
    this.chartOptions = {
      series: [30],
      chart: {
      type: 'radialBar',
      width: 90,
      height: 90,
      sparkline: {
        enabled: true
      }
    },
    dataLabels: {
      enabled: false
    },
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 0,
          size: '50%'
        },
        track: {
          margin: 0
        },
        dataLabels: {
          show: false
        }
      }
    }
    };
  }
  ngOnChanges(changes: any){
    if(changes.valueData.firstChange) {
      this._valueData = changes.valueData.currentValue;
      this.chart.updateSeries([changes.valueData.currentValue]);
    }
  }
  ngOnInit(): void {
  }
  

}
