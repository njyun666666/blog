export interface MenuModel {
  menuID?: number;
  title?: string;
  url?: string;
  icon?: string;
  children?: MenuModel[];
}
