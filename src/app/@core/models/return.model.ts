import { ReturnCodeEnum } from 'src/app/@core/enum/return-code.enum';
export interface ReturnModel {
  code: ReturnCodeEnum;
  message: string;
}
