import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppHttpService } from 'src/app/services/apphttp.service';
import { NotificationService, NotificationType } from 'src/app/services/notification.service';

@Component({
  selector: 'app-add-board-member',
  templateUrl: './add-board-member.component.html',
  styleUrls: ['./add-board-member.component.scss'],
})
export class AddBoardMemberComponent implements OnInit {
  emailFormControl: FormControl = new FormControl('', Validators.compose([Validators.required, Validators.email]));

  constructor(
    public dialogRef: MatDialogRef<AddBoardMemberComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: AppHttpService,
    public notification: NotificationService
  ) {}

  ngOnInit(): void { }

  addNewBoardMember(): void {
    const email = this.emailFormControl.value;

    if (email) {
      this.http
        .post('addmember/', {
          board_id: this.data.board_id,
          email: email,
        })
        .subscribe(
          (_: any) => {
            this.notification.openSnackBar(
              `Member of '${email}' email added successfully to this board !`,
              NotificationType.SUCCESS
            );
            this.emailFormControl.setValue('');
          },
          (_) => {
            this.notification.errorNotification(
              `Member of '${email}' email can't be added !`,
              5000
            );
          }
        );
    }
  }
}
