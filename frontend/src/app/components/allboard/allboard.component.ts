import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ColorHelper } from 'src/app/color-helper.utils';
import { AppHttpService } from 'src/app/services/apphttp.service';
import { UserService } from 'src/app/services/user.service';
import { CreateBoardComponent } from '../create-board/create-board.component';
import { UserprofileComponent } from '../userprofile/userprofile.component';

@Component({
  selector: 'app-allboard',
  templateUrl: './allboard.component.html',
  styleUrls: ['./allboard.component.scss'],
})
export class AllboardComponent implements OnInit {
  username: string = '';
  allboard: any = [];
  sharedboards: any = [];
  userprofile: any = {};
  profileTextBg: string = '';

  constructor(
    private userService: UserService,
    private router: Router,
    private http: AppHttpService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.userService.user$.subscribe((user: any) => {
      this.username = user.username;
    });

    this.retrieveUserProfile();
    this.getAllBoard();
    this.getAllSharedBoard();
  }

  logOut(): void {
    this.userService.logOut();
    this.userService.token = '';
    this.router.navigate(['signin']);
  }

  openProfileDialog(): void {
    const dialogRef = this.dialog.open(UserprofileComponent, {
      data: this.userprofile,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      this.userprofile = result;
    });
  }

  getAllBoard(): void {
    this.http.get(`boards/`).subscribe((boards: any) => {
      this.allboard = boards.map((item: any) => {
        item.created = moment(item.created_at).fromNow();
        item.bgStr = ColorHelper.generateGradientBgStr(item.bg || '');
        return item;
      });
    });
  }

  getAllSharedBoard(): void {
    this.http.get(`sharedboards/`).subscribe((boards: any) => {
      this.sharedboards = boards.map((item: any) => {
        item.created = moment(item.created_at).fromNow();
        item.bgStr = ColorHelper.generateGradientBgStr(item.bg || '');
        return item;
      });
    });
  }

  openCreateBoardDialog(): void {
    const dialogRef = this.dialog.open(CreateBoardComponent);

    dialogRef.afterClosed().subscribe((item) => {
      item.created = moment(item.created_at).fromNow();
      item.bgStr = ColorHelper.generateGradientBgStr(item.bg || '');
      this.allboard.unshift(item);
    });
  }

  retrieveUserProfile(): void {
    this.userService.getUserProfile().subscribe((profile: any) => {
      this.userprofile = profile;
      this.profileTextBg = ColorHelper.stringToHexColor(profile.username);
    });
  }
}
