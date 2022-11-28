export class ProductCategory {
  id: number;
  categoryName: string;
  constructor(categoryId: number, categoryName: string) {
    this.id = categoryId;
    this.categoryName = categoryName;
  }
}
