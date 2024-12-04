import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class CreateProductRequest {
  @IsString()
  @IsNotEmpty()
  name: string;

  
  category_id: number;

  @IsString()
  slug: string;
  @IsString()
    
  description: string;

  price: number;
  location: number;
  inventory: number;
  number_sold: number;
  image: string;
  is_popular: boolean;
  code_discount: string;
  per_order: number;
;
}

export class UpdateProductRequest {
  name?: string;

  description?: string;

  price?: number;

  @IsNumber()
  stock?: number;
}
