import { Component, OnInit } from '@angular/core';
import { FormArray, FormArrayName, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; 
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { SensorsService } from '../../../../../services/sensors/sensors.service'
@Component({
  selector: 'app-create-sensor',
  templateUrl: './create-sensor.component.html',
  styleUrls: ['./create-sensor.component.css']
})
export class CreateSensorComponent implements OnInit {
  maquinaId: string = "";
  formSensor: FormGroup;
  formCreateSensor: FormGroup;
  formInto: FormGroup;
  formArray: any = [1,2,3,4];
  constructor(
    private activatedRoute: ActivatedRoute,
    private sensorsService: SensorsService,
    private toastr: ToastrService,
    private router: Router,
    private fb:FormBuilder
  ) {

    this.formSensor = this.fb.group({
      idDevice: '',
      idMachine: '',
      data: this.fb.array([])
    });

    this.formInto = new FormGroup({  
      typeSensor: new FormControl(null, [ Validators.required ]),
      idSensor: new FormControl(null, [ Validators.required ]),
      nameSensor: new FormControl(null, [ Validators.required ]),
      color: new FormControl("#154ccb", []),
      variable: new FormControl("", []),
    });
    this.formCreateSensor = new FormGroup({
      idMachine: new FormControl("",[ 
        Validators.required 
      ]),
      idDevice: new FormControl("",[ 
        Validators.required 
      ]),
      data: new FormArray([
        new FormControl(null, [ Validators.required])
      ])
      
    });

    this.activatedRoute.params.subscribe( params =>{
      this.formSensor.patchValue({
        idMachine: params.maquinaId,
        idDevice: params.dispositivoId
      });
      this.maquinaId = params.maquinaId
    });
   }

  ngOnInit(): void {
  }
  onSubmit(){
    console.log(this.formSensor.value);
    
    this.sensorsService.create(this.formSensor.value)
    .then((response) => {
      console.log(response);
      this.toastr.success("se creo exitosamente.","Dispositivo Creado");
      this.router.navigate(['/dashboard/dispositivos/'+ this.maquinaId]);
    }).catch((err) =>{
      console.log(err);
      this.toastr.error("creación fallida.", "Error Interno");
    });
    
  }
  onChange(event: any){
    console.log(event);
    
  }
  typeSensorSelect(event: any){
    const tipo = event.target.value; 
  }
  addSensor(){
    
    
    this.formInto.reset();
    console.log("wena");
    
  }
  get skills() : FormArray {
    return this.formSensor.get("data") as FormArray
  }
 
  newSkill(): FormGroup {
    return this.fb.group({
      typeSensor: 'ai',
      idSensor: '',
      nameSensor: '',
      color: '',
      variable: '',
    })
  }
 
  addSkills() {
    this.skills.push(this.newSkill());
  }
 
  removeSkill(i:number) {
    this.skills.removeAt(i);
  }


}
export class country {
  id: string;
  name: string;
 
  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}