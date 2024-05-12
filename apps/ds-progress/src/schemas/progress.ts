import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class progress{

    @Prop({required: true})
    course_id: string;

    @Prop({required: true})
    user_id: string;

    @Prop({required: true})
    num_of_lessons: number;

    @Prop({required: true})
    num_of_completed: number;
}

export const progressShema = SchemaFactory.createForClass(progress);