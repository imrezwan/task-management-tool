import { Component, OnInit } from '@angular/core';
import { Board } from 'src/app/tmt.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  visibleSidebar!: boolean;
  addCardBtnVisibility: boolean[] = [];
  boardData!: Board;
  cardValue: String = '';
  lastOpenedCardDialogIndex: number = -1;

  constructor() {}

  ngOnInit(): void {
    this.boardData = {
      id: 1,
      name: 'First Board',
      listItems: [
        {
          id: 1,
          name: 'To Do',
          order: 1000,
          cardItems: [
            {
              id: 100,
              name: 'Learn Functional Programming',
              order: 2000,
              created_at: new Date(),
            },
            {
              id: 101,
              name: 'Learn Scala',
              order: 4000,
              created_at: new Date(),
            },
            {
              id: 102,
              name: 'Finish TMT Project',
              order: 7000,
              created_at: new Date(),
            },
          ],
          created_at: new Date(),
        },
        {
          id: 2,
          name: 'In Progress',
          order: 6000,
          cardItems: [
            {
              id: 100,
              name: 'Office work',
              order: 2000,
              created_at: new Date(),
            },
            {
              id: 101,
              name: 'Codebase Explore',
              order: 4000,
              created_at: new Date(),
            },
            {
              id: 102,
              name: 'In Depth Design Pattern for Functional Programming',
              order: 7000,
              created_at: new Date(),
            },
          ],
          created_at: new Date(),
        },
        {
          id: 3,
          name: 'Completed',
          order: 9000,
          cardItems: [
            {
              id: 100,
              name: 'Breakfast',
              order: 2000,
              created_at: new Date(),
            },
            {
              id: 101,
              name: 'Relax',
              order: 4000,
              created_at: new Date(),
            },
          ],
          created_at: new Date(),
        },
      ],
      created_at: new Date(),
    };

    for (var i = 0; i < this.boardData.listItems.length; i++) {
      this.addCardBtnVisibility.push(true);
    }
  }

  createBoard(): void {}

  toggleCardButtonVisibility(idx: number) {
    this.addCardBtnVisibility[idx] = !this.addCardBtnVisibility[idx];
  }

  openAddCardDialog(idx: number) {
    this.addCardBtnVisibility[this.lastOpenedCardDialogIndex] = true;
    this.toggleCardButtonVisibility(idx);
    this.cardValue = '';
    this.lastOpenedCardDialogIndex = idx;
  }

}
