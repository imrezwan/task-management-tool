import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { AppHttpService } from 'src/app/services/apphttp.service';
import { UserService } from 'src/app/services/user.service';
import { Comment } from 'src/app/tmt.interface';

@Component({
  selector: 'app-card-dialog',
  templateUrl: './card-dialog.component.html',
  styleUrls: ['./card-dialog.component.scss'],
})
export class CardDialogComponent implements OnInit {
  commentValue: string = '';
  comments: Comment[] = [];

  constructor(
    public dialogRef: MatDialogRef<CardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: AppHttpService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.http
      .get(`comments/${this.data.cardItem.id}/`)
      .subscribe((comments: any) => {
        this.comments = comments.map((item: any) => {
          item.timeframe = moment(item.created_at).fromNow();
          return item;
        });
      });
  }

  postComment(): void {
    if (this.commentValue) {
      
      this.http.post(`addcomment/`,
        {
          "comment": this.commentValue,
          "commenter": this.userService._user.id,
          "carditem": this.data.cardItem.id
        }
      ).subscribe(comment => {
        comment.timeframe = moment(comment.created_at).fromNow();
        this.comments.unshift(comment);
        this.commentValue = "";
      });
    }
  }
}

