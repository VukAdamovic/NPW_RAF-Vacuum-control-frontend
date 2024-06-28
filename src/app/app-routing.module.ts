import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginPageComponent } from './login-page/login-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CreatePageComponent } from './create-page/create-page.component';
import { UpdatePageComponent } from './update-page/update-page.component';
import { VacuumsPageComponent } from './vacuums-page/vacuums-page.component';
import { CreateVacuumPageComponent } from './create-vacuum-page/create-vacuum-page.component';
import { ErrorPageComponent } from './error-page/error-page.component';

const routes: Routes = [
  {
    path:"",
    component: LoginPageComponent
  },
  {
    path:"home",
    component: HomePageComponent
  },
  {
    path:"createUser",
    component: CreatePageComponent
  },
  {
    path:"updateUser",
    component: UpdatePageComponent,
  },
  {
    path:"vacuums",
    component: VacuumsPageComponent,
  },
  {
    path:"createVacuum",
    component: CreateVacuumPageComponent,
  },
  {
    path:"errors",
    component: ErrorPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
