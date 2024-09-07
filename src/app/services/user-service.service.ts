import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { UserInt } from '../interfaces/user-int.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://peticiones.online/users';

  constructor(private http: HttpClient) {}
  import { Injectable } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
  import { lastValueFrom } from 'rxjs';
  import { UserInt } from '../interfaces/user-int.interface';

  @Injectable({
    providedIn: 'root'
  })
  export class UserService {
    private apiUrl = 'https://peticiones.online/users';

    constructor(private http: HttpClient) {}

    getUsers(page: number = 1): Promise<any> {
      return lastValueFrom(this.http.get<UserInt>(`${this.apiUrl}?page=${page}`))
    }

    getUserById(id: number): Promise<any> {
      return lastValueFrom(this.http.get<UserInt>(`${this.apiUrl}/${id}`));
    }

    createUser(user: UserInt): Promise<any> {
      return lastValueFrom(this.http.post<UserInt>(this.apiUrl, user));
    }

    updateUser(id: number, user: UserInt): Promise<any> {
      return lastValueFrom(this.http.put<UserInt>(`${this.apiUrl}/${id}`, user));
    }

    deleteUser(id: number): Promise<void> {
      return lastValueFrom(this.http.delete<void>(`${this.apiUrl}/${id}`));
    }
  }
