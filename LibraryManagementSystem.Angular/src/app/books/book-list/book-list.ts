import { Component, OnInit } from '@angular/core';
import { Book } from '../models/book.model';
import { MyService } from '../services/my-service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-book-list',
  standalone: false,
  templateUrl: './book-list.html',
  styleUrl: './book-list.css'
})
export class BookList implements OnInit {
books: Book[] = [];
  displayedColumns = ['id', 'title', 'author', 'description', 'actions'];

  constructor(private bookService: MyService, private router: Router) {}

  ngOnInit(): void {
    this.loadBooks();
  }
  loadBooks() {
    this.bookService.getBooks().subscribe(data => this.books = data);
  }
  editBook(book: Book) {
    this.router.navigate(['books/form', book.id]);
  }

  deleteBook(id: number) {
    this.bookService.deleteBook(id).subscribe(() => this.loadBooks());
  }
}
