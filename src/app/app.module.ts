import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'


import { AppRoutingModule } from './app-routing.module';
import { MatDialogModule } from '@angular/material/dialog'; // Dodajte ovu liniju
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CreatePageComponent } from './create-page/create-page.component';
import { UpdatePageComponent } from './update-page/update-page.component';
import { VacuumsPageComponent } from './vacuums-page/vacuums-page.component';
import { CreateVacuumPageComponent } from './create-vacuum-page/create-vacuum-page.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PopupComponent } from './popup/popup.component';
import { DatePickerComponent } from './date-picker/date-picker.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    NavbarComponent,
    HomePageComponent,
    CreatePageComponent,
    UpdatePageComponent,
    VacuumsPageComponent,
    CreateVacuumPageComponent,
    ErrorPageComponent,
    PopupComponent,
    DatePickerComponent
  ],
  imports: [
    BrowserModule,
    MatDialogModule, 
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
