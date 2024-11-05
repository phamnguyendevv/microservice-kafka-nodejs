export class Carts {
  constructor(
    public readonly customer_id: number,
    public readonly create_at: Date, // Sửa từ 'date' thành 'Date'
    public readonly update_at: Date, // Sửa từ 'date' thành 'Date',
    public readonly id?: number
  ) {}
}

export class CartLineItems {
  constructor(
    public readonly productId: number,
    public readonly cartId: number,
    public readonly itemName: string,
    public readonly variant: string,
    public readonly qty: number,
    public readonly price: number,
    public readonly create_at: Date, // Sửa từ 'date' thành 'Date'
    public readonly update_at: Date, // Sửa từ 'date' thành 'Date',
    public readonly id?: number
  ) {}
}
