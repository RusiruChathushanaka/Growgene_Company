import { Component, OnInit } from '@angular/core';
import {
  ActionCompletion,
  Actions,
  Store,
  ofActionCompleted,
} from '@ngxs/store';
import { AddToShoppingCart, GetYelloChatData } from './store/yelloChat.action';
import { Observable, Subject, takeUntil } from 'rxjs';
import { YelloChatState } from './store/yelloChat.state';
import { ApiItem } from './models/yello-chat';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from './components/alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Growgene_Company';

  title$!: Observable<string | undefined>;
  itemTitle$!: Observable<string | undefined>;
  apiItems$!: Observable<ApiItem[] | undefined>;
  total$!: Observable<any>;
  dataLoaded$!: Observable<any>;
  apiItems: ApiItem[] | undefined;
  selectedCleaners: ApiItem | undefined;

  defaultSelectedIndex: number = 0;
  selectedCleanersIndex: number = this.defaultSelectedIndex;

  selectedSubItem: any;

  private ngUnsubscribe = new Subject<void>();

  // Constructor with dependency injection
  constructor(
    private store: Store,
    private actions$: Actions,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    // Initialize component and fetch data from the store
    this.storeActionHandlers();
    this.setGetStoreData();
  }

  // Fetch data from the store
  setGetStoreData() {
    this.store.dispatch(new GetYelloChatData());
    this.dataLoaded$ = this.store.select(YelloChatState.getDataLoaded);
    this.title$ = this.store.select(YelloChatState.getTitle);
    this.itemTitle$ = this.store.select(YelloChatState.getItemTitle);
    this.total$ = this.store.select(YelloChatState.getOrderDetails);

    // Subscribe to getApiItems and process the selected cleaners
    this.store.select(YelloChatState.getApiItems).subscribe((res: any) => {
      this.apiItems = res;
      this.selectedCleaners = this.apiItems
        ? this.apiItems[this.selectedCleanersIndex]
        : undefined;
      sortItems(this.selectedCleaners?.items);
      this.selectedSubItem = preferRate(this.selectedCleaners?.items);
      const selectedItem = arrangeSelectedItem(
        this.selectedCleaners,
        this.selectedSubItem
      );
      this.store.dispatch(new AddToShoppingCart(selectedItem));
    });
  }

  // Handler for when an item is selected
  onItemSelected(apiItem: any) {
    this.selectedCleaners = apiItem;
    this.selectedCleanersIndex = Number(apiItem.id) - 1;
    sortItems(this.selectedCleaners?.items);
    this.selectedSubItem = preferRate(this.selectedCleaners?.items);
    const selectedItem = arrangeSelectedItem(
      this.selectedCleaners,
      this.selectedSubItem
    );
    this.store.dispatch(new AddToShoppingCart(selectedItem));
  }

  // Handler for when a subitem is selected
  onSubItemSelect(subItem: any) {
    this.selectedSubItem = subItem;
    const selectedItem = arrangeSelectedItem(
      this.selectedCleaners,
      this.selectedSubItem
    );
    this.store.dispatch(new AddToShoppingCart(selectedItem));
  }

  // Subscribe to actions$ and handle action completion with error handling
  storeActionHandlers(): void {
    this.actions$
      .pipe(
        ofActionCompleted(GetYelloChatData, AddToShoppingCart),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((data: ActionCompletion) => {
        console.log('ofActionCompletion => ', data);
        const actionName = data.action.constructor.name;
        if (data.result.successful === false) {
          const errorMessage = data.result.error?.message;
          this.showAlert(
            `${actionName} Error`,
            `Error Message - ${errorMessage}`
          );
        }
      });
  }

  // Show an alert dialog with the given heading and message
  showAlert(heading: string, message: string) {
    this.dialog.open(AlertDialogComponent, {
      width: '50%',
      disableClose: true,
      data: { heading, message },
    });
  }
}

// Function to sort items based on the 'sort' property
function sortItems(items: any): any {
  console.log(items);
  return items?.sort((a: any, b: any) => a.sort - b.sort);
}

// Function to get the preferred rate based on the 'isPrefer' property
function preferRate(subItems: any): any | undefined {
  return subItems?.find((subItem: any) => subItem.isPrefer === true);
}

// Function to arrange the selected item for the shopping cart
function arrangeSelectedItem(selectedCleaner: any, selectedSubItem: any) {
  const selectedItem = {
    displayText: selectedCleaner?.displayText,
    image: selectedCleaner?.image,
    count: selectedCleaner?.count,
    displayOrder: selectedCleaner?.displayOrder,
    isActive: selectedCleaner?.isActive,
    id: selectedCleaner?.id,
    unitPrice: selectedSubItem?.unitPrice,
    itemName: selectedSubItem?.itemName,
    subTitle: selectedSubItem?.subTitle,
    unitOfMeasure: selectedSubItem?.unitOfMeasure,
    minutes: selectedSubItem?.minutes,
  };
  return selectedItem;
}
