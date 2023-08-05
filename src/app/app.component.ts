import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { GetYelloChatData } from './store/yelloChat.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Growgene_Company';

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(new GetYelloChatData());
  }
}
