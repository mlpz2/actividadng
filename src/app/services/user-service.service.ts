import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { lastValueFrom } from 'rxjs';
import {  } from 'rxjs';
import { UserInt } from '../interfaces/user-int.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://peticiones.online/users';

  constructor(private http: HttpClient) {}

    // Traer todos los datos de la API (pagina 1) por medio de promesa:
  getUsers(page: number = 1): Promise<any> {
    return lastValueFrom(this.http.get<any>(`${this.apiUrl}?page=${page}`))

  }

  getUserById(id: number): Promise<any> {
    return lastValueFrom(this.http.get<UserInt>(`${this.apiUrl}/${id}`));
  }

  create(formValue: UserInt): Promise<any> {
    return lastValueFrom(this.http.post<UserInt>(this.apiUrl, formValue))
  }
}
