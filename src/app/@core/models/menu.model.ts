export interface MenuModel {
  title: string;
  url?: string;
  icon?: string;
  children?: MenuModel[];
}
