import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { loginCredentials, UserResponse } from '../models/_auth';
import { ApiService } from './api.service';

@Injectable()
export class AuthService {
  private readonly LOGGED_USER = 'LOGGED_USER';

  constructor(private api: ApiService) {}

  login(loginCredentials: loginCredentials): Observable<UserResponse> {
    return this.api
      .post<UserResponse>('/login', loginCredentials)
      .pipe(tap(user => this.storeUser(user)));
  }

  logout() {
    return this.api.post('/logout', null).pipe(tap(() => this.removeUser()));
  }

  refreshToken(): Observable<UserResponse> {
    return this.api.post<UserResponse>('/token/refresh', null);
  }

  private storeUser(user: UserResponse) {
    localStorage.setItem(this.LOGGED_USER, JSON.stringify(user));
  }

  private removeUser() {
    localStorage.removeItem(this.LOGGED_USER);
  }

  getLoggedUser(): UserResponse | null {
    const content = localStorage.getItem(this.LOGGED_USER);
    return !content ? null : JSON.parse(content);
  }

  isLoggedIn() {
    return !!this.getLoggedUser();
  }
}
