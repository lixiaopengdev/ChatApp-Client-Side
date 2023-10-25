import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }
  // token
  token = localStorage.getItem('chatsapp-token');
  // *************  GET USER PROFILE ************** //
  getData(id): Observable<any> {
    return this.http.get(`${environment.apiWithUrl}/api/v1/users/visitProfile/${id}`, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
  }

  // *************  UPDATE PROFILE PICTURE  ************** //
  updatePP(image: FormData): Observable<any> {
    return this.http.post(`${environment.apiWithUrl}/api/v1/users/uploadPP`, image, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
  }

  // *************  UPDATE PROFILE DATA  ************** //
  updateProfile(data: object): Observable<any> {
    return this.http.patch(`${environment.apiWithUrl}/api/v1/users/editUserProfile`, data, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
  }
}
