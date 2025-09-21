import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyService } from '../services/my-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../models/category.model';
import { Book } from '../models/book.model';
import { publishBehavior } from 'rxjs';

@Component({
  selector: 'app-book-form',
  standalone: false,
  templateUrl: './book-form.html',
  styleUrl: './book-form.css'
})
export class BookForm implements OnInit{
 bookForm!: FormGroup;
  bookId?: number;
  categories: Category[] = [];

  constructor(
    private fb: FormBuilder,
    private bookService: MyService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.bookId = +this.route.snapshot.params['id'];

    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['',Validators.required],
      isbn: ['',Validators.required],
      categoryIds: [[],Validators.required]   // ✅ match model
    });

    // ✅ Load categories from API
    this.bookService.getCategories().subscribe(res => {
      this.categories = res;
    });

    // ✅ Load book if editing
    if (this.bookId) {
      this.bookService.getBookById(this.bookId).subscribe(book => {
        this.bookForm.patchValue({
          title: book.title,
          author: book.author,
          isbn: book.isbn,
          categoryIds: book.categoryIds,
          
          
        });
      });
    }
  }
cancel() {
  this.router.navigate(['/books']);
}
  onSubmit() {
    const dto: Book = {
      id:this.bookId,
      title: this.bookForm.value.title,
      author: this.bookForm.value.author,
      isbn: this.bookForm.value.isbn,
      categoryIds: this.bookForm.value.categoryIds ,
      publishedAt: new Date().toISOString()  
    };

    if (this.bookId) {
      this.bookService.updateBook(dto).subscribe(() => {
        this.router.navigate(['/books']);
      });
    } else {
      this.bookService.addBook(dto).subscribe(() => {
        this.router.navigate(['/books']);
      });
    }
  }
}
