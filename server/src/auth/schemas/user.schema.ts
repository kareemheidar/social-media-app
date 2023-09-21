import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class User extends Document {
  @Prop()
  firstname: string;

  @Prop()
  lastname: string;

  @Prop({ unique: [true, 'Duplicate Email entered'] })
  email: string;

  @Prop()
  password: string;

  @Prop()
  resetToken: string;

}

export const UserSchema = SchemaFactory.createForClass(User);
