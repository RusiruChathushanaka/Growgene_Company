import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent {
  expanded = false;
  @Input() data$: Observable<any> | undefined;

  constructor(public dialog: MatDialog) {}

  toggleExpand(): void {
    this.expanded = !this.expanded;
  }

  onProceedToBookClick() {
    this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      disableClose: true,
      data: {},
    });
  }
}
