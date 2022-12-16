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
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { SignInComponent } from './components/signin/signin.component';
import { SignUpComponent } from './components/signup/signup.component';
import { IsAuthenticated } from './services/auth.guard';
import { MatDialogModule } from '@angular/material/dialog';
import { CardDialogComponent } from './components/card-dialog/card-dialog.component';
import { AllboardComponent } from './components/allboard/allboard.component';
import { ChangebgDialogComponent } from './components/changebg-dialog/changebg-dialog.component';
import { ConfirmdialogComponent } from './components/confirmdialog/confirmdialog.component';
import { CreateBoardComponent } from './components/create-board/create-board.component';
import { UserprofileComponent } from './components/userprofile/userprofile.component';
import { AddBoardMemberComponent } from './components/add-board-member/add-board-member.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignUpComponent,
    SignInComponent,
    CardDialogComponent,
    AllboardComponent,
    ChangebgDialogComponent,
    ConfirmdialogComponent,
    CreateBoardComponent,
    UserprofileComponent,
    AddBoardMemberComponent,
  ],
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
    MatDialogModule,
    MatMenuModule,
  ],
  providers: [
    IsAuthenticated,
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
    SnotifyService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
