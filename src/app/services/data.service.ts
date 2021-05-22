import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { NotFoundError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
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
      .pipe(catchError(() => this.handelError));
  }

  create(resource: Data): Observable<Data> {
    return this.http.post<Data>(this.url, JSON.stringify(resource))
      .pipe(catchError(() => this.handelError));
  }

  update(resource: Data): Observable<any> {
    return this.http.patch(this.url + '/' + resource.id, JSON.stringify({ isRed: true }))
      .pipe(catchError(() => this.handelError));
  }

  delete(resource: Data){
    return this.http.delete(this.url + '/' + resource.id)
      .pipe(catchError(() => this.handelError));
  }

  private handelError(error: HttpErrorResponse) {
    if (error.status === 400)
      return new BadInput(error);

    if (error.status === 404)
      return  new AppError(NotFoundError);

    return  new AppError(error);
  }
}
