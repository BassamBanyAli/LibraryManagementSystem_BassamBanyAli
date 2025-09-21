import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MyService {

  private categories$ = new BehaviorSubject<Category[]>([]);
  private apiUrl = `${environment.apiUrl}/Categories`;
   constructor(private http: HttpClient) {}


  getCategories(): Observable<Category[]> {
    this.http.get<Category[]>(this.apiUrl)
      .subscribe(categories => this.categories$.next(categories));
    return this.categories$.asObservable();
  }
addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.apiUrl, category)
      .pipe(
        tap(newCategory => {
          const current = this.categories$.getValue();
          this.categories$.next([...current, newCategory]);
        })
      );
  }


  updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.apiUrl}/Update`, category)
      .pipe(
        tap(updatedCategory => {
          const current = this.categories$.getValue();
          const index = current.findIndex(c => c.id === updatedCategory.id);
          if (index !== -1) {
            current[index] = updatedCategory;
            this.categories$.next([...current]);
          }
        })
      );
  }


  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(
        tap(() => {
          const current = this.categories$.getValue();
          this.categories$.next(current.filter(c => c.id !== id));
        })
      );
  }
}

