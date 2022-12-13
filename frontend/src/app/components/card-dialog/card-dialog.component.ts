import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-dialog',
  templateUrl: './card-dialog.component.html',
  styleUrls: ['./card-dialog.component.scss'],
})
export class CardDialogComponent implements OnInit {
  commentValue: string = ""

  constructor() {}

  ngOnInit(): void {}
}
