export class Users {
  constructor(
    public readonly name: string,
    public readonly pass: string,
    public readonly balance: number | null,
    public readonly create_at: Date, // Sửa từ 'date' thành 'Date'
    public readonly update_at: Date, // Sửa từ 'date' thành 'Date',
    public readonly id?: number
  ) {}
}
