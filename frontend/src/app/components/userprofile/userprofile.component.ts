import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { from } from 'rxjs';
import { ColorHelper } from 'src/app/color-helper.utils';
import { AppHttpService } from 'src/app/services/apphttp.service';
import { UserProfile } from 'src/app/tmt.interface';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss'],
})
export class UserprofileComponent implements OnInit {
  profileTextBg!: string;
  canEditName: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<UserprofileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserProfile,
    private http: AppHttpService
  ) {

    this.profileTextBg =
      this.data?.username && ColorHelper.stringToHexColor(this.data.username);
  
    this.dialogRef.beforeClosed().subscribe((res) => {
      this.dialogRef.close(this.data);
    });
  }

  ngOnInit(): void {}

  uploadProfileImage(profileImage: any) {
    const file = profileImage.files[0];

    const formData: FormData = new FormData();
    formData.append('profile_image', file, file.name);

    this.http.patchFormData(`profile/`, formData).subscribe((res) => {
      this.data = res;
    });
  }

  onClickName() {
    this.canEditName = true;
  }

  onBlurNameEdit() {
    this.canEditName = false;
    this.http.patchFormData(`profile/`, {
      'display_name': this.data.display_name,
    }).subscribe((res) => {
      this.data = res;
    });
  }
}
