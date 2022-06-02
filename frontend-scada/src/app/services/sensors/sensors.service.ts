import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SensorsService {

  baseUrl: string;
    
  constructor(
    private httpClient: HttpClient
  ){ 
    this.baseUrl = environment.url;
  }

  readSensors(payload: any){
    return this.httpClient.post<any>(this.baseUrl + '/api/findSensor', payload).toPromise();
  }
  readGps(payload: any){
    return this.httpClient.post<any>(this.baseUrl + '/api/findGps', payload).toPromise();
  }
  readLastData(payload: any){
    return this.httpClient.post<any>(this.baseUrl + '/api/findLastData', payload).toPromise();
  }
  create(body:any){
    return this.httpClient.post<any>(this.baseUrl + '/api/createSensor', body).toPromise();
  }

  
}

