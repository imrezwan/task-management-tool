import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmdialog',
  templateUrl: './confirmdialog.component.html',
  styleUrls: ['./confirmdialog.component.scss'],
})
export class ConfirmdialogComponent implements OnInit {
  deleteItemName: string = '';

  constructor(
    public dialogRef: MatDialogRef<ConfirmdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData
  ) {
    this.deleteItemName = this.data.deleteItemName || '';
  }

  ngOnInit(): void {}
}


interface ConfirmDialogData {
  deleteItemName: string;
}