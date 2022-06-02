import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; 
import { ToastrService } from 'ngx-toastr';
import { MachinesService } from 'src/app/services/machines/machines.service';
@Component({
  selector: 'app-create-machine',
  templateUrl: './create-machine.component.html',
  styleUrls: ['./create-machine.component.css']
})
export class CreateMachineComponent implements OnInit {
  
  viewMapLocation: boolean;
  formCreateMachine: FormGroup;
  latitude: number = 0;
  longitude: number = 0;
  
  constructor(
    private machinesService: MachinesService,
    private toastr: ToastrService,
    private router: Router
  ) {
    
    this.viewMapLocation = true;

    this.formCreateMachine = new FormGroup(
      {
        nameMachine: new FormControl("", [
          Validators.required
        ]),
        description: new FormControl(null, [
          Validators.maxLength(25)
        ]),
        tracker: new FormControl(false),
        location: new FormGroup({
          lat: new FormControl(null, []),
          lng: new FormControl(null, [])
        }),
        trackerData: new FormGroup({
          idDevice: new FormControl(null, [
          ]),
          nameDevice: new FormControl(null, [
          ]),
          description: new FormControl(null, [
            Validators.maxLength(25)
          ])
        })
      }
    );
    
   }

  ngOnInit(): void {
    
  }
  onSubmit(){
    this.machinesService.create(this.formCreateMachine.value)
    .then((response) =>{
      console.log(response.nameMachine);
      this.toastr.success("se creo exitosamente \""+ this.formCreateMachine.value.nameDevice + "\".","Maquina Creada");
      this.router.navigate(['/dashboard/maquinas']);
      
    }).catch((err) =>{
       console.log(err);
       this.toastr.error("creación fallida.", "Error Interno");
       
    });
    
  }
  onChange(event: any){
    console.log();
    
    if(event.target.checked){
      this.viewMapLocation = false;
      //tiene gps
      this.formCreateMachine.patchValue({
        location: {
          lat: null,
          lng: null
        }
      });
    } else {
      this.viewMapLocation = true;
      //no tiene
      this.formCreateMachine.patchValue({
        trackerData: {
          idDevice: "",
          nameDevice: "",
          description: ""
        }
      });
    }
    
  }
  onPosition(event: any){
    this.formCreateMachine.patchValue({
      location: {
        lat: Number(event.lat()).toFixed(7),
        lng: Number(event.lng()).toFixed(7)
      }
    });
  }
  formValid(form: string):boolean{
    const test = this.formCreateMachine.controls[form];
    if(test.valid && !test.untouched) return true;
    return false;
    
  }
  formInvalid(form: string):boolean{
    const test = this.formCreateMachine.controls[form];
    if(test.invalid && !test.untouched) return true;
    return false;
  }
  tracker(){
    return this.formCreateMachine.controls.tracker;
  }
}
