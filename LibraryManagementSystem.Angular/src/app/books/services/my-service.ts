import { Injectable } from '@angular/core';
import { Book } from '../models/book.model';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Category } from '../../categories/models/category.model';
import { BookWithCategories } from '../models/books-with-categories.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MyService {

  private booksSubject$ = new BehaviorSubject<Book[]>([]);
  private apiUrl = `${environment.apiUrl}/Books`;

  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    this.http.get<Book[]>(this.apiUrl)
      .subscribe(books => this.booksSubject$.next(books));
    return this.booksSubject$.asObservable();
  }
  getBookById(id: number) {
  return this.http.get<Book>(`${this.apiUrl}/${id}`);
}

  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.apiUrl, book)
      .pipe(
        tap(newBook => {
          const current = this.booksSubject$.getValue();
          this.booksSubject$.next([...current, newBook]);
        })
      );
  }

  updateBook(updated: Partial<Book>): Observable<Book> {
    return this.http.put<Book>(`${this.apiUrl}/Update`, updated)
      .pipe(
        tap(updatedBook => {
          const current = this.booksSubject$.getValue();
          const index = current.findIndex((b: Book) => b.id === updatedBook.id);
          if (index !== -1) {
            current[index] = updatedBook;
            this.booksSubject$.next([...current]);
          }
        })
      );
  }

  deleteBook(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(
        tap(() => {
          const current = this.booksSubject$.getValue();
          this.booksSubject$.next(current.filter((b: Book) => b.id !== id));
        })
      );
  }
getCategories() {
  return this.http.get<{id: number, name: string}[]>(`${environment.apiUrl}/categories`);
}





getBooksWithCategories(): Observable<BookWithCategories[]> {
  return this.http.get<BookWithCategories[]>(`${this.apiUrl}/WithCategories`);
}
  
}
