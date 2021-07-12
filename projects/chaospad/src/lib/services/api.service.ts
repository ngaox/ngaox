import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { collection, EntityEntryPoint, IRI } from '../models/_core';

@Injectable()
export class ApiService {
  constructor(
    private http: HttpClient,
    @Inject('API_BASE') private readonly API_BASE: string
  ) {}

  get<T>(iri: IRI): Observable<T> {
    return this.http.get<T>(this.API_BASE + iri);
  }

  getCollection<T>(iri: EntityEntryPoint): Observable<collection<T>> {
    return this.http.get<collection<T>>(this.API_BASE + iri);
  }

  post<T>(iri: EntityEntryPoint, body: any): Observable<T> {
    return this.http.post<T>(this.API_BASE + iri, body);
  }

  patch<T>(iri: IRI, body: any): Observable<T> {
    return this.http.patch<T>(this.API_BASE + iri, body);
  }

  delete<T>(iri: IRI): Observable<T> {
    return this.http.delete<T>(this.API_BASE + iri);
  }
}
