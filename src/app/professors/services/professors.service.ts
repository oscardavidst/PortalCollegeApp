import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';

import { ResponseApi } from '../../core/interfaces/response.interface';
import { ResponseProfessor } from '../interfaces/response-professor.interface';
import { PostProfessor } from '../interfaces/post-professor.interface';
import { PatchProfessor } from '../interfaces/patch-professor.interface';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class ProfessorsService {
  private http = inject(HttpClient);

  getProfessors(
    name: string,
    lastName: string
  ): Observable<ResponseApi<ResponseProfessor[]>> {
    const nameUrl = name ? `Name=${name}` : '';
    const lastNameUrl = lastName ? `Name=${lastName}` : '';
    let parameters: string = [nameUrl, lastNameUrl].filter((x) => x).join('&');
    parameters = parameters.length ? `?${parameters}` : '';
    const url = `${baseUrl}/Professors${parameters}`;

    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}`
    );

    return this.http
      .get<ResponseApi<ResponseProfessor[]>>(url, { headers })
      .pipe(
        map((resp) => {
          return resp;
        }),
        catchError((error) => {
          return throwError(() => error.error.Message);
        })
      );
  }

  getProfessor(id: number): Observable<ResponseApi<ResponseProfessor>> {
    const url = `${baseUrl}/Professors/${id}`;
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}`
    );

    return this.http.get<ResponseApi<ResponseProfessor>>(url, { headers }).pipe(
      map((resp) => {
        return resp;
      }),
      catchError((error) => {
        return throwError(() => error.error.Message);
      })
    );
  }

  postProfessor(professor: PostProfessor): Observable<ResponseApi<number>> {
    const url = `${baseUrl}/Professors`;
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}`
    );
    const body = {
      name: professor.name,
      lastName: professor.lastName,
    };

    return this.http.post<ResponseApi<number>>(url, body, { headers }).pipe(
      map((resp) => {
        return resp;
      }),
      catchError((error) => {
        return throwError(() => error.error);
      })
    );
  }

  patchProfessor(professor: PatchProfessor): Observable<ResponseApi<number>> {
    const url = `${baseUrl}/Professors/`;
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}`
    );
    const body: { [key: string]: string | number } = {
      ...(professor.id && { id: professor.id }),
      ...(professor.name && { name: professor.name }),
      ...(professor.lastName && { lastName: professor.lastName }),
    };

    return this.http.patch<ResponseApi<number>>(url, body, { headers }).pipe(
      map((resp) => {
        return resp;
      }),
      catchError((error) => {
        return throwError(() => error.error);
      })
    );
  }

  deleteProfessor(id: number): Observable<ResponseApi<number>> {
    const url = `${baseUrl}/Professors/${id}`;
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}`
    );

    return this.http.delete<ResponseApi<number>>(url, { headers }).pipe(
      map((resp) => {
        return resp;
      }),
      catchError((error) => {
        return throwError(() => error.error.Message);
      })
    );
  }
}
