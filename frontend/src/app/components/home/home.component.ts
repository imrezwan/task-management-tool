import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AppHttpService } from 'src/app/services/apphttp.service';
import {
  NotificationService,
  NotificationType,
} from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';
import { Board, CardItem, ListItem } from 'src/app/tmt.interface';
import { CardDialogComponent } from '../card-dialog/card-dialog.component';

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
  canEditBoardTitle: boolean = false;
  boardId: number = 2;
  username: string = '';
  boardNameValue: string = '';

  constructor(
    private http: AppHttpService,
    private notification: NotificationService,
    private userService: UserService,
    private router: Router,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.boardId = params['id'];
    });

    this.http.get(`board/${this.boardId}/`).subscribe(
      (board: any) => {
        this.boardData = board;
        this.boardNameValue = board.name;
        for (var i = 0; i < this.boardData.listitems.length; i++) {
          this.addCardBtnVisibility.push(true);
        }
      },
      (error) => {
        if (error.status === 403) {
          this.notification.errorNotification(
            "You dont' have permission to access this board",
            10000
          );
        }
      }
    );

    this.userService.user$.subscribe((user: any) => {
      this.username = user.username;
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
          (allCardItems[curIdx + 1].order + allCardItems[curIdx].order) / 2;
      }

      moveItemInArray(allCardItems, prevIdx, curIdx);

      this.saveCardOrder(draggedListId, allCardItems[curIdx]);

      // for (let i = 0; i < allCardItems.length; i++) {
      //   allCardItems[i].order += (i+1) * 100;
      // }
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

      this.saveCardOrder(droppedListId, allDroppedListCardItems[curIdx]);

      // increasing each order so that no order is overlapping after the new order index operation
      // TODO: do it only when two order is too close
      // for (let i = 0; i < allDroppedListCardItems.length; i++) {
      //   allDroppedListCardItems[i].order += i * 100;
      // }
    }

    console.log(this.boardData.listitems);
  }

  saveCardOrder(newListId: number, draggedCard: CardItem): void {
    this.http
      .patch(`updatecardorder/${draggedCard.id}/`, {
        listitem: newListId,
        order: draggedCard.order,
      })
      .subscribe((_) => _);
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
      this.notification.openSnackBar(
        'Please enter list name first',
        NotificationType.WARN
      );
      return;
    }

    this.http
      .post('createlist/', {
        name: this.listValue,
        board: this.boardId,
        carditems: [],
      })
      .subscribe((newList) => {
        this.boardData.listitems.push(newList);
      });

    this.listValue = '';
    this.toggleListButtonVisibility();
  }

  logOut(): void {
    this.userService.logOut();
    this.userService.token = '';
    this.router.navigate(['signin']);
    console.log('NAVIGATE TO SIGNIN');
  }

  openDialog(listName: string, cardItem: CardItem) {
    const dialogRef = this.dialog.open(CardDialogComponent, {
      data: { listName: listName, cardItem: cardItem },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  deleteCard(listIndex: number, cardIndex: number): void {
    const carditem = this.boardData.listitems[listIndex].carditems[cardIndex];

    this.http.delete(`cards/${carditem.id}/`).subscribe((res) => {
      this.notification.openSnackBar(
        'Successfully deleted the card',
        NotificationType.SUCCESS
      );
      this.boardData.listitems[listIndex].carditems.splice(cardIndex, 1);
    });
  }

  onClickBoardName(): void {
    this.canEditBoardTitle = true;
  }

  onBlurBoardTitleEdit(): void {
    this.canEditBoardTitle = false;
    this.http.patch(`board/${this.boardId}/`, {
      "name": this.boardNameValue
    }).subscribe();
  }
}
