export class Users {
  constructor(
    public readonly name: string,
    public readonly role_id: Number,
    public readonly status_id: Number,
    public readonly balance: Number | null,
    public readonly used_balance: Number,
    public readonly total_deposit: Number,
    public readonly email: string,
    public readonly full_name: string,
    public readonly password: string,
    public readonly avatar: string,
    public readonly phone: string,
    public readonly sex: string,
    public readonly referrer_id: string,
    public readonly code_bank: string,
    public readonly is_online: Boolean,
    public readonly create_at?: Date, 
    public readonly update_at?: Date, 
    public readonly referral_code?: string,
    public readonly id?: number
  ) {}
}
