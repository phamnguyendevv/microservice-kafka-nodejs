export class Carts {
  constructor(
    public readonly customer_id: number,
    public readonly create_at: Date, // Sửa từ 'date' thành 'Date'
    public readonly update_at: Date, // Sửa từ 'date' thành 'Date',
    public readonly id?: number
  ) {}
}
