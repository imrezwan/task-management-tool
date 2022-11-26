import { Component, OnInit } from '@angular/core';
import { Board, CardItem, ListItem } from 'src/app/tmt.interface';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

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
  listValue: String = '';
  lastOpenedCardDialogIndex: number = -1;
  draggedCard!: any;
  draggedListId!: Number;
  addListBtnVisibility: Boolean = true;

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
              id: 200,
              name: 'Office work',
              order: 2000,
              created_at: new Date(),
            },
            {
              id: 201,
              name: 'Codebase Explore',
              order: 4000,
              created_at: new Date(),
            },
            {
              id: 202,
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
              id: 300,
              name: 'Breakfast',
              order: 2000,
              created_at: new Date(),
            },
            {
              id: 301,
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

    this.boardData = {
      id: 100,
      name: "Board",
      listItems: [],
      created_at: new Date()
    }

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

  openAddListDialog() {
    this.toggleListButtonVisibility();
    this.listValue = '';
  }

  toggleListButtonVisibility() {
    this.addListBtnVisibility = !this.addListBtnVisibility;
  }

  drop(event: CdkDragDrop<ListItem>) {
    const prevIdx = event.previousIndex;
    const curIdx = event.currentIndex;
    const prevContainerData = event.previousContainer.data;
    const currConatainerData = event.container.data;

    if (event.previousContainer === event.container) {
      // card moved to the same list
      const draggedListId = currConatainerData.id;

      let draggedListIndex = this.boardData.listItems.findIndex(
        (item) => item.id == draggedListId
      );

      let allCardItems = this.boardData.listItems[draggedListIndex].cardItems;

      if (curIdx === allCardItems.length) {
        // last insert
        allCardItems[prevIdx].order =
          allCardItems[curIdx].order + allCardItems[prevIdx].order;
      } else if (curIdx === 0) {
        // first insert
        allCardItems[prevIdx].order = allCardItems[0].order / 2;
      } else {
        //middle insert
        allCardItems[prevIdx].order =
          (allCardItems[curIdx - 1].order + allCardItems[curIdx].order) / 2;
      }

      moveItemInArray(allCardItems, prevIdx, curIdx);

      for (let i = 0; i < allCardItems.length; i++) {
        allCardItems[i].order += i * 100;
      }
    } else {
      // card moved to the different list

      const draggedListId = prevContainerData.id;
      const droppedListId = currConatainerData.id;

      let draggedListIndex = this.boardData.listItems.findIndex(
        (item) => item.id == draggedListId
      );

      let droppedListIndex = this.boardData.listItems.findIndex(
        (item) => item.id == droppedListId
      );

      let allDraggedListCardItems =
        this.boardData.listItems[draggedListIndex].cardItems;
      let allDroppedListCardItems =
        this.boardData.listItems[droppedListIndex].cardItems;

      if (allDroppedListCardItems.length > 0) {
        // dropped list is not empty

        if (curIdx === allDroppedListCardItems.length) {
          // last insert
          allDraggedListCardItems[prevIdx].order =
            allDroppedListCardItems[curIdx].order +
            allDraggedListCardItems[prevIdx].order;
        } else if (curIdx === 0) {
          // first insert
          allDraggedListCardItems[prevIdx].order =
            !!allDroppedListCardItems.length
              ? allDroppedListCardItems[0].order / 2
              : allDraggedListCardItems[prevIdx].order;
        } else {
          // middle insert
          allDraggedListCardItems[prevIdx].order =
            (allDroppedListCardItems[curIdx - 1].order +
              allDroppedListCardItems[curIdx].order) /
            2;
        }
      }

      transferArrayItem(
        allDraggedListCardItems,
        allDroppedListCardItems,
        prevIdx,
        curIdx
      );

      // increasing each order so that no order is overlapping after the new order index operation
      for (let i = 0; i < allDroppedListCardItems.length; i++) {
        allDroppedListCardItems[i].order += i * 100;
      }
    }

    console.log(this.boardData.listItems)
  }

  addNewCard(listIndex: number): void {
    let cardLists = this.boardData.listItems[listIndex].cardItems;
    let cardListLen = cardLists.length;
    console.log(this.cardValue);
    this.boardData.listItems[listIndex].cardItems.push({
      id: cardListLen * 100,
      name: this.cardValue,
      order: !!cardListLen ? cardLists[cardListLen - 1].order + 2000 : 4096,
      created_at: new Date(),
    });

    this.cardValue = '';
    this.toggleCardButtonVisibility(listIndex);
  }

  addNewList(): void {
    let lists = this.boardData.listItems;
    let totalLists = lists.length;
    console.log(this.cardValue);
    this.boardData.listItems.push({
      id: totalLists * 100,
      name: this.listValue,
      cardItems: [],
      order: !!totalLists ? lists[totalLists - 1].order + 2000 : 4096,
      created_at: new Date(),
    });

    this.listValue = '';
    this.toggleListButtonVisibility();
  }
}
