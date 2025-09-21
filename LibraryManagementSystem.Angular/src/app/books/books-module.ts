import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksRoutingModule } from './books-routing-module';
import { BookList } from './book-list/book-list';
import { BookForm } from './book-form/book-form';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatRow } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { BooksWithCategories } from './books-with-categories/books-with-categories';


@NgModule({
  declarations: [BookList, BookForm, BooksWithCategories],
  imports: [
    CommonModule,
    BooksRoutingModule,
     FormsModule,
    ReactiveFormsModule,
    BooksRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatRow,
    MatSelectModule


  ]
})
export class BooksModule { }
