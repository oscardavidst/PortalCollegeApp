import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';

import { ResponseApi } from '../../core/interfaces/response.interface';
import { ResponseCourse } from '../interfaces/response-course.interface';
import { PostCourse } from '../interfaces/post-course.interface';
import { PatchCourse } from '../interfaces/patch-course.interface';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private http = inject(HttpClient);

  getCourses(
    name: string,
    lastName: string
  ): Observable<ResponseApi<ResponseCourse[]>> {
    const nameUrl = name ? `Name=${name}` : '';
    const lastNameUrl = lastName ? `Name=${lastName}` : '';
    let parameters: string = [nameUrl, lastNameUrl].filter((x) => x).join('&');
    parameters = parameters.length ? `?${parameters}` : '';
    const url = `${baseUrl}/Courses${parameters}`;

    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}`
    );

    return this.http.get<ResponseApi<ResponseCourse[]>>(url, { headers }).pipe(
      map((resp) => {
        return resp;
      }),
      catchError((error) => {
        return throwError(() => error.error.Message);
      })
    );
  }

  getCourse(id: number): Observable<ResponseApi<ResponseCourse>> {
    const url = `${baseUrl}/Courses/${id}`;
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}`
    );

    return this.http.get<ResponseApi<ResponseCourse>>(url, { headers }).pipe(
      map((resp) => {
        return resp;
      }),
      catchError((error) => {
        return throwError(() => error.error.Message);
      })
    );
  }

  postCourse(course: PostCourse): Observable<ResponseApi<number>> {
    const url = `${baseUrl}/Courses`;
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}`
    );
    const body = {
      name: course.name,
      credits: course.credits,
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

  patchCourse(course: PatchCourse): Observable<ResponseApi<number>> {
    const url = `${baseUrl}/Courses/`;
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}`
    );
    const body: { [key: string]: string | number } = {
      ...(course.id && { id: course.id }),
      ...(course.name && { name: course.name }),
      ...(course.credits && { credits: course.credits }),
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

  deleteCourse(id: number): Observable<ResponseApi<number>> {
    const url = `${baseUrl}/Courses/${id}`;
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
