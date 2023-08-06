export class GetYelloChatData {
  static readonly type = '[YelloChatData] Get';
  constructor() {}
}

export class AddToShoppingCart {
  static readonly type = '[AddToShoppingCart] Put';
  constructor(public payload: any) {}
}
