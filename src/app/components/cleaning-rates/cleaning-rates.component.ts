import { Component, Input } from '@angular/core';
import { ApiSubItem } from 'src/app/models/yello-chat';

@Component({
  selector: 'app-cleaning-rates',
  templateUrl: './cleaning-rates.component.html',
  styleUrls: ['./cleaning-rates.component.scss'],
})
export class CleaningRatesComponent {
  @Input() apiSubItem!: ApiSubItem;
  @Input() isSelected: boolean = false;
}
