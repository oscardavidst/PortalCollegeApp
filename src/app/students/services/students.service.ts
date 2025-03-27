import { inject, Injectable, signal } from '@angular/core';

import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ResponseApi } from '../../core/interfaces/response.interface';
import { ResponseStudent } from '../interfaces/response-student.interface';
import { catchError, map, Observable, throwError } from 'rxjs';
import { PostStudent } from '../interfaces/post-student.interface';
import { PatchStudent } from '../interfaces/patch-student.interface';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  private http = inject(HttpClient);

  getStudents(
    name: string,
    lastName: string,
    email: string
  ): Observable<ResponseApi<ResponseStudent[]>> {
    const nameUrl = name ? `Name=${name}` : '';
    const lastNameUrl = lastName ? `Name=${lastName}` : '';
    const emailUrl = email ? `Name=${email}` : '';
    let parameters: string = [nameUrl, lastNameUrl, emailUrl]
      .filter((x) => x)
      .join('&');
    parameters = parameters.length ? `?${parameters}` : '';
    const url = `${baseUrl}/Students${parameters}`;

    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}`
    );

    return this.http.get<ResponseApi<ResponseStudent[]>>(url, { headers }).pipe(
      map((resp) => {
        return resp;
      }),
      catchError((error) => {
        return throwError(() => error.error.Message);
      })
    );
  }

  getStudent(id: number): Observable<ResponseApi<ResponseStudent>> {
    const url = `${baseUrl}/Students/${id}`;
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}`
    );

    return this.http.get<ResponseApi<ResponseStudent>>(url, { headers }).pipe(
      map((resp) => {
        return resp;
      }),
      catchError((error) => {
        return throwError(() => error.error.Message);
      })
    );
  }

  postStudent(student: PostStudent): Observable<ResponseApi<number>> {
    const url = `${baseUrl}/Students`;
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}`
    );
    const body = {
      name: student.name,
      lastName: student.lastName,
      email: student.email,
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

  patchStudent(student: PatchStudent): Observable<ResponseApi<number>> {
    const url = `${baseUrl}/Students/`;
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}`
    );
    const body: { [key: string]: string | number } = {
      ...(student.id && { id: student.id }),
      ...(student.name && { name: student.name }),
      ...(student.lastName && { lastName: student.lastName }),
      ...(student.email && { email: student.email }),
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

  deleteStudent(id: number): Observable<ResponseApi<number>> {
    const url = `${baseUrl}/Students/${id}`;
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
