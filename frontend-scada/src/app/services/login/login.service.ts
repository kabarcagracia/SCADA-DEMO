import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseUrl: string;
  constructor(private httpClient: HttpClient) { 
    this.baseUrl = environment.url;
  }
  
  signin(data:any): Promise<any>{
    return this.httpClient.post<any>(this.baseUrl + '/signin', data, { headers:{ "Access-Control-Allow-Origin": "*", "Content-Type":"application/json"}}).toPromise();
  }

  isLogged(token: any): Promise<boolean>{
    return this.httpClient.post<boolean>(this.baseUrl + '/validateToken', token).toPromise();
  }

  signout() {
    localStorage.removeItem('access-token');
  }
}
