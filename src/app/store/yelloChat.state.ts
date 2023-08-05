import { Action, Selector, State, StateContext } from '@ngxs/store';
import { YelloChat } from '../models/yello-chat';
import { Injectable } from '@angular/core';
import { YelloChatService } from '../services/yello-chat.service';
import { GetYelloChatData } from './yelloChat.action';
import { tap } from 'rxjs';

export interface YelloChatStateModel {
  data: YelloChat | null;
  dataLoaded: boolean;
}

@State<YelloChatStateModel>({
  name: 'YelloChat',
  defaults: {
    data: null,
    dataLoaded: false,
  },
})
@Injectable()
export class YelloChatState {
  constructor(private ychatService: YelloChatService) {}

  //Selectors Section
  @Selector()
  static getData(state: YelloChatStateModel) {
    return state.data;
  }

  @Selector()
  static getDataLoaded(state: YelloChatStateModel) {
    return state.dataLoaded;
  }

  //Actions Section
  @Action(GetYelloChatData)
  getYellochatData(ctx: StateContext<YelloChatStateModel>) {
    return this.ychatService.getData().pipe(
      tap((res: YelloChat) => {
        const state = ctx.getState();
        ctx.setState({
          ...state,
          data: res,
          dataLoaded: true,
        });
      })
    );
  }
}
