import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { rxResource } from '@angular/core/rxjs-interop';

import { ResponseLogin } from '../interfaces/response-login.interface';
import { ResponseApi } from '../../core/interfaces/response.interface';
import { catchError, map, Observable, of, tap } from 'rxjs';

type AuthStatus = 'checking' | 'authenticated' | 'unauthenticated';
const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  checkStatusResource = rxResource({
    loader: () => this.checkStatus(),
  });

  private _authStatus = signal<AuthStatus>('checking');
  private _user = signal<ResponseLogin | null>(null);
  private _token = signal<string | null>(localStorage.getItem('token'));

  authStatus = computed<AuthStatus>(() => {
    if (this._authStatus() === 'checking') return 'checking';
    return this._user() ? 'authenticated' : 'unauthenticated';
  });

  user = computed<ResponseLogin | null>(() => this._user());
  token = computed<string | null>(() => this._token());

  checkStatus(): Observable<boolean> {
    const token = localStorage.getItem('token');
    if (!token) {
      this.logout();
      return of(false);
    }

    return this.http
      .get<ResponseApi<ResponseLogin>>(
        `${baseUrl}/Account/validateToken?Token=${token}`
      )
      .pipe(
        tap((resp) => this.handleAuthSuccess(resp)),
        map(() => true),
        catchError((error: any) => {
          return this.handleAuthError(error);
        })
      );
  }

  login(
    email: string,
    password: string
  ): Observable<ResponseApi<ResponseLogin> | any> {
    return this.http
      .post<ResponseApi<ResponseLogin> | any>(
        `${baseUrl}/Account/authenticate`,
        {
          email: email,
          password: password,
        }
      )
      .pipe(
        tap((resp) => {
          console.log(resp);

          return this.handleAuthSuccess(resp);
        }),
        catchError((resp) => {
          this.handleAuthError(resp);
          return of(resp.error);
        })
      );
  }

  registerStudent(
    name: string,
    lastName: string,
    userName: string,
    email: string,
    password: string,
    confirmPassword: string
  ): Observable<ResponseApi<string> | any> {
    return this.http
      .post<ResponseApi<string> | any>(`${baseUrl}/Account/registerStudent`, {
        name,
        lastName,
        userName,
        email,
        password,
        confirmPassword,
      })
      .pipe(
        tap((resp) => {
          return resp;
        }),
        catchError((resp) => {
          return of(resp.error);
        })
      );
  }

  logout() {
    this._authStatus.set('unauthenticated');
    this._user.set(null);
    this._token.set(null);
    localStorage.removeItem('token');
  }

  private handleAuthSuccess(resp: ResponseApi<ResponseLogin>) {
    this._user.set(resp.data);
    this._authStatus.set('authenticated');
    this._token.set(resp.data!.jwToken);
    localStorage.setItem('token', resp.data!.jwToken);
    return resp;
  }

  private handleAuthError(resp: any) {
    this.logout();
    return of(false);
  }
}
