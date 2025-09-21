import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryList } from './category-list/category-list';
import { CategoryForm } from './category-form/category-form';

const routes: Routes = [
{ path: '', component: CategoryList },
{ path: 'form', component: CategoryForm },
{ path: 'form/:id', component: CategoryForm }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
