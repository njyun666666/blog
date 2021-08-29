export interface ArticleListModel {
  id: number,
  title: string,
  content: string,
  typeID: number,
  uid: string,
  status: number,
  createDate: Date,
  updateDate: Date
}
export interface ArticleListAddFormModel {
  typeID: number,
  content: string,
  status: number
}
export interface ArticleListRequestModel {
  account: string,
}
export interface ArticleListInfoModel extends ArticleListModel {
  typeName: string,
  userName: string
}
