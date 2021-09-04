import { ArticlesTypeMenuModel } from "./article/articles-type-menu.model";
import { MenuModel } from "./menu.model";

export interface ThemeModel {
}

export interface ThemeDataViewModel {
  title: string;
  menu: ArticlesTypeMenuModel[];
}
export interface ThemeDataRequestModel {
  account?: string;
  self?: number;
}
