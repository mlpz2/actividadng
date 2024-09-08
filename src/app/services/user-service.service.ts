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

  getUserById(_id: String): Promise<any> {
    return lastValueFrom(this.httpClient.get<UserInt>(`${this.apiUrl}/${_id}`));
  }

  createUser(user: UserInt): Promise<any> {
    return lastValueFrom(this.httpClient.post<UserInt>(this.apiUrl, user));
  }

  updateUser(_id: String, user: UserInt): Promise<any> {
    return lastValueFrom(this.httpClient.put<UserInt>(`${this.apiUrl}/${_id}`, user));
  }

  deleteUser(_id: String): Promise<void> {
    return lastValueFrom(this.httpClient.delete<void>(`${this.apiUrl}/${_id}`));
  }
}
