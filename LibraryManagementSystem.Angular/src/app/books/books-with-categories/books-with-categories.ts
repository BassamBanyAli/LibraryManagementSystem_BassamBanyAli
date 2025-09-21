import { Component, OnInit } from '@angular/core';
import { MyService } from '../services/my-service';
import { BookWithCategories } from '../models/books-with-categories.model';

@Component({
  selector: 'app-books-with-categories',
  standalone: false,
  templateUrl: './books-with-categories.html',
  styleUrl: './books-with-categories.css'
})
export class BooksWithCategories implements OnInit {

  books: BookWithCategories[] = [];
  loading = false;
  error: string | null = null;

  constructor(private bookService: MyService) { }

  ngOnInit(): void {}

  loadBooks() {
    this.loading = true;
    this.error = null;

    this.bookService.getBooksWithCategories().subscribe({
      next: (res) => {
        this.books = res;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to load books';
        this.loading = false;
      }
    });
  }
}
