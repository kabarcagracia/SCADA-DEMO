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
  selector: 'app-gauge-chart',
  templateUrl: './gauge-chart.component.html',
  styleUrls: ['./gauge-chart.component.css']
})
export class GaugeChartComponent implements OnInit {
  nombre: string = "--";
  private _valueData: number = 0;
  private _nameVariable: string = "";
  @Input('nameVariable') set nameVariable(value: string){
    this._nameVariable = value;
  };
  @Input('valueData') set valueData(value: number) {
     this._valueData = value;
  }
  get nameVariable(): string {
    return this._nameVariable;
  }
  get valueData(): number {
  
      return this._valueData;
  
  }
  @ViewChild("gaugeChart") public chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions> | any;
  constructor() {
      this.chartOptions = {
        series: [0],
          chart: {
          height: 350,
          type: 'radialBar',
          offsetY: -10,
        },
        dataLabels:{
          show: false,
              name: {
                offsetY: -10,
                show: true,
                color: '#888',
                fontSize: '17px'
        }},
        plotOptions: {
          radialBar: {
            startAngle: -135,
            endAngle: 135,
            dataLabels: {
              name: {
                fontSize: '16px',
                color: undefined,
                offsetY: 120
              },
              value: {
                offsetY: 76,
                fontSize: '22px',
                color: undefined,
                formatter: function (val: any) {
                  return val;
                },
                show: true,
              }
            }
          }
        },
        fill: {
          type: 'gradient',
          gradient: {
              shade: 'dark',
              shadeIntensity: 0.15,
              inverseColors: false,
              opacityFrom: 1,
              opacityTo: 1,
              stops: [0, 50, 65, 91]
          },
        },
        stroke: {
          dashArray: 4
        },
        labels: [''],
        };
    
   }
   ngOnChanges(changes:any){
    //this.nombre = changes.nameVariable.currentValue;
     let object = [];
     if(changes.valueData.currentValue){
      this._valueData = changes.valueData.currentValue;
      this.chart.updateSeries([changes.valueData.currentValue]);  
      
     }
   }

  ngOnInit(): void {

    

  }

}
