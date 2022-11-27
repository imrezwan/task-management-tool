import { Component, OnInit } from '@angular/core';
import { Board, CardItem, ListItem } from 'src/app/tmt.interface';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { AppHttpService } from 'src/app/services/apphttp.service';
import { NotificationService, NotificationType } from 'src/app/services/notification.service';

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
  boardId: number = 5;

  constructor(
    private http: AppHttpService,
    private notification: NotificationService
  ) {
    
  }

  ngOnInit(): void {
    this.http.get(`board/${this.boardId}/`).subscribe((board: any) => {
      this.boardData = board;
      for (var i = 0; i < this.boardData.listitems.length; i++) {
        this.addCardBtnVisibility.push(true);
      }
    });
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

      let draggedListIndex = this.boardData.listitems.findIndex(
        (item) => item.id == draggedListId
      );

      let allCardItems = this.boardData.listitems[draggedListIndex].carditems;

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

      let draggedListIndex = this.boardData.listitems.findIndex(
        (item) => item.id == draggedListId
      );

      let droppedListIndex = this.boardData.listitems.findIndex(
        (item) => item.id == droppedListId
      );

      let allDraggedListCardItems =
        this.boardData.listitems[draggedListIndex].carditems;
      let allDroppedListCardItems =
        this.boardData.listitems[droppedListIndex].carditems;

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
      // TODO: do it only when two order is too close
      for (let i = 0; i < allDroppedListCardItems.length; i++) {
        allDroppedListCardItems[i].order += i * 100;
      }
    }

    console.log(this.boardData.listitems)
  }

  addNewCard(listid: number, listIndex: number): void {
    if (!this.cardValue) {
      this.notification.openSnackBar(
        'Please enter card name first',
        NotificationType.WARN
      );
      return;
    }

    this.http
      .post('createcard/', {
        name: this.cardValue,
        listitem: listid,
      })
      .subscribe((newcard) => {
        this.boardData.listitems[listIndex].carditems.push(newcard);
      });

    this.cardValue = '';
    this.toggleCardButtonVisibility(listIndex);
  }

  addNewList(): void {
    if (!this.listValue) {
      this.notification.openSnackBar('Please enter list name first',
        NotificationType.WARN);
      return;
    }

    this.http
      .post('createlist/', {
        "name": this.listValue,
        "board": this.boardId,
        "carditems": [],
      })
      .subscribe((newList) => {
        this.boardData.listitems.push(newList);
      });

    this.listValue = '';
    this.toggleListButtonVisibility();
  }
}


    // this.boardData = {
    //   id: 1,
    //   name: 'First Board',
    //   listitems: [
    //     {
    //       id: 1,
    //       name: 'To Do',
    //       order: 1000,
    //       carditems: [
    //         {
    //           id: 100,
    //           name: 'Learn Functional Programming',
    //           order: 2000,
    //           created_at: new Date(),
    //         },
    //         {
    //           id: 101,
    //           name: 'Learn Scala',
    //           order: 4000,
    //           created_at: new Date(),
    //         },
    //         {
    //           id: 102,
    //           name: 'Finish TMT Project',
    //           order: 7000,
    //           created_at: new Date(),
    //         },
    //       ],
    //       created_at: new Date(),
    //     },
    //     {
    //       id: 2,
    //       name: 'In Progress',
    //       order: 6000,
    //       carditems: [
    //         {
    //           id: 200,
    //           name: 'Office work',
    //           order: 2000,
    //           created_at: new Date(),
    //         },
    //         {
    //           id: 201,
    //           name: 'Codebase Explore',
    //           order: 4000,
    //           created_at: new Date(),
    //         },
    //         {
    //           id: 202,
    //           name: 'In Depth Design Pattern for Functional Programming',
    //           order: 7000,
    //           created_at: new Date(),
    //         },
    //       ],
    //       created_at: new Date(),
    //     },
    //     {
    //       id: 3,
    //       name: 'Completed',
    //       order: 9000,
    //       carditems: [
    //         {
    //           id: 300,
    //           name: 'Breakfast',
    //           order: 2000,
    //           created_at: new Date(),
    //         },
    //         {
    //           id: 301,
    //           name: 'Relax',
    //           order: 4000,
    //           created_at: new Date(),
    //         },
    //       ],
    //       created_at: new Date(),
    //     },
    //   ],
    //   created_at: new Date(),
    // };

    // this.boardData = {
    //   id: 100,
    //   name: "Board",
    //   listitems: [],
    //   created_at: new Date()
    // }
