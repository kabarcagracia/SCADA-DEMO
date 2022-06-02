import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DevicesService {
  baseUrl: string;
    
  constructor(
    private httpClient: HttpClient
  ){ 
    this.baseUrl = environment.url;
  }

  create(body:string){
    return this.httpClient.post<any>(this.baseUrl + '/api/createDevice', body).toPromise();
  }
  read(body: any): Promise<any>{
    const payload = {
      idMachine: body
    }
    return this.httpClient.post<any>(this.baseUrl + '/api/readDevice', payload).toPromise();
  }
  sendMessageDevice(payload: any){
    return this.httpClient.post<any>(this.baseUrl + '/api/msgDevice', payload).toPromise();
  }
}
