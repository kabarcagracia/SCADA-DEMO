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
  selector: 'app-one-line-chart',
  templateUrl: './one-line-chart.component.html',
  styleUrls: ['./one-line-chart.component.css']
})
export class OneLineChartComponent implements OnInit {
  dataObject: any[] = [];
  variableInit: number = 0;  

  @Input() variableLineChart: number = 0;
  @Input() dateInput: Date = new Date();


  @ViewChild("oneLineChart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions> | any;

  constructor() { 
    this.chartOptions = {
      series: [{
          name: "[variable en cuestion]",
          data: this.dataObject.slice()
      }],
      chart: {
          
          height: 250,
          type: 'area',
          animations: {
              enabled: true,
              easing: 'linear',
              dynamicAnimation: {
                  speed: 1000
              }
          },
          toolbar: {
              show: false
          },
          zoom: {
              enabled: false
          }
      },
      dataLabels: {
          enabled: false
      },
      stroke: {
          curve: 'smooth'
      },
      title: {
          text: 'SENSOR DE ${sensores[s].name} [ ${sensores[s].measurement} ]',
          align: 'left'
      },
      markers: {
          size: 0
      },
      xaxis: {
          type: 'datetime',
      },

      legend: {
          show: false
      },
      colors: ['${sensores[s].color}'],
      noData: {
          text: 'Cargando datos...'
      }
  };
  }

  ngOnInit(): void {
  }
  ngOnChanges(changes: any) {
    if(changes.dateInput.currentValue){
      if(changes.variableLineChart){
        this.variableInit = changes.variableLineChart.currentValue || 23; //puede ir valor inicial
      } else {
        this.variableInit = this.variableInit;
        
      }

      if(this.dataObject.length > 30) {
        this.dataObject.shift();
      }
      this.dataObject.push({ x: changes.dateInput.currentValue, y: this.variableInit});
      this.chart.updateSeries([{ data: this.dataObject}]);
    }
  }
}
