import { themeColorType } from "../types/theme-color.type";

export interface DialogModel {
  title?: string;
  content?: string;
  button?: themeColorType;
  buttonColor?: themeColorType;
  buttonText?: string;
  showCancelBtn?: boolean;
}
