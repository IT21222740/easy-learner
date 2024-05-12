import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/common';

@Schema({ versionKey: false })
export class Order extends AbstractDocument {
  @Prop()
  course_name: string;

  @Prop()
  price: number;

  @Prop()
  User_email: string;

  @Prop()
  quantity: number;

  @Prop()
  Cousre_Owner_id: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
