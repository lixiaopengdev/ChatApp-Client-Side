import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment.prod';

@Injectable({
    providedIn: 'root'
})
export class GroupsService {
    token = localStorage.getItem('chatsapp-token');

    constructor(private http: HttpClient) {
    }

    // ************** GET ALL GROUPS ************** //
    getAllGroups(): Observable<any> {
        return this.http.get(`${environment.apiWithUrl}/api/v1/groups/userGroups`, {
            headers: {
                Authorization: `Bearer ${this.token}`
            }
        });
    }

    // ************** CREAT A GROUP ************** //
    createGroup(data): Observable<any> {
        return this.http.post(`${environment.apiWithUrl}/api/v1/groups/createGroup`, data, {
            headers: {
                Authorization: `Bearer ${this.token}`
            }
        });
    }

    // ************** DELETE A GROUP ************** //
    deleteGroup(id): Observable<any> {
        return this.http.delete(`${environment.apiWithUrl}/api/v1/groups/deleteGroup/${id}`, {
            headers: {
                Authorization: `Bearer ${this.token}`
            }
        });
    }

    // ************** LEAVE A GROUP ************** //
    leaveGroup(id): Observable<any> {
        return this.http.patch(`${environment.apiWithUrl}/api/v1/groups/leaveGroup/${id}`, {}, {
            headers: {
                Authorization: `Bearer ${this.token}`
            }
        });
    }

    // ************** KICK MEMBER FROM A GROUP ************** //
    kickMemberFromGroup(data): Observable<any> {
        return this.http.patch(`${environment.apiWithUrl}/api/v1/groups/kickMember`, data, {
            headers: {
                Authorization: `Bearer ${this.token}`
            }
        });
    }
    // ************** GET FRIEND LIST FOR A GROUP ************** //
    getFriendListForGroup(adminID): Observable<any> {
        return this.http.get(`${environment.apiWithUrl}/api/v1/groups/friendsForGroup/${adminID}`, {
            headers: {
                Authorization: `Bearer ${this.token}`
            }
        });
    }

    // ************** ADD MEMBER TO A GROUP ************** //
    addMember(data: object): Observable<any> {
        return this.http.patch(`${environment.apiWithUrl}/api/v1/groups/addMember`, data, {
            headers: {
                Authorization: `Bearer ${this.token}`
            }
        });
    }
}
