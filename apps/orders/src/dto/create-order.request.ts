import { IsNotEmpty, IsPhoneNumber, IsPositive, IsPostalCode, IsString } from "class-validator";

export class CreateOrderRequest{
    @IsString()
    @IsNotEmpty()
    name:string;

    @IsPositive()
    price:number;

    @IsPhoneNumber()
    phoneNumber : string;
}