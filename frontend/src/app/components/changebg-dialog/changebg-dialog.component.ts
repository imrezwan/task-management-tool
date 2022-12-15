import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ColorHelper } from 'src/app/color-helper.utils';
import { AppHttpService } from 'src/app/services/apphttp.service';

@Component({
  selector: 'app-changebg-dialog',
  templateUrl: './changebg-dialog.component.html',
  styleUrls: ['./changebg-dialog.component.scss'],
})
export class ChangebgDialogComponent implements OnInit {
  selectedColor!: string;
  colorPalette: Array<any> = ColorHelper.colorPalette;
  bgGradients: Array<string> = [];

  constructor(
    public dialogRef: MatDialogRef<ChangebgDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BoardBg,
    private http: AppHttpService
  ) {
    this.bgGradients = ColorHelper.getGenerateGradientStrings();
    this.selectedColor = data.bg ? data.bg : '';

    this.dialogRef.beforeClosed().subscribe(res => {
      this.dialogRef.close(this.selectedColor);
    });
  }



  ngOnInit(): void {}

  selectionChange(colorIndex: number): void {
    this.selectedColor = this.colorPalette[colorIndex];
    console.log(this.selectedColor)
    this.http.patch(`board/${this.data?.boardId}/`, {
      "bg": this.selectedColor,
    }).subscribe(res => {
      this.dialogRef.close(this.selectedColor);
    });
  }
}


interface BoardBg {
  boardId: number;
  bg: string;
}
