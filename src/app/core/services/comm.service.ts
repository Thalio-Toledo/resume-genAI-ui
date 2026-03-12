import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, firstValueFrom, retry, throwError, timeout, timer } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CommService {
  constructor(private http: HttpClient,

  ) {}

  async getAll<T>(url: string): Promise<T> {
    try {
      const response = await firstValueFrom(this.http.get<T>(url)
        .pipe(
          retry({
            count: 3,
            delay: (error, retryCount) => timer(retryCount * 1000)
          }),
          catchError(err => {
            console.error('Erro final:', err);
            return throwError(() => err);
         })
      ));
      return response;
    } catch (error) {
      console.error(error);
      return {} as T;
    }
  }

  async findById<T>(url: string) {
    try {
      const response = await firstValueFrom(this.http.get<T>(url)
      .pipe(
        retry({
        count: 3,
        delay: (error, retryCount) => timer(retryCount * 1000)
      }),
      catchError(err => {
        console.error('Erro final:', err);
        return throwError(() => err);
     }))
    );
      return response;
    } catch (error) {
      console.error(error);
      return {} as T;
    }
  }

  async post<T>(url: string, body: any) {
    try {
      const response = await firstValueFrom(this.http.post<T>(url, body));
      return response;
    } catch (error) {
      console.error(error);
      return {} as T;
    }
  }

  async postBoolean<T>(url: string, body: T) {
    try {
      const response = await firstValueFrom(this.http.post<boolean>(url, body));
      return response;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async put<T>(url: string, body: any) {
    try {
      const response = await firstValueFrom(this.http.put<T>(url, body));
      return response;
    } catch (error) {
      console.error(error);
      return {} as T;
    }
  }

  async putBoolean<T>(url: string, body: T) {
    try {
      const response = await firstValueFrom(this.http.put<boolean>(url, body));
      return response;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async delete(url: string) {
    try {
      const response = await firstValueFrom(this.http.delete<boolean>(url));
      return response;
    } catch (error) {
      console.error(error);
      //this._snackService.openSnackBar(error.error.error.message)
      return false;
    }
  }
}
