export interface YelloChat {
  status: string;
  data: ApiData;
}

interface ApiData {
  title: string;
  itemTitle: string;
  items: ApiItem[];
}
interface ApiItem {
  displayText: string;
  image: string;
  count: number;
  displayOrder: number;
  isActive: boolean;
  id: string;
  items: ApiSubItem[];
}

interface ApiSubItem {
  unitPrice?: number;
  itemName: string;
  subTitle?: string;
  unitOfMeasure: string;
  minutes?: number;
  sort?: number;
  id: string;
  isPrefer?: boolean;
}
