import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApiItem } from 'src/app/models/yello-chat';

@Component({
  selector: 'app-cleaners',
  templateUrl: './cleaners.component.html',
  styleUrls: ['./cleaners.component.scss'],
})
export class CleanersComponent {
  @Input() apiItem: ApiItem | undefined;
  @Output() itemSelected = new EventEmitter<ApiItem>();

  onItemClick() {
    this.itemSelected.emit(this.apiItem);
  }
}
