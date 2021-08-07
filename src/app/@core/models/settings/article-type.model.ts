export interface ArticleTypeModel {
  id: number;
  name: string;
  o_name: string;
  isEdit: boolean;
  isSubmit: boolean;
}

export interface ArticleTypeAddModel {
  name: string;
}
export interface ArticleTypeEditModel {
  id: number;
  name: string;
}
