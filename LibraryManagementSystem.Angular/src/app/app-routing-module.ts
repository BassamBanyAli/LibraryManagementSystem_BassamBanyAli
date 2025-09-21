import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'categories', loadChildren: () => import('./categories/categories-module').then(m => m.CategoriesModule) },
  { path: 'books', loadChildren: () => import('./books/books-module').then(m => m.BooksModule) },
  { path: '', redirectTo: 'categories', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
