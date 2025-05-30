import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

export interface Note {
  id?: number;
  title: string;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private apiUrl = 'http://localhost:8080/notes';

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }

  getAllNotes(page: number, size: number): Observable<PageResponse<Note>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<PageResponse<Note>>(this.apiUrl, { params })
      .pipe(catchError(this.handleError));
  }

  searchNotes(query: string, page: number, size: number): Observable<PageResponse<Note>> {
    const params = new HttpParams()
      .set('query', query)
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<PageResponse<Note>>(`${this.apiUrl}/search`, { params })
      .pipe(catchError(this.handleError));
  }

  getNote(id: number): Observable<Note> {
    return this.http.get<Note>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  createNote(note: { title: string, content: string }): Observable<Note> {
    return this.http.post<Note>(this.apiUrl, note)
      .pipe(catchError(this.handleError));
  }

  updateNote(id: number, note: { title: string, content: string }): Observable<Note> {
    return this.http.put<Note>(`${this.apiUrl}/${id}`, note)
      .pipe(catchError(this.handleError));
  }

  deleteNote(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  summarizeNote(id: number): Observable<string> {
    return this.http.post(`${this.apiUrl}/${id}/summarize`, {}, { responseType: 'text' })
      .pipe(catchError(this.handleError));
  }

 explainCode(content: string, language: string): Observable<string> {
     const params = new HttpParams().set('language', language);
     return this.http.post(`${this.apiUrl}/explain`, content, { params, responseType: 'text' })
       .pipe(catchError(this.handleError));
   }
}
