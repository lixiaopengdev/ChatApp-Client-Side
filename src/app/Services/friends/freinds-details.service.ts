import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment.prod';
declare const $: any;
@Injectable({
  providedIn: 'root'
})
export class FreindsDetailsService {
  // token
  token = localStorage.getItem('chatsapp-token');
  proxyUrl = 'http://localhost:1502/';
  // proxyUrl = 'http://192.168.50.177:1502/'
  constructor(private http: HttpClient) { }

  // ************* GET FRIENDS ************ //
  getUserFriends(): Observable<any> {
    return this.http.get(`${environment.apiWithUrl}/api/v1/users/userFriends`, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
  }

  // ************* FIND PEOPLE PART************ //

  findPeople(): Observable<any> {
    return this.http.get(`${environment.apiWithUrl}/api/v1/users/findPeople`, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
  }

  // ************* SEND FRIENDS REQUEST ************ //

  sendFriendReq(id): Observable<any> {
    return this.http.patch(`${environment.apiWithUrl}/api/v1/users/sendFriendRequest/${id}`, {}, {
      headers: {
        Authorization : `Bearer ${this.token}`
      }
    });
  }
  // ************* ACCEPT FRIEND REQUEST ************ //
  acceptFriendRequest(data): Observable<any> {
    return this.http.patch(`${environment.apiWithUrl}/api/v1/users/acceptFriendRequest`, data, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
  }
  // ************* REJECT FRIEND REQUEST ************ //
  rejectFriendRequest(reqId, fromId): Observable<any> {
    return this.http.delete(`${environment.apiWithUrl}/api/v1/users/rejectfriendRequest?friendRequestId=${reqId}&fromId=${fromId}`, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
  }
  // ************* DELETE FRIEND ************ //
  delteFriend(id): Observable<any> {
    return this.http.patch(`${environment.apiWithUrl}/api/v1/users/unFriend/${id}`, {}, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
  }
  // ************* LOADERS PART************ //
  showLoader(): void {
    $('.preloader').fadeIn();
  }

  hideLoader(): void {
    $('.preloader').fadeOut();
  }
}
