export class Product {
  constructor(
    public readonly name: string,
    public readonly user_id: number,
    public readonly category_id: number,
    public readonly status_id: number,
    public readonly slug: string,
    public readonly per_order: boolean,
    public readonly number_sold: number,
    public readonly location: number,
    public readonly is_popular: boolean,
    public readonly inventory: number,
    public readonly image: string,
    public readonly code_discount: string,
    public readonly description: string,
    public readonly price: number,
    public readonly id?: number
  ) {}
}


export class Category {
  constructor(
    public readonly name: string,
    public readonly slug: string,
    public readonly image: string,
    public readonly id?: number
  ) {}
}