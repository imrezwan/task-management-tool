import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ColorHelper } from 'src/app/color-helper.utils';
import { AppHttpService } from 'src/app/services/apphttp.service';

@Component({
  selector: 'app-create-board',
  templateUrl: './create-board.component.html',
  styleUrls: ['./create-board.component.scss'],
})
export class CreateBoardComponent implements OnInit {
  boardTitleControl: FormControl = new FormControl('', [Validators.required]);
  selectedColor: string = '';
  colorPalette: Array<any> = ColorHelper.colorPalette;
  bgGradients: Array<string> = ColorHelper.getGenerateGradientStrings();

  constructor(
    public dialogRef: MatDialogRef<CreateBoardComponent>,
    private http: AppHttpService
  ) { }

  ngOnInit(): void {}

  selectionChange(colorIndex: number): void {
    this.selectedColor = this.colorPalette[colorIndex];
    console.log(this.selectedColor);
  }

  createBoard(): void {
    console.log(this.boardTitleControl.value, this.selectedColor)
    this.http.post(`createboard/`, {
      'name': this.boardTitleControl.value,
      'bg': this.selectedColor,
      'listitems': [],
    }).subscribe(res => {
      this.dialogRef.close(res);
    });
  }
}
