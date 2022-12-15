import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ColorHelper } from 'src/app/color-helper.utils';
import { AppHttpService } from 'src/app/services/apphttp.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-allboard',
  templateUrl: './allboard.component.html',
  styleUrls: ['./allboard.component.scss'],
})
export class AllboardComponent implements OnInit {
  username: string = '';
  allboard: any = [];

  constructor(
    private userService: UserService,
    private router: Router,
    private http: AppHttpService
  ) { }

  ngOnInit(): void {
    this.userService.user$.subscribe((user: any) => {
      this.username = user.username;
    });

    this.http.get(`boards/`).subscribe((boards:any) => {
      this.allboard = boards.map((item:any) => {
        item.updated = moment(item.updated_at).fromNow()
        item.bgStr = ColorHelper.generateGradientBgStr(item.bg || '');
        return item;
      });
    });
  }

  logOut(): void {
    this.userService.logOut();
    this.userService.token = '';
    this.router.navigate(['signin']);
  }
}
