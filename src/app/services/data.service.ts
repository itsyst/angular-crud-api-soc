import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { NotFoundError, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AppError } from '@/app/common/app-error';
import { BadInput } from '@/app/common/bad-input';
import { Data } from '@/app/types/Data';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  constructor (@Inject(String) private url: string, private http: HttpClient) {}


  getAll(): Observable<Data[]> {
    return this.http.get<Data[]>(this.url)
      .pipe(
        map((response:Data[]) => response),
        tap(_ => console.log('fetched data')),
        catchError(() => this.handelError));
  }

  create(resource: Data): Observable<Data> {
    return this.http.post<Data>(this.url, JSON.stringify(resource))
      .pipe(
        map((response:Data) => response),
        tap((newData: Data) => console.log(`added data id=${newData.id}`)),
        catchError(() => this.handelError));
  }

  update(resource: Data): Observable<Data> {
    return this.http.patch<Data>(this.url + '/' + resource.id, JSON.stringify({ isRed: true }))
      .pipe(
        map((response:Data) => response),
        tap(_ => console.log(`updated data id=${resource.id}`)),
        catchError(() => this.handelError));
  }

  delete(resource: Data): Observable<Data>{
    return this.http.delete<Data>(this.url + '/' + resource.id)
      .pipe(
        map((response:Data) => response),
        tap(_ => console.log(`deleted data id=${resource.id}`)),
        catchError(() => this.handelError));
  }

  private handelError(error: HttpErrorResponse) {
    if (error.status === 400)
      return new BadInput(error);

    if (error.status === 404)
      return  new AppError(NotFoundError);

    return  new AppError(error);
  }
}
