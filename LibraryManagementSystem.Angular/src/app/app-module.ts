import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { CategoriesModule } from './categories/categories-module';
import { provideHttpClient } from '@angular/common/http';
import { MatToolbar } from "@angular/material/toolbar";
import { BooksModule } from './books/books-module';
import { Navbar } from './navbar/navbar';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';




@NgModule({
  declarations: [
    App,
    Navbar,
    



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CategoriesModule,
    BooksModule,
     MatToolbar,
         MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    
],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient()
  ],
  bootstrap: [App]
})
export class AppModule { }
