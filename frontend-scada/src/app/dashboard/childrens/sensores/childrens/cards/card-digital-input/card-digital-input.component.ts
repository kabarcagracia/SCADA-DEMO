import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-card-digital-input',
  templateUrl: './card-digital-input.component.html',
  styleUrls: ['./card-digital-input.component.css']
})
export class CardDigitalInputComponent implements OnInit {
  @Input() title: string = "[title]";
  @Input() data: boolean = false;

  statusSensor: string = "--";
  constructor() { }

  ngOnInit(): void {
  }
  ngOnChanges(changes: any){
    if(!changes.data.firstChange){
      if(changes.data.currentValue){
        this.statusSensor = "ON";
      } else {
        this.statusSensor = "OFF";
      }
    }
    
  }

}
