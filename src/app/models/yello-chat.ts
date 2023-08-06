export interface YelloChat {
  status: string;
  data: ApiData;
}

export interface ApiData {
  title: string;
  itemTitle: string;
  items: ApiItem[];
}
export interface ApiItem {
  displayText: string;
  image: string;
  count: number;
  displayOrder: number;
  isActive: boolean;
  id: string;
  items: ApiSubItem[];
}

export interface ApiSubItem {
  unitPrice?: number;
  itemName: string;
  subTitle?: string;
  unitOfMeasure: string;
  minutes?: number;
  sort?: number;
  id: string;
  isPrefer?: boolean;
}
