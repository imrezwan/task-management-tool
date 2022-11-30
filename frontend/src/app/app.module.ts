import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SignInComponent } from './components/signin/signin.component';
import { SignUpComponent } from './components/signup/signup.component';
import { IsAuthenticated } from './services/activators';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';

@NgModule({
  declarations: [AppComponent, HomeComponent, SignUpComponent, SignInComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    DragDropModule,
    MatSnackBarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    SnotifyModule,
  ],
  providers: [
    IsAuthenticated,
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
    SnotifyService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
