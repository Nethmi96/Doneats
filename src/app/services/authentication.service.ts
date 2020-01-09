import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  register(user) {
    return this.http.post<any>('http://localhost:8080/doneats/api/v1/authentication/register', user);
  }
}
