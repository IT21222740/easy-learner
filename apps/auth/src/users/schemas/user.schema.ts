import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/common';

@Schema({ versionKey: false })
export class User extends AbstractDocument {
  @Prop()
  email: string;

  @Prop()
  password: string;
  
  @Prop()
  name:string;
 
  @Prop()
  isAdmin : boolean

  @Prop()
  isTeacher: boolean
}

export const UserSchema = SchemaFactory.createForClass(User);
