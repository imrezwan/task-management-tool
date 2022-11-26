import { Component, OnInit } from '@angular/core';
import { Board, CardItem } from 'src/app/tmt.interface';

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
  draggedCard!: any;
  draggedListId!: Number;

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

  dragStart(cardItem: CardItem, listId: Number): void {
    this.draggedCard = cardItem;
    this.draggedListId = listId;
  }

  dragEnd() {
    this.draggedCard = null;
  }

  drop(listId: Number) {
    if (this.draggedCard) {
      let tempBoardData = Object.assign(this.boardData, {});

      //remove the dragged item
      let draggedListIndex = tempBoardData.listItems.findIndex(
        (item) => item.id == this.draggedListId
      );
      let updatedDraggedListItems = tempBoardData.listItems[draggedListIndex].cardItems.filter(item => item.id != this.draggedCard.id)
      tempBoardData.listItems[draggedListIndex].cardItems = updatedDraggedListItems;
      
      // add the dragged item
      let droppedListIndex = tempBoardData.listItems.findIndex(
        (item) => item.id == listId
      );
      tempBoardData.listItems[
        droppedListIndex
      ].cardItems.push(this.draggedCard)

            


      // let draggedProductIndex = this.findIndex(this.draggedCard);
      // this.selectedProducts = [...this.selectedProducts, this.draggedProduct];
      // this.availableProducts = this.availableProducts.filter(
      //   (val, i) => i != draggedProductIndex
      // );
      // this.draggedProduct = null;
    }
  }
}
