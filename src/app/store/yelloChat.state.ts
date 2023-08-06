import { Action, Selector, State, StateContext } from '@ngxs/store';
import { ApiItem, ApiSubItem, YelloChat } from '../models/yello-chat';
import { Injectable } from '@angular/core';
import { YelloChatService } from '../services/yello-chat.service';
import { AddToShoppingCart, GetYelloChatData } from './yelloChat.action';
import { tap } from 'rxjs';

// Define the interface for the YelloChat state model
export interface YelloChatStateModel {
  data: YelloChat | null;
  shoppingCart: any;
  dataLoaded: boolean;
}

@State<YelloChatStateModel>({
  name: 'YelloChat', // State name
  defaults: {
    data: null,
    shoppingCart: null,
    dataLoaded: false,
  }, // Initial state values
})
@Injectable()
export class YelloChatState {
  constructor(private ychatService: YelloChatService) {}

  //Selectors Section

  // Selector to get the entire data from the state
  @Selector()
  static getData(state: YelloChatStateModel) {
    return state.data;
  }

  // Selector to get the title from the state
  @Selector()
  static getTitle(state: YelloChatStateModel) {
    return state.data?.data.title;
  }

  // Selector to get the item title from the state
  @Selector()
  static getItemTitle(state: YelloChatStateModel) {
    return state.data?.data.itemTitle;
  }

  // Selector to get the API items from the state
  @Selector()
  static getApiItems(state: YelloChatStateModel) {
    return state.data?.data.items;
  }

  // Selector to calculate and get the order details from the state
  @Selector()
  static getOrderDetails(state: YelloChatStateModel) {
    const NoOfCleaners = state.shoppingCart.count
      ? state.shoppingCart.count
      : 0;
    const unitPrice = state.shoppingCart.unitPrice
      ? state.shoppingCart.unitPrice
      : 0;
    const NoOfHours = state.shoppingCart.minutes
      ? state.shoppingCart.minutes / 60
      : 0;
    const tax = 5;
    const subTotal = unitPrice * NoOfHours;
    const totalInclusiveTax = subTotal * (1 + tax / 100);

    const result = {
      noOfCleaners: NoOfCleaners,
      duration: state.shoppingCart.itemName,
      subTotal: subTotal,
      total: totalInclusiveTax,
    };
    return result;
  }

  // Selector to get the dataLoaded flag from the state
  @Selector()
  static getDataLoaded(state: YelloChatStateModel) {
    return state.dataLoaded;
  }

  //Actions Section

  // Action to fetch YelloChat data from the service and update the state
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

  // Action to update the shopping cart state
  @Action(AddToShoppingCart)
  addToShoppingCart(ctx: StateContext<YelloChatStateModel>, payload: any) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      shoppingCart: payload.payload,
    });
  }
}
