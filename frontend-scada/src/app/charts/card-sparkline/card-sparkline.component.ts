import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-card-sparkline',
  templateUrl: './card-sparkline.component.html',
  styleUrls: ['./card-sparkline.component.css']
})
export class CardSparklineComponent implements OnInit {
  classObject: any = {
    "text-success": false,
    "text-warning": false,
    "text-danger": false
  };
  textOutput: string = "[STATUS]";
  @Input() titleCard: string = "[TITULO]";
  @Input() iconCard: string = "disabled_by_default";
  @Input() varCard: string = "[var]";
  @Input() colorGraph: string = "#A23F";
  @Input() dataNew: number = 0;
  @Input() subTitleCard: string = "[subtitle]";
  @Input() valueDanger: number = 2;
  @Input() valueWarning: number = 1;
  @Input() msgDanger: string = "danger";
  @Input() msgGood: string = "good";
  @Input() msgWarning: string = "warning";
  @Input() color: String = "#DCE6EC";
  @Input() dataObject: any[] = [];
  @Input() variable: string = "";



  constructor() { }
  ngOnInit(){}
  ngOnChanges(changes: any){

    if(!changes.dataNew.firstChange) {
      if(changes.dataNew.currentValue >= this.valueDanger) {
        this.classObject['text-success'] = false;
        this.classObject['text-warning'] = false;
        this.classObject['text-danger'] = true;
        this.textOutput = this.msgDanger;
      } else if(changes.dataNew.currentValue <= this.valueWarning) {
        this.classObject['text-success'] = false;
        this.classObject['text-warning'] = true;
        this.classObject['text-danger'] = false;
        this.textOutput = this.msgWarning;
      } else {
        this.classObject['text-success'] = true;
        this.classObject['text-warning'] = false;
        this.classObject['text-danger'] = false;
        this.textOutput = this.msgGood;
      }
    }
    
  }

}
