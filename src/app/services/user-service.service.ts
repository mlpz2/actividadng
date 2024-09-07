import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { UserInt } from '../interfaces/user-int.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://peticiones.online/api/users';
  httpClient = inject(HttpClient);

  getUsers(page: number = 1): Promise<any> {
    return lastValueFrom(this.httpClient.get<UserInt>(`${this.apiUrl}?page=${page}`))
  }

  getUserById(id: number): Promise<any> {
    return lastValueFrom(this.httpClient.get<UserInt>(`${this.apiUrl}/${id}`));
  }

  createUser(user: UserInt): Promise<any> {
    return lastValueFrom(this.httpClient.post<UserInt>(this.apiUrl, user));
  }

  updateUser(id: number, user: UserInt): Promise<any> {
    return lastValueFrom(this.httpClient.put<UserInt>(`${this.apiUrl}/${id}`, user));
  }

  deleteUser(id: number): Promise<void> {
    return lastValueFrom(this.httpClient.delete<void>(`${this.apiUrl}/${id}`));
  }
}
