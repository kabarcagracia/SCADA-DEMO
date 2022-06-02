import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  baseUrl: string;
    
    constructor(private httpClient: HttpClient) { 
        this.baseUrl = environment.url;
    }

    create(data:any): Promise<any>{
        return this.httpClient.post<any>(this.baseUrl + '/api/createUser', data).toPromise();
    }
    read(): Promise<any>{
        return this.httpClient.get<any>(this.baseUrl + '/api/readUser').toPromise();
    }

    readOneUser(id: any): Promise<any>{
        const payload = {id};
        return this.httpClient.post<any>(this.baseUrl + '/api/readOneUser', payload).toPromise();
    }
    update(id: string, data: any): Promise<any>{
        const payload = {
            id,
            data
        }
        return this.httpClient.put<any>(this.baseUrl + '/updateUser', payload).toPromise();
    }
    delete(id: any): Promise<any>{

        console.log(id);
        
        return this.httpClient.delete<any>(this.baseUrl + '/deleteUser', {body: {id}}).toPromise();
    }
}