import { ReturnCodeEnum } from 'src/app/@core/enum/return-code.enum';
export interface ReturnModel<T> {
  code: ReturnCodeEnum;
  message: string;
  data: T;
}
