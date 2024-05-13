import {
  IsNotEmpty,
  IsPhoneNumber,
  IsPositive,
  IsString,
  isString,
} from 'class-validator';

export class CreateOrderRequest {
  @IsString()
  course_id: string;
  @IsString()
  course_name: string;
  @IsNotEmpty()
  price: number;
  @IsString()
  User_email: string;
  quantity: number;
  Cousre_Owner_id: string;
}
