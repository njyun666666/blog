import { MenuModel } from "./menu.model";

export interface ThemeModel {
}

export interface ThemeDataViewModel {
  title: string;
  menu: MenuModel[];
}
export interface ThemeDataRequestModel {
  account?: string;
  self?: number;
}
